"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

//Connect to the DB
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI, CLIENTID } = process.env;
const assert = require("assert");
const request = require("request-promise");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const handler = async (req, res) => {
  try {
    console.log(req.body.hash.split("&")[0].slice(14));
  } catch (err) {
    console.log("Error: ", err);
  }
};

module.exports = {
  handler,
};
