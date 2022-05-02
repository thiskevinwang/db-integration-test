# db-integration-test

This repository demonstrates running `jest` **integration** tests against DynamoDB and Postgres. There are two flavors.

**`docker compose`** [^compose]

- This is intended for local testing

**GitHub workflows**

- This is intended for testing in a CI workflow.
- This route leverages [service containers](https://docs.github.com/en/actions/using-containerized-services/about-service-containers)
  > You can use service containers to connect databases, web services, memory caches, and other tools to your workflow.

[^compose]:
    > The new Compose V2, which supports the `compose` command as part of the Docker CLI, is now available.

    See: [docs](https://docs.docker.com/compose/cli-command/#:~:text=The%20new%20Compose%20V2%2C%20which%20supports%20the%20compose%20command%20as%20part%20of%20the%20Docker%20CLI%2C%20is%20now%20available.)

## Prerequisites

- [Docker desktop](https://docs.docker.com/desktop/)
- [Docker CLI](https://docs.docker.com/engine/reference/commandline/cli/)

## Getting started

### Local Testing

Run `make test`

### CI Testing

Push to the default branch to trigger a GitHub workflow run

- See [ci.yml](./.github/workflows/ci.yml) for details

## Misc Notes:

Some various commands to test locally.

```bash
# start postgres alone
docker run --name some-postgres -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword --rm -d postgres

# start dynamo alone
docker run --name some-dynamo -p 8000:8000 --rm -d amazon/dynamodb-local

# build and start test container
docker build -t vercel-db-test:latest .
docker run --rm --tty -p 3000:3000 vercel-db-test:latest

# test workflow with `act`
act push -W ./.github/workflows/ci.yml
```
