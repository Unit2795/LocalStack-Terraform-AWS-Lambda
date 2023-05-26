# Terraform CDK (CDKTF)

In this setup, we'll utilize the `/cdktf` directory's Typescript Terraform CDK code to handle creating the resources we need.

1. [Install Terraform CLI](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)

2. [Install the CDKTF CLI](https://developer.hashicorp.com/terraform/tutorials/cdktf/cdktf-install)

   ``````shell
   pnpm install -g cdktf-cli
   ``````

3. Install dependencies in /cdktf directory

   1. Run `pnpm i` in the /cdktf directory

4. Deploy CDKTF resources

   1. In the /cdktf directory, run: `pnpm run build:deploy`

   2. Make note of the API Gateway ID that is output in your terminal after running `pnpm run build:deploy`, you'll need it to query your API Gateway endpoint. Example:

      ```
      aws_api_gateway_rest_api.api: Creation complete after 1s [id=1ltvwqpuju]
      ```

      

   3. This convenience function will build the source CDKTF Typescript files and deploy your resources to LocalStack.

5. [Query your API Gateway endpoint!](../query-your-api.md)

