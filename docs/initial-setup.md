# Initial Setup

This setup will get you started with LocalStack and common functionality shared between all of the IaC providers.

To set up the project you'll need to:

1. Install Node and PNPM
   1. NVM will let you easily manage the version of Node you are currently using (I used v20 as of writing this)
      1. [Windows NVM](https://github.com/coreybutler/nvm-windows)
      2. [Linux/MacOS NVM](https://github.com/nvm-sh/nvm)
   2. [PNPM](https://pnpm.io/installation) is a package manager for Node, like NPM and Yarn. 
      1. If you prefer NPM or Yarn, you could delete the pnpm-lock.yaml files, but this could break the project! 
2. [Install Docker](https://docs.docker.com/engine/install/)
   1. Localstack runs as a Docker container, so we need to [install Docker](https://docs.docker.com/engine/install/) first. Here's a handy GUI client for managing Docker containers, images, and volumes: [(Docker Desktop)](https://www.docker.com/products/docker-desktop).
3. Install Python and pip
   1. Localstack is installed using Python's package manager, pip. You can download Python from [here](https://www.python.org/downloads/). Pip is included in Python 3.4 and above. But just in case here is pip (https://pypi.org/project/pip/) 
4. [Install LocalStack CLI](https://docs.localstack.cloud/getting-started/installation/)
   1. `python -m pip install localstack`
5. [Generate a LocalStack API key](https://app.localstack.cloud/account/apikeys)
6. Copy `.env.example` to `.env` and replace the `LOCALSTACK_API_KEY` value with the key you generated in the LocalStack web interface.
7. Install root project dependencies with PNPM
   1. Run `pnpm install` in the project root
   2. This installs the dotenv-cli which we use to read your LocalStack API token from the .env file. This is used to ensure you download and activate LocalStack Pro.
8. Start the LocalStack Pro Docker container
   1. Run `pnpm run start:localstack` in the project root
   2. This convenience function reads you LocalStack API token and passes it to the LocalStack CLI  command `localstack start -d`
      1. The `-d` flag starts LocalStack detached, so you can close your terminal without stopping the Docker container.
9. You are now ready to configure your IaC provider, return to the project root [README](../README.md) and select your desired IaC provider.