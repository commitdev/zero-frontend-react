# The following parameters are required:
# - GITHUB_ORG
# - GITHUB_REPO
# - CIRCLECI_TOKEN
#

AWS_ACCESS_KEY_ID := $(shell aws secretsmanager get-secret-value --secret-id=ci-user-aws-keys | jq -r '.SecretString'| jq -r .access_key_id)
AWS_SECRET_ACCESS_KEY := $(shell aws secretsmanager get-secret-value --secret-id=ci-user-aws-keys | jq -r '.SecretString'| jq -r .secret_key)

run:
	@echo "Set CIRCLECI environment variables\n"
	curl -X POST --header "Content-Type: application/json" -d '{"name":"AWS_ACCESS_KEY_ID", "value":"${AWS_ACCESS_KEY_ID}"}' https://circleci.com/api/v1.1/project/github/${GITHUB_ORG}/${GITHUB_REPO}/envvar?circle-token=${CIRCLECI_TOKEN}
	curl -X POST --header "Content-Type: application/json" -d '{"name":"AWS_SECRET_ACCESS_KEY", "value":"${AWS_SECRET_ACCESS_KEY}"}' https://circleci.com/api/v1.1/project/github/${GITHUB_ORG}/${GITHUB_REPO}/envvar?circle-token=${CIRCLECI_TOKEN}
	@echo "\nFollow CIRCLECI project"
	curl -X POST https://circleci.com/api/v1.1/project/github/${GITHUB_ORG}/${GITHUB_REPO}/follow?circle-token=${CIRCLECI_TOKEN}
	@echo "\nDone"

