# Berth Reservation Admin

[![Build Status](https://travis-ci.com/City-of-Helsinki/berth-reservations-admin.svg?branch=develop)](https://travis-ci.com/City-of-Helsinki/berth-reservations-admin) [![Codecov](https://codecov.io/gh/City-of-Helsinki/berth-reservations-admin/branch/develop/graph/badge.svg)](https://codecov.io/gh/City-of-Helsinki/berth-reservations-admin/branch/develop/graph/badge.svg) [![Dependency Status](https://img.shields.io/david/City-of-Helsinki/berth-reservations-admin?branch=develop)](https://img.shields.io/david/City-of-Helsinki/berth-reservations-admin?branch=develop) [![devDependencies Status](https://david-dm.org/city-of-helsinki/berth-reservations-admin/dev-status.svg?branch=develop)](https://david-dm.org/city-of-helsinki/berth-reservations-admin?type=dev&branch=develop) [![GitHub license](https://img.shields.io/github/license/City-of-Helsinki/berth-reservations-admin)](https://img.shields.io/github/license/City-of-Helsinki/berth-reservations-admin)

Staff interface for Venepaikka.

Environments:

- [Storybook](https://city-of-helsinki.github.io/berth-reservations-admin/?path=/story/*)
- [Staging](https://venepaikka-admin.test.kuva.hel.ninja)
- [GraphQL API URL](https://venepaikka-federation.test.kuva.hel.ninja/)
- [GraphQL API overview](https://venepaikka-federation.test.kuva.hel.ninja/voyager)

---

## Requirements

- Node 12.x
- Yarn
- Git
- Docker and docker-compose
- Recommended editor for this project is Visual Studio Code

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/City-of-Helsinki/berth-reservations-admin.git
cd berth-reservations-admin

yarn
```

After cloning this repository, create a new `.env.development.local` file from the provided `.env` file to be able to change environment variables such as `REACT_APP_API_URI`.

```bash
cp .env.example .env.development.local
```

## Development environment setup

### Storybook development

To start the Storybook development server, run the following:

```bash
yarn storybook
```

Open [http://localhost:6006](http://localhost:6006) and take a look around.

### React development environment

To start the development server, run the following

```bash
yarn start
```

Open [http://localhost:3000](http://localhost:3000) and take a look around.

### Testing

To run tests, run:

```bash
yarn test
```

### Dockerized development environment

1. Check that Docker and Docker CLI are installed, and port `3000` is free and not occupied by a running server.

2. Make sure you have env variables in `.env.development.local`, otherwise extend it from the example by:

   ```bash
   cp .env .env.development.local
   ```

3. Start building Docker image and start container:

   ```bash
   docker-compose up
   ```

4. Open [http://localhost:3000](http://localhost:3000).

### Dockerized production environment

1. Check that Docker and Docker CLI are installed, port `80` is free and not occupied by a running server.

2. Build Docker image with:

    ```bash
    docker build -t berth-reservation-admin .
    ```

3. Start Docker container with:

    ```bash
    docker container run -p 80:80 -d berth-reservation-admin
    ```

4. Open [http://localhost](http://localhost).

## Useful Docker commands

- To rebuild the Docker images:

  ```bash
  docker-compose up --force-recreate --build
  ```

- To enter inside Docker container environment:

  ```bash
  docker-compose exec app sh
  ```

- Remove Docker container if needed:

  ```bash
  docker rm -f berth-reservation-admin
  ```

- Remove Docker image:

  ```bash
  docker rmi berth-reservations-admin_app
  ```

- Running commands inside the Docker environment (tests for example):
  (Make sure Docker container is running)
  `$ docker-compose run app YOUR_COMMAND_HERE`
  - Encounter `node-sass` issue ? Try going inside the Docker container environment and running `npm rebuild node-sass`

## Deployment

### Storybook deployment

Storybook is used for development and there's no CI/CD pipeline set up. To deploy a new version of Storybook, run the following:

```bash
yarn deploy-storybook
```

To verify deployment, open [https://city-of-helsinki.github.io/berth-reservations-admin/](https://city-of-helsinki.github.io/berth-reservations-admin/) and check that everything is looking ok.

### Staging deployment

Staging deployment is handled by CI/CD pipeline for new commits on `develop` branch.

## Browser tests

Browser tests are written in TypeScript with [TestCafe](https://devexpress.github.io/testcafe/) framework and they are run against [test environment](https://venepaikka-admin.test.kuva.hel.ninja) in CI as Travis Cron Job (daily) with Chrome (headless mode).

### How to run locally

Set test user login credentials
- Open `.env.development.local` and set `BROWSER_TESTS_UID` and `BROWSER_TESTS_PWD`
- TBD: Link to values

Running against test environment

- `yarn browser-test`

Running against local environment

- `yarn browser-test:local`

### CI setup

Travis runs the `yarn browser-test:ci` script. Known issue: screen shots are taken on failure, but we cannot access them at the moment. We would need to setup Travis `artifacts` plugin for that, but it seems that there are no suitable AWS S3 we could use.
