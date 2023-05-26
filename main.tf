variable "STAGE" {
  type    = string
  default = "local"
}

// Set our AWS region
provider "aws" {
  region = "us-east-1"
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true
  access_key = "fakeKeyForLocalTesting"
  secretKey = "fakeSecretForLocalTesting"
  endpoints {
    apigateway       = var.STAGE == "local" ? "http://localhost:4566" : null
    cloudformation   = var.STAGE == "local" ? "http://localhost:4566" : null
    cloudwatch       = var.STAGE == "local" ? "http://localhost:4566" : null
    cloudwatchevents = var.STAGE == "local" ? "http://localhost:4566" : null
    iam              = var.STAGE == "local" ? "http://localhost:4566" : null
    lambda           = var.STAGE == "local" ? "http://localhost:4566" : null
    s3               = var.STAGE == "local" ? "http://localhost:4566" : null
  }
}

// Build the lambda zip file
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_file = "lambda/index.js"
  output_path = "lambda/build/lambda.zip"
}

// Create the lambda function resource with our build ZIP file
resource "aws_lambda_function" "lambda" {
  function_name = "myTestLambda"
  s3_bucket     = var.STAGE == "local" ? "hot-reload" : null
  s3_key        = var.STAGE == "local" ? "${path.cwd}/lambda" : null
  filename      = var.STAGE == "local" ? null : data.archive_file.lambda_zip.output_path
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  handler       = "index.handler"
  runtime       = "nodejs18.x"

  role          = aws_iam_role.lambda_exec.arn
}

// Create the execution IAM role for our lambda function
resource "aws_iam_role" "lambda_exec" {
  name = "lambda_exec_role"

  assume_role_policy = <<EOF
{
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
}
EOF
}

// Create the API Gateway
resource "aws_api_gateway_rest_api" "api" {
  name = "MyAPI"
}

// Add a path resource to our API gateway "/test"
resource "aws_api_gateway_resource" "resource" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_rest_api.api.root_resource_id
  path_part   = "test"
}

// Add a GET method to our "/test" resource
resource "aws_api_gateway_method" "method" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.resource.id
  http_method   = "GET"
  authorization = "NONE"
}

// Connect our lambda function to the GET "/test" resource
resource "aws_api_gateway_integration" "integration" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  resource_id = aws_api_gateway_resource.resource.id
  http_method = aws_api_gateway_method.method.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.lambda.invoke_arn
}

// Allow API Gateway to invoke our lambda function
resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_rest_api.api.execution_arn}/${var.STAGE}/GET/test"
}

// Create a deployment of our API Gateway named "local"
resource "aws_api_gateway_deployment" "deployment" {
  depends_on  = [aws_api_gateway_integration.integration]
  rest_api_id = aws_api_gateway_rest_api.api.id
  stage_name  = var.STAGE
  description = "Deployed on ${timestamp()}"
}