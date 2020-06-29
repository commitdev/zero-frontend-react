# The following parameters are required:
# - REPOSITORY
# - CIRCLECI_API_KEY
#

AWS_ACCESS_KEY_ID := $(shell aws secretsmanager get-secret-value --region ${region} --secret-id=ci-user-aws-keys${randomSeed} | jq -r '.SecretString'| jq -r .access_key_id)
AWS_SECRET_ACCESS_KEY := $(shell aws secretsmanager get-secret-value --region ${region} --secret-id=ci-user-aws-keys${randomSeed} | jq -r '.SecretString'| jq -r .secret_key)
GITHUB_ORG := $(shell echo ${REPOSITORY} | cut -d "/" -f 2)
GITHUB_REPO := $(shell echo ${REPOSITORY} | cut -d "/" -f 3)

run:
	@echo "Set CIRCLECI environment variables\n"
	curl -X POST --header "Content-Type: application/json" -d '{"name":"AWS_ACCESS_KEY_ID", "value":"${AWS_ACCESS_KEY_ID}"}' https://circleci.com/api/v1.1/project/github/${GITHUB_ORG}/${GITHUB_REPO}/envvar?circle-token=${CIRCLECI_API_KEY}
	curl -X POST --header "Content-Type: application/json" -d '{"name":"AWS_SECRET_ACCESS_KEY", "value":"${AWS_SECRET_ACCESS_KEY}"}' https://circleci.com/api/v1.1/project/github/${GITHUB_ORG}/${GITHUB_REPO}/envvar?circle-token=${CIRCLECI_API_KEY}
	@echo "\nFollow CIRCLECI project"
	curl -X POST https://circleci.com/api/v1.1/project/github/${GITHUB_ORG}/${GITHUB_REPO}/follow?circle-token=${CIRCLECI_API_KEY}
	@echo "\nDone"

