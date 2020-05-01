# Ruminate

This module is part of the Ruminate restaurant reservation app. It displays data about customers' overall experiences, and renders all reviews for the restaurant.

## Table of Contents

1. [Requirements](#Usage)
2. [Development](#development)
3. [Deployment](#deployment)
4. [API](#api)

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node >=6.13.0
- PostgreSQL 12.2

### PostgreSQL
- Install and start PostgreSQL. 
- Create a database called `reviews` and select it.
- `\i 'database/schema.sql'`

## Development
- `npm install`
- Transpile and bundle with `npm react-dev`.
- [seed the database]
`npm run server-dev`  
The public folder will be available at host port 3010.

## API

GET {host}:3010/:id/ | Serves the HTML client-facing component page
GET {host}:3010/:id/reviews | Queries database for an array of review objects associated with a restaurant.

#### Parameters
id: **integer**  

The **id** parameter specifies the unique id of the restaurant being queried. Seeded test values range from 1-10000000 (10 million).
