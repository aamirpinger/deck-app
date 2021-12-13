# Deck App

## Tech: NodeJS / Typescript / MongoDB / Express

<br />

## Steps to run this project

1. Create .env file by copying .env.sample file and add proper values if values are missing

<br>

## For DEV environment

2. Install dependencies

```
    yarn
```

<br>

3. Up the mongo DB docker instance

```
  docker-compose -f docker-compose-dev.yaml up
```

<br>

4. Start server

```
    yarn start:dev
```

<br>

## For production environment

2. Start mongoDB instance and build production ready node app in to the container.

```
    docker-compose up
```

<br>

## To Kill the containers

```
    docker-compose down
```

<br>

## To run tests

```
    yarn test
```

<br>

## Postman API Collection

- A Postman collection file `deck-app.postman_collection.json` can be imported in Postman for
  Request and Response documentation.
