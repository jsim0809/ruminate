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
- PostgreSQL 11.2

## Development
Clone and install the node  dependencies.  
In development mode, the host URLs for  `getSummaryData` and `getReviewsData`  in `/client/src/components/reviewsComponent.jsx` should be `localhost`.  
Transpile and bundle with `npm react-dev`.  
[seed the database](#postgresql)  
`npm run server-dev`  
The public folder will be available at host port 3010.

### PostgreSQL
Install and start Postgres. Create a reviews database and `psql` into it. From the postgres shell, run `=# \i database/schema.sql`.  
Ensure the role and password are correct in `config/db_config.js`, and make sure the environment variables supplied in the `compose` and `awscompose` files match these.
`npm run seed`  

### Deployment

Build the bundle with `npm build`.  
Make sure no images with the names "rdbimg" or "rfeimg", or containers with the names "rdb" or "rfe" exist on the host.  
`bash compose`  
Visit port 3010 on the host IP  
To compose down, use `bash decompose`... but be aware that it will prune any other dangling images and volumes as well.

## API

### Restaurant Summary

GET {host}:3010/:id/summary

##### Parameters
id: **integer**  

The **id** parameter specifies the unique id of the restaurant being queried. Seeded test values range from 1-5.

##### Response

If successful, this method returns a response body with the following structure:

{  
  "location": **_string_**,  
  "noise": **_string_**,  
  "recommendPercent": **_integer_**,  
  "valueRating": **_string_**,  
  "averageOverall": **_string_**,  
  "averageFood": **_string_**,  
  "averageAmbience": **_string_**,  
  "averageService": **_string_**  
}  

### Restaurant Reviews

GET {host}:3010/:id/reviews

##### Response

If successful, this method returns an array containing objects with the following structure:

{  
  "id": **_integer_**,  
  "restaurant": **_integer_**,  
  "text": **_string_**,  
  "date": **_date_**,  
  "overall": **_integer_**,  
  "food": **_integer_**,  
  "service": **_integer_**,  
  "ambience": **_integer_**,  
  "wouldrecommend": **_boolean_**  
  "tags": **_string_**,  
  "firstname": **_string_**,  
  "lastname": **_string_**,  
  "city": **_string_**,  
  "avatarcolor": **_string_**,  
  "isvip": **_boolean_**,  
  "totalreviews": **_integer_**  
}
