#!/bin/bash

# In order to set project env-vars, we must encrypt secrets
# Using gh client allows us to set the secret without installing another
# binary just to encrypt the secrets

# Login GH client
# GITHUB_ACCESS_TOKEN is injected when zero apply runs
gh auth login --with-token <<EOF
$GITHUB_ACCESS_TOKEN
EOF

gh auth status

AWS_KEY_PAIR=$(aws secretsmanager get-secret-value --region ${REGION} --secret-id=${PROJECT_NAME}-ci-user-aws-keys${RANDOM_SEED})
AWS_ACCESS_KEY_ID=$(echo ${AWS_KEY_PAIR} | jq -r '.SecretString'| jq -r .access_key_id)
AWS_SECRET_ACCESS_KEY=$(echo ${AWS_KEY_PAIR} | jq -r '.SecretString'| jq -r .secret_key)

## IMPORTANT: Set secret operates on the nearest .git repo even if you specify a different repository
pushd $PROJECT_DIR && \
gh secret set AWS_ACCESS_KEY_ID --repos="$GITHUB_REPO" --body="$AWS_ACCESS_KEY_ID" && \
gh secret set AWS_SECRET_ACCESS_KEY --repos="$GITHUB_REPO" --body="$AWS_SECRET_ACCESS_KEY" && \
popd

## Branch Protect for PRs
## By default we setup Pull-request checks of [lint, unit-test] in `.github/workflows/pull-request.yml`
## And we will enforce both the checks pass before PR can be merged into default branch
DEFAULT_BRANCH=master
curl -XPUT "https://api.github.com/repos/$GITHUB_ORG/$GITHUB_REPO/branches/$DEFAULT_BRANCH/protection" \
--header "Authorization: token $GITHUB_ACCESS_TOKEN" \
--header 'Content-Type: application/json' \
--data '{
	"required_status_checks": {
		"strict": false,
		"contexts": ["lint","unit-test"]
	},
	"enforce_admins": false,
	"required_pull_request_reviews": null,
	"restrictions": null
}'

echo "Github actions environment variables setup successfully."
