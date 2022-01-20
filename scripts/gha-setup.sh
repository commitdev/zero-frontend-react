#!/bin/bash
set -e

COMMAND=$1

## Setup variables for checks
GITHUB_ORG=$(echo ${REPOSITORY} | cut -d "/" -f 2)
GITHUB_REPO=$(echo ${REPOSITORY} | cut -d "/" -f 3)
RANDOM_SEED=${randomSeed}
REGION=${region}

# In order to set project env-vars, we must encrypt secrets
# Using gh client allows us to set the secret without installing another
# binary just to encrypt the secrets
setup () {
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
	gh secret set AWS_ACCESS_KEY_ID --repos="$GITHUB_ORG/$GITHUB_REPO" --body="$AWS_ACCESS_KEY_ID" && \
	gh secret set AWS_SECRET_ACCESS_KEY --repos="$GITHUB_ORG/$GITHUB_REPO" --body="$AWS_SECRET_ACCESS_KEY" && \
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
			"contexts": ["unit-test"]
		},
		"enforce_admins": false,
		"required_pull_request_reviews": null,
		"restrictions": null
	}'

	## Rerun github actions workflow, since the first time github action is ran there are no AWS credentials
	## so it will always fail, begining of this script we inject the AWS credentials, therefore now we can rerun the workflow
	MOST_RECENT_RUN_ID=$(curl -XGET --url "https://api.github.com/repos/${GITHUB_ORG}/${GITHUB_REPO}/actions/runs" \
	--header "Authorization: token $GITHUB_ACCESS_TOKEN" --header 'Content-Type: application/json' | jq -r ".workflow_runs[0].id")
	## Triggering the rerun
	curl -XPOST --url "https://api.github.com/repos/${GITHUB_ORG}/${GITHUB_REPO}/actions/runs/${MOST_RECENT_RUN_ID}/rerun" \
	--header "Authorization: token $GITHUB_ACCESS_TOKEN" --header 'Content-Type: application/json'

	echo "Github actions environment variables setup successfully."
}

check () {
	# Check if required binaries are installed on user's environment
	sh scripts/required-bins.sh gh
	# Check github token is able to access this repo
	curl -s -XGET "https://api.github.com/repos/$GITHUB_ORG/${GITHUB_REPO}" \
	--header "Authorization: token $GITHUB_ACCESS_TOKEN" --header 'Content-Type: application/json' | jq -e ".name == \"${GITHUB_REPO}\""
}

echo "Running command $COMMAND"
$COMMAND
