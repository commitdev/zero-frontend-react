# Zero Deployable Frontend

This is a [Zero] module which sets up a
service which can be deployed to the environment set up with [zero-aws-eks-stack][zero-infra].

The `/templates` folder is meant to be filled in via [Zero][zero] and results in Simple React application. It also contains a simple CircleCI pipeline which defines how to build and deploy the service.

This repository is framework/business-logic agnostic; mainly showcasing some universal best practices:

- Creating an optimized build of your frontend application.

- Out of the box CI/CD flow CircleCi.
  - testing
  - uploading build to an AWS S3 bucket.

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
|   |   | create-react-app.md       #contains documentation on how work with your react application and external links to developer resources.
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

### Backend Repo

The corresponding frontend for this app is [zero-deployable-backend].

## Other links

Project board: [zenhub][zenhub-board]

<!-- Links -->
[zero]: https://github.com/commitdev/zero
[zero-infra]: https://github.com/commitdev/zero-aws-eks-stack
[zero-deployable-backend]: https://github.com/commitdev/zero-deployable-backend

[zenhub-board]: https://app.zenhub.com/workspaces/commit-zero-5da8decc7046a60001c6db44/board?filterLogic=any&repos=203630543,247773730,257676371,258369081
