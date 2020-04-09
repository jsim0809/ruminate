# Reviews and Impressions Module

This module is part of the FreeSeats restaurant reservation app. It displays data about customers' overall experiences, and renders all reviews for the restaurant.

## Related Modules

[Search Bar](https://github.com/freeseats/exzerone-search-bar)  
[Menu, Related Info](https://github.com/freeseats/Menu-Related-SideBar)  
[Photos](https://github.com/freeseats/matthewjdiaz1-photo-service)  
[Reservation Booking](https://github.com/freeseats/wfong-service-reservations)

## Table of Contents

1. [Requirements](#Usage)
2. [Development](#development)
3. [Deployment](#deployment)
4. [API](#api)

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node >=6.13.0
- ArangoDB 3.6.2

### ArangoDB
- Install and start ArangoDB. 
- Create a collection called `reviews` in the default `_system` database.
- Ensure the user and password are being passed in correctly in `database/index.js`.
- `npm run seed`  
- `arangoimport --file "reviews_10m.jsonl" --type jsonl --collection reviews --progress true --overwrite true --threads 4`

## Development
- Clone and install the node  dependencies.  
- In development mode, the host URL for `getReviewsData` in `/client/src/components/reviewsComponent.jsx` should be `localhost`.  
- Transpile and bundle with `npm react-dev`.
- [seed the database]
`npm run server-dev`  
The public folder will be available at host port 3010.

### Deployment

<!-- Build the bundle with `npm build`.  
Make sure no images with the names "rdbimg" or "rfeimg", or containers with the names "rdb" or "rfe" exist on the host.  
`bash compose`  
Visit port 3010 on the host IP  
To compose down, use `bash decompose`... but be aware that it will prune any other dangling images and volumes as well. -->

## API

GET {host}:3010/:id/            Serves the HTML client-facing component page
GET {host}:3010/:id/reviews     Queries database for an array of review objects associated with a restaurant.

##### Parameters
id: **integer**  

The **id** parameter specifies the unique id of the restaurant being queried. Seeded test values range from 1-10000000 (10 million).