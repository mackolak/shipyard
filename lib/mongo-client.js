require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);
const database = client.db(process.env.MONGO_DB);
const ships = database.collection(process.env.MONGO_COLLECTION);

module.exports = ships;
