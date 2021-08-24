# Zero Frontend Application - React

This is a [Zero] module which sets up a
React web-app bundled statically served through CloudFront and S3 from the [zero-aws-eks-stack][zero-infra].

The `/templates` folder is meant to be filled in via [Zero][zero] and results in Simple React application. It also contains a simple CircleCI pipeline which defines how to build and deploy the service.

This repository is business-logic agnostic; mainly showcasing some universal best practices:

- Creating an optimized build of your frontend application.
- Out of the box CI/CD flow CircleCi.
  - testing
  - building your web-app as a static distribution in /dist folder.
  - syncs the built bundle to AWS S3.
  - invalidates Cloudfront cached version.

## Repository structure

___

```sh
/   # file in the root directory is for initializing the user's repo and declaring metadata
|-- Makefile                        #make command triggers the initialization of repository
|-- zero-module.yml                 #module declares required parameters and
|   # files in templates become the repo for users
|   templates/
|   |
|   |-- docs/
|   |   | create-react-app.md       #documentation on how work with your react application and external developer resources.
|   |-- public/
|   |   |-- favicon.ico
|   |   |-- index.html
|   |   |-- logo192.png
|   |   |-- logo512.png
|   |   |-- manifest.json
|   |   |-- robots.txt
|   |-- src/                       #src contains your react application code
|   |-- .gitignore
|   |-- README.md
|   |-- package.json
|   |-- yarn.lock

```

## Prerequisites

- Have CircleCI and GitHub token setup with the Zero project.
- CI-user created via EKS-stack with access to AWS S3.

___

## Initialization

This step is meant to be executed during `zero apply`, includes following steps:

- Adding environment variables to CircleCI project.
- Linking the CircleCi with the GitHub repository
  - Linking the circleCI will automatically trigger the first build and deploy your application to AWS S3

___

## FAQ

Why is my frontend application not yet accesible?

- It takes about 20 - 35 mins for your deployed application to be globally available through AWS CloudFront CDN.

### Backend Repo

The corresponding backends for this app are [zero-backend-go] or [zero-backend-node].

## Other links

Project board: [zenhub][zenhub-board]

<!-- Links -->
[zero]: https://github.com/commitdev/zero
[zero-infra]: https://github.com/commitdev/zero-aws-eks-stack
[zero-backend-go]: https://github.com/commitdev/zero-backend-go
[zero-backend-node]: https://github.com/commitdev/zero-backend-node

[zenhub-board]: https://app.zenhub.com/workspaces/commit-zero-5da8decc7046a60001c6db44/board?filterLogic=any&repos=203630543,247773730,257676371,258369081
