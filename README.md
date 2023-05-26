# LocalStack & Terraform REST API Test

This is a simple guide on how to: set up LocalStack and Terraform. This example will create an AWS Lambda function and connect it to an API Gateway that we can query locally.

# Steps
1. Install Docker 
   - Localstack runs as a Docker container, so we need to install Docker first. Here's a handy GUI client: [(Docker Desktop)](https://www.docker.com/products/docker-desktop).
2. Install Python and pip
   - Localstack is installed using PIP, so we need to install Python and PIP first. You can download Python from [here](https://www.python.org/downloads/). PIP is included in Python 3.4 and above. But just in case here is PIP (https://pypi.org/project/pip/) 
3. Install Terraform
   - Install the CLI here: [Terraform CLI](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)
4. Install Localstack and the Terraform provider with pip

   ```shell
   python -m pip install localstack
   pip install terraform-local
   ```
5. Initialize Localstack Terraform provider and apply resources
   - Make note of the API Gateway ID that is output in your terminal after running `tflocal apply`, you'll need it to query your API Gateway endpoint
   Example: 
   ```
      aws_api_gateway_rest_api.api: Creation complete after 1s [id=1ltvwqpuju]
   ````
   - This will initialize the Terraform provider, build and package your lambda, and apply the resources defined in the `main.tf` file
   - NOTE: The tflocal commands are functionally identical to the terraform commands, but they will automatically configure the AWS provider to use localstack
   ```shell
   tflocal init
   tflocal apply
   ```
6. Query your API Gateway endpoint!
   - Assemble an HTTP request using the API Gateway ID you noted earlier
   - Syntax: `http://<API Gateway ID>.execute-api.localhost.localstack.cloud:4566/<stageId>/<path>`
   - Example Endpoint: `http://1ltvwqpuju.execute-api.localhost.localstack.cloud:4566/local/test`
   - Example cURL:
   ```shell
   curl --location 'http://1ltvwqpuju.execute-api.localhost.localstack.cloud:4566/local/test'
   ```
   - Example Response: `{"message":"Hello World!"}`

# Final Questions
1. Is it possible to hot-reload these lambdas for a faster feedback cycle?
2. What sort of workflows is this setup good for?
3. What are some of the limitations of this setup?
4. Is it better to run the lambda manually or through LocalStack?