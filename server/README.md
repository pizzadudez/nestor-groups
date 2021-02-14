# Knex: migrate and seed DB
- DB is PostgreSQL
- `npm i -g knex`
- create tables `knex migrate:latest`
- delete tables `knex migrate:rollback`
- seed data `knex seed:run`