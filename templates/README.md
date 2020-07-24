# <% .Name %> Frontend

## Getting Started

You now have a repo to create your frontend application. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

See full documentation [here](docs/create-react-app.md)

___

## Deployment

Your application is deployed to an AWS S3 bucket through CircleCi.

## Circle CI

Your repository comes with a end-to-end CI/CD pipeline, which includes the following steps:

1. Checkout
2. Unit Tests
3. Build for staging & production
4. Deploy Staging
5. Deploy Production

To learn more your pipeline checkout your [CircleCi config file](.circleci/config.yml)
___


## Environment Configs

These are set by `REACT_APP_CONFIG` enviroment variable at build time. This corresponds to a json file in the config directory.

For example to build the staging site and host it you would use:

```zsh
REACT_APP_CONFIG=staging yarn build

serve -s build
```
