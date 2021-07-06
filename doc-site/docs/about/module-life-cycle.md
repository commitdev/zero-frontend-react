---
title: Module Life cycle
sidebar_label: Module Life cycle
sidebar_position: 4
---


## Prerequisites
The CI/CD pipeline of the module requires S3 bucket and cloudfront distribution to be created under the same project name. And Injects the CI-user's credentials from into the CI secrets on init phase. These are created from the zero-aws-eks-stack repository.

## Scaffold
Based on Parameters in Project definition(`zero-project.yml`), module will be scaffolded and templated out during Zero create

Options that alter the templated repository
- `userAuth`: Determines whether user auth provider is included in your repository
- `CIVendor`: Scaffolds one of CircleCI / Github actions deployment pipeline
- `billingEnabled`: Includes billing page to load products and api calls to communicated with backend service, and API key in `config.json`


## Module Initialize phase 
_Run once only during `zero apply`_
- Sets up CI pipeline with `env-vars` and secrets containing CI-user's AWS Credentials
- Github Actions will rerun the initial commit since it was first ran without the credentials (during `zero create`)

## On-going
### Pull request
- Unit test
### Push to master branch
- Unit test
- Build static site
- (stage) Sync build to S3 bucket
- (stage) Invalidate Cloudfront Cache
- (prod) Sync build to S3 bucket
- (prod) Invalidate Cloudfront Cache
