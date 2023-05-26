# Query Your REST API Endpoint
1. Assemble an HTTP request using the API Gateway ID you noted earlier
2. Syntax: `http://<API Gateway ID>.execute-api.localhost.localstack.cloud:4566/<stageId>/<path>`
3. Example Endpoint: `http://1ltvwqpuju.execute-api.localhost.localstack.cloud:4566/local/test`
4. Example cURL:

```shell
curl --location 'http://1ltvwqpuju.execute-api.localhost.localstack.cloud:4566/local/test'
```

- Example Response: `{"message":"Hello World!"}`