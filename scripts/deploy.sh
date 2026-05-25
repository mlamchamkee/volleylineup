#!/usr/bin/env bash
# Build and deploy Volley Lineup to AWS.
#
# Default: build Docker image, push to ECR, optionally roll ECS.
#
# Requires: aws CLI with credentials (env, ~/.aws/credentials, or SSO), docker
#
# Config (set in .env):
#   ECR_REPOSITORY_URI  — e.g. 123456789.dkr.ecr.us-east-1.amazonaws.com/volleylineup
#   AWS_REGION          — default us-east-1
#
# Optional ECS rollout after push:
#   ECS_CLUSTER
#   ECS_SERVICE
#
# Optional Lambda (with --lambda or --lambda-only):
#   LAMBDA_GET_LINEUP
#   LAMBDA_POST_LINEUP
#
# Static S3 (with --s3 or --s3-only):
#   AWS_BUCKET   — deploy target (required, never printed)
#
# Usage:
#   npm run deploy
#   npm run deploy -- --skip-build
#   npm run deploy -- --lambda
#   npm run deploy -- --lambda-only
#   npm run deploy:s3
#   npm run deploy:s3 -- --skip-build

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST="$ROOT/dist"
ASSETS="$ROOT/client/assets"
STYLESHEETS="$ROOT/client/stylesheets"
LAMBDA_ROOT="$ROOT/aws/lambda"
SKIP_BUILD=false
DEPLOY_DOCKER=true
DEPLOY_LAMBDA=false
DEPLOY_S3=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --skip-build)
      SKIP_BUILD=true
      shift
      ;;
    --lambda)
      DEPLOY_LAMBDA=true
      shift
      ;;
    --lambda-only)
      DEPLOY_DOCKER=false
      DEPLOY_LAMBDA=true
      shift
      ;;
    --s3)
      DEPLOY_S3=true
      shift
      ;;
    --s3-only)
      DEPLOY_DOCKER=false
      DEPLOY_S3=true
      shift
      ;;
    -h | --help)
      sed -n '2,30p' "$0"
      exit 0
      ;;
    *)
      echo "Unknown option: $1 (try --help)" >&2
      exit 1
      ;;
  esac
done

