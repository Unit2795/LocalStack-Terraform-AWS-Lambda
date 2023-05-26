# LocalStack & Terraform REST API

Develop rapidly for the cloud without the associated costs, slow feedback, and risk of actual deployments using LocalStack!

This is a guide on how to set up [Terraform](https://developer.hashicorp.com/terraform) and [LocalStack](https://localstack.cloud/) for local, [hot-reloading](https://docs.localstack.cloud/user-guide/tools/lambda-tools/hot-reloading/) Typescript AWS Lambda and API Gateway development. You'll be able to query your REST API entirely locally. The features used in this guide require you to have [LocalStack Pro](https://localstack.cloud/pricing/). There is a trial membership available.

**In this guide we will:**

1. [Set up LocalStack Pro](./docs/initial-setup.md)

2. Deploy resources to LocalStack using one of the following IaC providers:
   1. [Terraform HCL](./docs/iac/terraform-hcl.md) `.tf`
   2. [Terraform CDK (CDKTF)](./docs/iac/terraform-cdk.md) `.ts`

3. [Query your local REST API](./docs/query-your-api.md)

## Why do I need to have LocalStack Pro?

Some functionality like UpdateIntegration for API Gateway is not currently available for the community edition of LocalStack. It's possible to force the recreation of the API Gateway integration and get around this, but Pro includes a lot of other handy features, such as the [Resource Browser](https://docs.localstack.cloud/user-guide/web-application/resource-browser/) which is a web interface for browsing your LocalStack AWS resources.

# Final Questions
1. Is it possible to hot-reload these lambdas for a faster feedback cycle?
2. What sort of workflows is this setup good for?
3. What are some of the limitations of this setup?
4. Is it better to run the lambda manually or through LocalStack?