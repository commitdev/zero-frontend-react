## Commit Zero

This app is created to work with Commit Zero. You'll need to run the `zero` application against a `zero.yml` file to generate the code.

### Zero Command

```bash
zero -config <config file> <source directory> <destination directory>
```

#### Config File

See `example.yml` for the full example.

```yaml
---
name: example-commit-zero-frontend

# params are key value pairs passed into templates
params:

  # Application config

  # production host name
  productionHost: fe-test.commitzero.com
  productionBucket: fe-test.commitzero.com

  # staging host name
  stagingHost: fe-test.commitzero.com
  stagingBucket: fe-test.commitzero.com

```

_Once you've templated this out, you can remove the above section from this README as it's no longer needed._

---

# <% .Name %>

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

See full documentation [here](docs/create-react-app.md)

### Commands

#### Install Dependencies

```zsh
yarn
```

#### Run locally

```zsh
yarn start
```

#### Run Tests

```zsh
yarn test
```

## Backend App

To run the backend app locally all you need to do is build the container and run it alongside your app.

### Backend Repo

The corresponding backend for this app is [zero-deployable-backend](https://github.com/commitdev/zero-deployable-backend)

```zsh
git clone git@github.com:commitdev/zero-deployable-backend.git
```

### Docker

Build the docker image locally and run it. We need to set a Pod name so that the frontend can display that data.

```zsh
docker build . -t zero-deployable-backend

docker run -p 8080:8080 -e SERVER_PORT=8080 -e POD_NAME="Fake POD name." zero-deployable-backend
```
