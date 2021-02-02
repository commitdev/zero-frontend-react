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
echo "Github actions environment variables setup successfully."
