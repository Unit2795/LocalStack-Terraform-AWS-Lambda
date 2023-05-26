import { Construct } from 'constructs';
import {App, TerraformStack, TerraformVariable, Token} from 'cdktf';
import { AwsProvider } from '@cdktf/provider-aws/lib/provider';
import { ArchiveProvider } from '@cdktf/provider-archive/lib/provider';
import { DataArchiveFile } from '@cdktf/provider-archive/lib/data-archive-file';
import { IamRole } from '@cdktf/provider-aws/lib/iam-role';
import { LambdaFunction } from '@cdktf/provider-aws/lib/lambda-function';
import { LambdaPermission } from '@cdktf/provider-aws/lib/lambda-permission';
import { ApiGatewayDeployment } from '@cdktf/provider-aws/lib/api-gateway-deployment';
import { ApiGatewayIntegration } from '@cdktf/provider-aws/lib/api-gateway-integration';
import { ApiGatewayMethod } from '@cdktf/provider-aws/lib/api-gateway-method';
import { ApiGatewayResource } from '@cdktf/provider-aws/lib/api-gateway-resource';
import { ApiGatewayRestApi } from '@cdktf/provider-aws/lib/api-gateway-rest-api';
import { AWS_CONFIG } from "./localstack-config";
import { resolve } from 'path';

const lambdaDirectory = resolve(__dirname, '../../lambda');
const lambdaSource = resolve(lambdaDirectory, 'index.js');
const lambdaBuild = resolve(lambdaDirectory, 'build/lambda.zip');

console.log(`lambdaBuild: ${lambdaBuild}`);
console.log(`lambdaSource: ${lambdaSource}`);

const configValues = {
	stackName: 'cdktf-stack',
	lambda: {
		name: 'cdkTestLambda',
		sourcePath: lambdaSource,
		buildPath: lambdaBuild,
	}
};

// Set a stage for differentiating environments
export const STAGE = process.env.STAGE || "local";

class LambdaAPIStack extends TerraformStack {
	constructor(scope: Construct, name: string) {
		super(scope, name);

		new ArchiveProvider(this, 'archive', {});

		new AwsProvider(this, 'aws', AWS_CONFIG);

		const archiveFile = new DataArchiveFile(this, 'cdk_lambda_zip', {
			type: 'zip',
			sourceFile: configValues.lambda.sourcePath,
			outputPath: configValues.lambda.buildPath,
		});

		const role = new IamRole(this, 'cdk_lambda_exec', {
			name: 'cdk_lambda_exec_role',
			assumeRolePolicy: JSON.stringify({
				"Version": "2012-10-17",
				"Statement": [
					{
						"Action": "sts:AssumeRole",
						"Principal": {
							"Service": "lambda.amazonaws.com"
						},
						"Effect": "Allow",
						"Sid": ""
					}
				]
			}),
		});

		const fun = new LambdaFunction(this, 'cdk_lambda', {
			functionName: configValues.lambda.name,
			s3Bucket: STAGE == "local" ? "hot-reload" : null,
			s3Key: STAGE == "local" ? lambdaDirectory : null,
			filename: STAGE == "local" ? null : archiveFile.outputPath,
			sourceCodeHash: archiveFile.outputBase64Sha256,
			handler: 'index.handler',
			runtime: 'nodejs18.x',
			role: role.arn,
		});

		const apiGateway = new ApiGatewayRestApi(this, 'cdk_api', {
			name: 'MyCDKAPI',
		});

		const apiResource = new ApiGatewayResource(this, 'cdk_resource', {
			restApiId: apiGateway.id,
			parentId: apiGateway.rootResourceId,
			pathPart: 'test',
		});

		const apiMethod = new ApiGatewayMethod(this, 'cdk_method', {
			restApiId: apiGateway.id,
			resourceId: apiResource.id,
			httpMethod: 'GET',
			authorization: 'NONE',
		});

		const apiIntegration = new ApiGatewayIntegration(this, 'cdk_integration2', {
			restApiId: apiGateway.id,
			resourceId: apiResource.id,
			httpMethod: apiMethod.httpMethod,
			integrationHttpMethod: 'POST',
			type: 'AWS_PROXY',
			uri: fun.invokeArn
		});

		new LambdaPermission(this, 'cdk_apigw', {
			statementId: 'AllowAPIGatewayInvoke',
			action: 'lambda:InvokeFunction',
			functionName: fun.functionName,
			principal: 'apigateway.amazonaws.com',
			sourceArn: `${apiGateway.executionArn}/${STAGE}/GET/test`,
		});

		new ApiGatewayDeployment(this, 'cdk_deployment', {
			dependsOn: [apiIntegration],
			restApiId: apiGateway.id,
			stageName: STAGE,
			description: `Deployed on ${Token.asString(new Date())}`,
		});
	}
}

const app = new App();
new LambdaAPIStack(app, configValues.stackName);
app.synth();
