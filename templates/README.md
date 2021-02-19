# <% .Name %> Frontend

## Getting Started

You now have a repo to create your frontend application. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

See full documentation [here](docs/create-react-app.md)

___

## Deployment

Your application is deployed to an AWS S3 bucket through CircleCi.

<%if eq (index .Params `CIVendor`) "circleci" %>## Circle CI

Your repository comes with a end-to-end CI/CD pipeline, which includes the following steps:

1. Checkout
2. Unit Tests
3. Build for Staging
4. Deploy Staging
5. Build for Production
6. Deploy Production

The *Deploy* step does a:

- AWS S3 Bucket Sync
- Cloudfront Invalidation

To learn more your pipeline checkout your [CircleCi config file](.circleci/config.yml)
<% else if eq (index .Params `CIVendor`) "github-actions" %>## Github actions
Your repository comes with a end-to-end CI/CD pipeline, which includes the following steps:
1. Checkout
2. Unit Tests
3. Build frontend (stage / prod)
4. Deploy Staging
5. Integration tests
6. Deploy Production

**Note**: you can add a approval step using Github Environments(Available for Public repos/Github pro), you can configure an environment in the Settings tab then simply add the follow to your ci manifest (`./github/workflows/ci.yml`)
```yml
deploy-production: # or any step you would like to require Explicit approval
  enviroments:
    name: <env-name>
```
### Branch Protection
Your repository comes with a protected branch `master` and you can edit Branch protection in **Branches** tab of Github settings. This ensures code passes tests before getting merged into your default branch.
By default it requires `[lint, unit-test]` to be passing to allow Pull requests to merge.

<% end %>

___


## Environment Configs

These are set by `REACT_APP_CONFIG` enviroment variable at build time. This corresponds to a json file in the config directory.

For example to build the staging site and host it you would use:

```zsh
REACT_APP_CONFIG=staging yarn build

serve -s build
```
