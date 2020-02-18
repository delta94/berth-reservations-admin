## Berth Reservation Admin

[![Build Status](https://travis-ci.com/City-of-Helsinki/berth-reservations-admin.svg?branch=develop)](https://travis-ci.com/City-of-Helsinki/berth-reservations-admin) [![Codecov](https://codecov.io/gh/City-of-Helsinki/berth-reservations-admin/branch/develop/graph/badge.svg)](https://codecov.io/gh/City-of-Helsinki/berth-reservations-admin/branch/develop/graph/badge.svg) [![Dependency Status](https://img.shields.io/david/City-of-Helsinki/berth-reservations-admin?branch=develop)](https://img.shields.io/david/City-of-Helsinki/berth-reservations-admin?branch=develop) [![devDependencies Status](https://david-dm.org/city-of-helsinki/berth-reservations-admin/dev-status.svg?branch=develop)](https://david-dm.org/city-of-helsinki/berth-reservations-admin?type=dev&branch=develop) [![GitHub license](https://img.shields.io/github/license/City-of-Helsinki/berth-reservations-admin)](https://img.shields.io/github/license/City-of-Helsinki/berth-reservations-admin)

Staff interface for Venepaikka.

Environments:

Storybook:
https://city-of-helsinki.github.io/berth-reservations-admin/?path=/story/*

Staging:
https://venepaikka-admin.test.kuva.hel.ninja

GraphQL API URL:
https://venepaikka-federation.test.kuva.hel.ninja/

GraphQL API overview: https://venepaikka-federation.test.kuva.hel.ninja/voyager

---

## Requirements

- Node 12.x
- yarn
- Git
- Docker and docker-compose
- Recommended editor for this project is VSCode.

## Common Setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/City-of-Helsinki/berth-reservations-admin.git
cd berth-reservations-admin
```

```bash
yarn
```

After cloning this repository, create a new `.env.development.local` file from the provided `.env.example` file and change `REACT_APP_API_URI`.

```bash
$ cp .env.example .env.development.local
```

## Development environment setup

### Storybook development environment

To start the storybook development server, run the following

```bash
yarn storybook
```

Open [http://localhost:6006](http://localhost:6006) and take a look around.

### Admin UI development environment

To start the development server, run the following

```bash
yarn start
```

Open [http://localhost:3000](http://localhost:3000) and take a look around.

### Testing

To run tests:

```bash
$ yarn test
```

### Dockerized development environment

1. Check if Docker and docker CLI installed, port `3000` is free, not occupied by running server.

2. Make sure you have env variables in `.env.development.local`, otherwise extend it from example by:
   ```
   $ cp .env.example .env.development.local
   ```
3. Start building docker image and start container:
   ```
   $ docker-compose up
   ```
4. Open `localhost:3000` on browser.

### Starting dockerized production environment

1. Check if Docker and docker CLI installed, port `80` is free, not occupied by running server.

2. Build docker image with:

```
$ docker build -t berth-reservation-admin .
```

3. Start docker container with:
   ```
   $ docker container run -p 80:80 -d berth-reservation-admin
   ```
4. Open `http://localhost` on browser.

## Useful docker command

- To rebuild the docker images:
  ```
  $ docker-compose up --force-recreate --build
  ```
- To enter inside docker container environment:
  ```
  $ docker-compose exec app sh
  ```
- Remove docker container if needed:
  ```
  $ docker rm -f berth-reservation-admin
  ```
- Remove docker image:
  ```
  $ docker rmi berth-reservations-admin_app
  ```
- Running command inside Docker environment (test for example):
  (Make sure docker container is running)
  `$ docker-compose run app YOUR_COMMAND_HERE`
- Encounter `node-sass` issue ? try to go inside docker container environment and run `npm rebuild node-sass`

## Deployment

### Storybook deployment

Storybook is used for in development and there's not CI/CD pipeline set up. To deploy a new version of storybook, run the following:

```bash
yarn deploy-storybook
```

To verify deployment, open [https://city-of-helsinki.github.io/berth-reservations-admin/](https://city-of-helsinki.github.io/berth-reservations-admin/) and check that everything is looking ok.

### Admin UI staging

Staging deployment is handled by CI/CD pipeline for new commits on `develop` branch.
