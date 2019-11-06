# Berth Reservation UI

[![Build Status](https://travis-ci.com/City-of-Helsinki/berth-reservations-admin.svg?branch=develop)](https://travis-ci.com/City-of-Helsinki/berth-reservations-admin) [![Codecov](https://codecov.io/gh/City-of-Helsinki/berth-reservations-admin/branch/develop/graph/badge.svg)](https://codecov.io/gh/City-of-Helsinki/berth-reservations-admin/branch/develop/graph/badge.svg) [![GitHub issues](https://img.shields.io/github/issues/City-of-Helsinki/berth-reservations-admin)](https://img.shields.io/github/issues/City-of-Helsinki/berth-reservations-admin) [![GitHub forks](https://img.shields.io/github/forks/City-of-Helsinki/berth-reservations-admin)](https://img.shields.io/github/forks/City-of-Helsinki/berth-reservations-admin) [![Dependency Status](https://img.shields.io/david/City-of-Helsinki/berth-reservations-admin?branch=develop)](https://img.shields.io/david/City-of-Helsinki/berth-reservations-admin?branch=develop) [![devDependencies Status](https://david-dm.org/city-of-helsinki/berth-reservations-admin/dev-status.svg?branch=develop)](https://david-dm.org/city-of-helsinki/berth-reservations-admin?type=dev&branch=develop) [![GitHub license](https://img.shields.io/github/license/City-of-Helsinki/berth-reservations-admin)](https://img.shields.io/github/license/City-of-Helsinki/berth-reservations-admin)


## Prerequisites

- Node.js 12.x and yarn, or Docker and docker.compose
- Recommended editor for this project is VSCode.


## Environments

Storybook:
https://city-of-helsinki.github.io/berth-reservations-admin/?path=/story/*

GraphQL API URL:
https://venepaikka-api.test.hel.ninja/graphql_v2/

Staging:
https://venepaikka-admin.test.kuva.hel.ninja


### Setup

After cloning this repository, create a new `.env.local` file from the provided `.env.example` file and change `REACT_APP_API_URI`. 

```
$ cp .env.example .env.development.local
```

## Development

To start development environment, run:

```
$ yarn start
```

This will start [the application](http://localhost:3000) on port `3000`.

To only start the storybook on port `6006`:

```
$ yarn storybook
```

### Starting dockerized development environment

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


## Testing

To run tests:

```
$ yarn test
```

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
