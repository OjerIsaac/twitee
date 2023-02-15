# INTELLIGENCE INNOVATIONS BACKEND DEVELOPER ASSESSMENT
This is a mini and substandard runoff of Twitter powered by Nodejs, Express and TS

## Requirements
- NodeJS runtime
- NPM or Yarn package manager
- Postgres Database

## Features
- Completely written in [Typescript](https://typescriptlang.org/)
- [Express](https://expressjs.com/) Nodejs framework
- [PostgreSQL](https://www.postgresql.org/docs/) Open Source Relational Database
- [Objection.js](https://vincit.github.io/objection.js/) SQL ORM for Nodejs
- [Knexjs](https://knexjs.org/) SQL query builder

## How to install
- Clone the repository
- `git clone https://github.com/OjerIsaac/twitee.git`
- `cd twitee`
- Install dependencies
- `npm install`
- Setup environment variable
- `cp .env.sample .env`
- Fill in data for db (Postgres)
- Run Migration
- `npm run migrate:latest`
- To seed db
- `npm run seed:run`
- Run the server in dev env
- `npm run dev`

## Documentation link
- The endpoints for test of the service are provided in the [Postman Documentation]().