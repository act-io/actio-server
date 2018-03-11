require('dotenv').config();
const promise = require('bluebird');

const options = {
  // Initialization Options
  promiseLib: promise,
};
const pgp = require('pg-promise')(options);
const DATABASE = process.env.DATABASE_URL;
const db = pgp(DATABASE);

module.exports = db;
