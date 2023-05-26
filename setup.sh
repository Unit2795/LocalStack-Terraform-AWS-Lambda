#!/bin/bash

# Install localstack with pip https://pypi.org/project/pip/
python -m pip install localstack

# Install the localstack wrapper for terraform (if using terraform, there are other wrappers available at: https://docs.localstack.cloud/user-guide/integrations/)
pip install terraform-local

# The tflocal commands are functionally identical to the terraform commands, but they will automatically configure the AWS provider to use localstack
# Initialize terraform project with the localstack wrapper
tflocal init

# Apply terraform changes to localstack environment
tflocal apply

