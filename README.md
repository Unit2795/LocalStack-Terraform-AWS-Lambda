# LocalStack & Terraform REST API Test

This is a simple guide on how to set up LocalStack and Terraform. This example will create an AWS Lambda function and connect it to an API Gateway that we can query locally.

# Steps
1. Install Docker 
   - Localstack runs as a Docker container, so we need to install Docker first. Here's a handy GUI client (Docker Desktop) from [here](https://www.docker.com/products/docker-desktop).
2. Install Python and PIP
   - Localstack is installed using PIP, so we need to install Python and PIP first. You can download Python from [here](https://www.python.org/downloads/). PIP is included in Python 3.4 and above. But just in case here is PIP (https://pypi.org/project/pip/) 
3. Install LocalStack
   - 