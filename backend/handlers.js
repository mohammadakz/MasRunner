"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

//Connect to the DB
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI, CLIENTID } = process.env;
const assert = require("assert");
const { sendResponse } = require("./utills");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const dbName = "MasRunner";

const postUserInfo = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    const { user } = req.body;
    const _id = uuidv4();
    const userInfo = {
      _id,
      userId: user.encodedId,
      user,
    };

    await client.connect();
    const db = client.db(dbName);
    const existingUser = await db
      .collection("users")
      .findOne({ userId: `${req.body.user.encodedId}` });

    if (existingUser === null) {
      await db.collection("users").insertOne(userInfo);
      sendResponse({ res, status: 200, message: "user added to db" });
      client.close();
    } else {
      sendResponse({ res, status: 300, message: "user already exists" });
      client.close();
    }
  } catch (err) {
    sendResponse({ res, status: 400, message: err.message });
    client.close();
  }
};

const postUserActivities = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    const _id = uuidv4();
    const userInfo = {
      _id,
      userId: req.body.userId,
      activity: req.body.activity,
    };

    await client.connect();
    const db = client.db(dbName);
    const existingUser = await db
      .collection("usersactivities")
      .findOne({ userId: `${req.body.userId}` });

    if (existingUser === null) {
      await db.collection("usersactivities").insertOne(userInfo);
      sendResponse({
        res,
        status: 200,
        message: "user's activities added to db",
      });
      client.close();
    } else {
      const newActivities = { $set: { activity: req.body.activity } };
      await db
        .collection("usersactivities")
        .updateOne({ userId: `${req.body.userId}` }, newActivities);
      sendResponse({ res, status: 300, message: "activity list updated" });
      client.close();
    }
  } catch (err) {
    sendResponse({ res, status: 400, message: err.message });
    client.close();
  }
};
module.exports = {
  postUserInfo,
  postUserActivities,
};