load_env() {
  local file="$1"
  [[ -f "$file" ]] || return 0

  while IFS= read -r line || [[ -n "$line" ]]; do
    [[ "$line" =~ ^[[:space:]]*# ]] && continue
    line="${line%%#*}"
    line="${line%"${line##*[![:space:]]}"}"
    line="${line#"${line%%[![:space:]]*}"}"
    [[ -z "$line" ]] && continue

    if [[ "$line" == export[[:space:]]* ]]; then
      line="${line#export }"
      line="${line#"${line%%[![:space:]]*}"}"
    fi

    if [[ "$line" =~ ^([A-Za-z_][A-Za-z0-9_]*)[[:space:]]*=[[:space:]]*(.*)$ ]]; then
      local key="${BASH_REMATCH[1]}"
      local val="${BASH_REMATCH[2]}"
      val="${val%"${val##*[![:space:]]}"}"
      val="${val#"${val%%[![:space:]]*}"}"
      if [[ "$val" =~ ^\"(.*)\"$ ]]; then
        val="${BASH_REMATCH[1]}"
      elif [[ "$val" =~ ^\'(.*)\'$ ]]; then
        val="${BASH_REMATCH[1]}"
      fi
      export "$key=$val"
    fi
  done < "$file"
}

if [[ -f "$ROOT/.env" ]]; then
  load_env "$ROOT/.env"
fi

REGION="${AWS_REGION:-us-east-1}"

require_aws() {
  if ! command -v aws >/dev/null 2>&1; then
    echo "aws CLI not found — install it and configure credentials first." >&2
    exit 1
  fi
}

require_docker() {
  if ! command -v docker >/dev/null 2>&1; then
    echo "docker not found — install Docker before deploying the app image." >&2
    exit 1
  fi
}

ecr_registry() {
  local uri="${1%%/*}"
  echo "$uri"
}

deploy_docker() {
  if [[ -z "${ECR_REPOSITORY_URI:-}" ]]; then
    echo "Set ECR_REPOSITORY_URI in .env before deploying the Docker image." >&2
    exit 1
  fi

  require_docker

  local registry
  registry="$(ecr_registry "$ECR_REPOSITORY_URI")"

  echo "Logging in to ECR…"
  aws ecr get-login-password --region "$REGION" \
    | docker login --username AWS --password-stdin "$registry"

  if [[ "$SKIP_BUILD" == false ]]; then
    echo "Building Docker image…"
    docker build -t "$ECR_REPOSITORY_URI:latest" "$ROOT"
  else
    echo "Skipping Docker build (--skip-build)."
  fi

  echo "Pushing $ECR_REPOSITORY_URI:latest"
  docker push "$ECR_REPOSITORY_URI:latest"

  if [[ -n "${ECS_CLUSTER:-}" && -n "${ECS_SERVICE:-}" ]]; then
    echo "Rolling ECS service $ECS_CLUSTER/$ECS_SERVICE…"
    aws ecs update-service \
      --cluster "$ECS_CLUSTER" \
      --service "$ECS_SERVICE" \
      --force-new-deployment \
      --region "$REGION" \
      --output text >/dev/null
    echo "ECS deployment started."
  fi
}

pack_lambda() {
  local dir="$1"
  local name="$2"
  local zip_file="/tmp/${name}.zip"

  if [[ ! -f "$dir/index.mjs" ]]; then
    echo "Missing $dir/index.mjs" >&2
    exit 1
  fi

  echo "Packaging $name…"
  rm -f "$zip_file"
  (
    cd "$dir"
    npm install --omit=dev --no-audit --no-fund
    zip -qr "$zip_file" . -x "*.git*" -x "todo.txt"
  )
  echo "$zip_file"
}

deploy_lambda_fn() {
  local dir="$1"
  local function_name="$2"
  local zip_file

  zip_file="$(pack_lambda "$dir" "$function_name")"

  echo "Updating Lambda $function_name…"
  aws lambda update-function-code \
    --function-name "$function_name" \
    --zip-file "fileb://$zip_file" \
    --region "$REGION" \
    --output text >/dev/null

  rm -f "$zip_file"
}

deploy_lambdas() {
  if [[ -z "${LAMBDA_GET_LINEUP:-}" || -z "${LAMBDA_POST_LINEUP:-}" ]]; then
    echo "Set LAMBDA_GET_LINEUP and LAMBDA_POST_LINEUP in .env for Lambda deploy." >&2
    exit 1
  fi

  if ! command -v zip >/dev/null 2>&1; then
    echo "zip not found — install zip before deploying Lambda functions." >&2
    exit 1
  fi

  deploy_lambda_fn "$LAMBDA_ROOT/getLineup" "$LAMBDA_GET_LINEUP"
  deploy_lambda_fn "$LAMBDA_ROOT/postLineup" "$LAMBDA_POST_LINEUP"
}

deploy_s3() {
  if [[ -z "${AWS_BUCKET:-}" ]]; then
    echo "Set AWS_BUCKET in .env before deploying to S3." >&2
    exit 1
  fi

  local bucket="$AWS_BUCKET"

  if [[ "$SKIP_BUILD" == false ]]; then
    echo "Building app…"
    npm run build --prefix "$ROOT"
  fi

  if [[ ! -f "$DIST/index.html" ]]; then
    echo "Missing $DIST/index.html — run npm run build first." >&2
    exit 1
  fi

  if [[ ! -f "$DIST/bundle.js" ]]; then
    echo "Missing $DIST/bundle.js — run npm run build first." >&2
    exit 1
  fi

  echo "Uploading to s3://$bucket/ (region: $REGION)"

  aws s3 cp "$DIST/index.html" "s3://$bucket/index.html" \
    --region "$REGION" \
    --cache-control "no-cache" \
    --content-type "text/html; charset=utf-8" \
    --only-show-errors

  aws s3 cp "$DIST/bundle.js" "s3://$bucket/bundle.js" \
    --region "$REGION" \
    --cache-control "no-cache" \
    --content-type "text/javascript; charset=utf-8" \
    --only-show-errors

  if [[ -d "$ASSETS" ]]; then
    aws s3 sync "$ASSETS/" "s3://$bucket/assets/" \
      --region "$REGION" \
      --delete \
      --cache-control "public,max-age=31536000,immutable" \
      --only-show-errors
  fi

  if [[ -d "$STYLESHEETS" ]]; then
    aws s3 sync "$STYLESHEETS/" "s3://$bucket/stylesheets/" \
      --region "$REGION" \
      --delete \
      --cache-control "no-cache" \
      --only-show-errors
  fi

  echo "https://${bucket}.s3.${REGION}.amazonaws.com/index.html"
}

require_aws

if [[ "$DEPLOY_DOCKER" == true ]]; then
  deploy_docker
fi

if [[ "$DEPLOY_LAMBDA" == true ]]; then
  deploy_lambdas
fi

if [[ "$DEPLOY_S3" == true ]]; then
  deploy_s3
fi

echo "Deploy complete."
