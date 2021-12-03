[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/fabripautasso/car-fleet-manager)

# Car Fleet Manager
Live version: https://car-fleet-manager.herokuapp.com/api-docs/

## Assumptions
* Car fleets are owned by one user
* Only fleet owners can see their car's fleet
* A car can be part of just one fleet
* Cars are available to all the users for pickup

## Missing 
The following insertion endpoints were not developed:
* POST /cars was not developed. To add new cars.
* POST /fleet was not developed. To add new fleets.
* User registration endpoint
Instead, data is being inserted by the ``SeedDb`` component on app startup
* `car_fleet_hist` table to store history of transactions on a fleet. (Add/Remove cars)
* Create different user roles. Fleet operator(owner), Admins, etc.

Unit tests coverage is low due the task time. The test case for `addCar` was done as an example

## Environment variables

* PORT: Port where the API is going to run
* SQL_DB: Name of the Database 
* SQL_USERNAME: Connection DB user name 
* SQL_PASSWORD: Connection DB password 
* SQL_HOST: Database host 
* SQL_PORT: Database port 
* SQL_DIALECT: Database dialect. Ex: postgres
* SQL_LOGGING: boolean to enable/disable query logging 
* ENCRYPTION_KEY: key to encrypt sensitive data, like passwords 
* JWT_KEY: key to sign the JWT tokens

## Setup

* Create a DB in your local environment or using a DB provider like [elephantsql](https://www.elephantsql.com/)
* Update the environment variables in env.local

## Start application

 * start with dev database `yarn start:dev`
 * start with local database `yarn start:local dbname={dbname} dbusername={dbusername} dbpassword={dbpassword}`

# Tech Stack
* This project is a seed for building a **node.js** api. It includes the following features:
* * [tsoa](https://www.npmjs.com/package/tsoa) `typescript`
* * [inversify](https://www.npmjs.com/package/inversify) `inversion of controll / dependency injection`
* * [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)
* * [typeorm](https://www.npmjs.com/package/typeorm) `SQL ORM`
* * [mocha](https://www.npmjs.com/package/mocha), [chai](https://www.npmjs.com/package/chai) `testing`
* * [ts-mockito](https://www.npmjs.com/package/ts-mockito) `testing`

## Where can I find the API Swagger documentation ?
* `<url>/api-docs`

## which is the endpoint URL?
* `<url>/service`

## Commands
* **instalation:** `yarn install`
* **dev:** `yarn start` *build tsoa routes, swagger definitions and starts the server on development mode listening to file changes (swagger definition changes will require a manual restart)*
* **test:** `yarn test` *unit tests*
* **build:** `yarn build` *production build*
* **prod:** `yarn start:prod` *starts the server on production mode*
* **local:** `yarn start:local` *lets the user sets the database via arguments*
   * **required arguments:**
      * **dbname=LOCAL_DBNAME**
      * **dbusername=LOCAL_USERNAME**
      * **dbpassword=LOCAL_PASSWORD**

## Scaffolding
* config `express server, DB connection, Logger, etc`
  * env `.env files`
* controllers `routes configuration`
* persistance `data abstraction layers`
  * Entities `classes and interfaces representing entities.`
  * Repositories `abstraction layer being used by services to access entities`
* services `business logic to be used primary by controllers`
  * Dtos `Data transfer objects, to decouple domain from Rest resources`
* utils
* tests

## Docker 
* [Base Image](phusion/baseimage:0.10.0) `phusion/baseimage`
* [Process Manager for Nodejs](http://pm2.keymetrics.io/) `PM2`