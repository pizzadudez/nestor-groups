# Knex: migrate and seed DB
- `npm i -g knex`
- create tables `knex migrate:latest`
- delete tables `knex migrate:rollback`
- seed data `knex seed:run`