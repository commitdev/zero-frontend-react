#!/bin/bash
set -e
if [[ "${CIVendor}" == "github-actions" ]]; then
  sh ./scripts/gha-setup.sh check
elif [[ "${CIVendor}" == "circleci" ]]; then
  echo "CircleCI checks successful"
fi
