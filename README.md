# LocalStack & Terraform REST API

This is an example that uses [Terraform](https://developer.hashicorp.com/terraform) and [LocalStack](https://localstack.cloud/) to spin up a local [hot-reloading](https://docs.localstack.cloud/user-guide/tools/lambda-tools/hot-reloading/) Node.js [AWS Lambda](https://aws.amazon.com/lambda/) and [API Gateway](https://aws.amazon.com/api-gateway/) development environment. The features used in this guide require you to have [LocalStack Pro](https://localstack.cloud/pricing/). There is a trial membership available. Develop rapidly for the cloud without the associated costs, slow feedback, and risk of actual deployments. LocalStack also works with Pulumi, AWS CloudFormation/CDK, SAM, and more.

**In this guide we will:**

1. [Set up LocalStack Pro](./docs/initial-setup.md)

2. Deploy resources to LocalStack using one of the following IaC providers:
   1. [Terraform HCL](./docs/iac/terraform-hcl.md) `.tf`
   2. [Terraform CDK (CDKTF)](./docs/iac/terraform-cdk.md) `.ts`

3. [Query your local REST API](./docs/query-your-api.md)



## Key Files/Directories

- 📁 /cdktf
  - Terraform CDK code used to create and manage AWS resources
- 📁 /docs
  - Markdown documentation about the project
- 📁 /lambda
  - Very simple lambda function that returns a JSON object `{ message: 'Hello World' }` and `200` http status code
- 📄.env.example
  - File that contains LocalStack Pro key, copy this to a `.env` file
- 📄main.tf
  - Primary Terraform HCL file used to create and manage AWS resources





## Why do I need to have LocalStack Pro?

Some functionality like [UpdateIntegration](https://docs.localstack.cloud/references/coverage/coverage_apigatewayv2/#updateintegration) for API Gateway is not currently available for the community edition of LocalStack. It's possible to force the recreation of the API Gateway integration and get around this, but Pro includes a lot of other handy features, such as the [Resource Browser](https://docs.localstack.cloud/user-guide/web-application/resource-browser/) which is a web interface for browsing your LocalStack AWS resources.
