# Setup
- `cd server && npm install`
- `cd client && npm install`
- check README.md inside server/ to migrate database (Postgres) and seed initial example data
# Run locally
- `cd server && npm start`
- `cd client && npm start`
- webserver is not setup to serve built react project

# Observations
- Upon clicking a button (group/person) available destinations (groups) will remain enabled, while all other buttons become disabled
  - Click desired destination to perform a move
- UI/UX sucks (I know), no time for Sass/theming/learning bootstrap
- No option to change group from Edit modal, only manual
- group.level was my initial way of determining eligible destination groups 
  - it failed, but it might be useful for something else, like adding margin-right to subgroups