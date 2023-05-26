# Terraform HCL

In this setup, we'll utilize the `main.tf` Terraform HCL file to handle creating the resources we need.

1. [Install Terraform CLI](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)

2. Install [Localstack Terraform](https://github.com/localstack/terraform-local) provider with pip

   ```shell
   pip install terraform-local
   ```

3. Initialize Localstack Terraform provider (tflocal) and apply resources
   - ```shell
     tflocal init
     tflocal apply
     ```

   - Make note of the API Gateway ID that is output in your terminal after running `tflocal apply`, you'll need it to query your API Gateway endpoint. Example:
   ```
      aws_api_gateway_rest_api.api: Creation complete after 1s [id=1ltvwqpuju]
   ```
   - This will initialize the Terraform provider, build and package your lambda, and apply the resources defined in the `main.tf` file
   - NOTE: The tflocal commands are functionally identical to the terraform commands, but they will automatically configure the AWS provider to use localstack

4. [Query your API Gateway endpoint!](../query-your-api.md)
