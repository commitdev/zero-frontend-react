---
title: Overview
sidebar_label: Overview
sidebar_position: 1
---


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

[zero]: https://github.com/commitdev/zero
[zero-infra]: https://github.com/commitdev/zero-aws-eks-stack
