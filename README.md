# Shipyard

This application is used to add new ships and getting list of all ships from/to shipyard

## Test

To run tests for the application **npm ci** command needs to be run and then tests can be started by running **npm test** command. Test coverage is set for 90% for Statements

## Environment variables

The application needs following env variables to run successfully:

- MONGO_URI
- MONGO_DB
- MONGO_COLLECTION

### .env example

MONGO_URI=mongodb://localhost:27017,localhost:27017/
MONGO_DB=shipyard
MONGO_COLLECTION=ships
