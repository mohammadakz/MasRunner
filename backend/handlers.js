"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

//Connect to the DB
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const assert = require("assert");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const handler = async (req, res) => {};

module.exports = {
  handler,
};
