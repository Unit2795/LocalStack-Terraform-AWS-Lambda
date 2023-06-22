# Query Your REST API Endpoint
1. Assemble an HTTP request using the API Gateway ID you noted earlier in the IAC setup step ([Terraform HCL](./iac/terraform-hcl.md) OR [Terraform CDK](./iac/terraform-cdk.md))
2. Endpoint Syntax: `http://<API Gateway ID>.execute-api.localhost.localstack.cloud:4566/<stageId>/<path>`
3. Example Endpoint: `http://1ltvwqpuju.execute-api.localhost.localstack.cloud:4566/local/test`
4. Example cURL:

```shell
curl --location 'http://1ltvwqpuju.execute-api.localhost.localstack.cloud:4566/local/test'
```

- Example Response: `{"message":"Hello World!"}`