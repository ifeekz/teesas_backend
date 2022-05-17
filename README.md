# Teesa Backend

## Description

Built with [Nest](https://github.com/nestjs/nest), [TypeORM](https://typeorm.io/) and [Posgres](https://www.postgresql.org/docs/current/) database.

## Installation

```bash
$ git clone https://github.com/ifeekz/teesas_backend.git
$ cd teesas_backend
$ copy .env env.example
$ npm install
```

**NOTE:** Open the .env file and setup the environment variables for database credential: DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME and the jwt secret and expiration time.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test
```

## License

[MIT licensed](LICENSE).
