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

const postUserSteps = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    const _id = uuidv4();
    const userSteps = {
      _id,
      userId: req.body.userId,
      steps: req.body.steps,
    };
    await client.connect();
    const db = client.db(dbName);
    const existingUser = await db
      .collection("usersteps")
      .findOne({ userId: `${req.body.userId}` });

    if (existingUser === null) {
      await db.collection("usersteps").insertOne(userSteps);
      sendResponse({
        res,
        status: 200,
        message: "user's steps added to db",
      });
      client.close();
    } else {
      const newSteps = { $set: { steps: req.body.steps } };
      await db
        .collection("usersteps")
        .updateOne({ userId: `${req.body.userId}` }, newSteps);
      sendResponse({ res, status: 300, message: "steps updated" });
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

const getUserInfo = async (req, res) => {
  try {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(dbName);
    //
    const userInfo = await db.collection("users").find().toArray();

    res.status(200).json({
      status: 200,
      message: "list of all users",
      data: userInfo,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Error! getting the users",
    });
  }
};

const getUserSteps = async (req, res) => {
  try {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(dbName);
    //
    const allSteps = await db.collection("usersteps").find().toArray();

    res.status(200).json({
      status: 200,
      message: "list of all users steps",
      data: allSteps,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Error! getting the users steps",
    });
  }
};

const getUserActivities = async (req, res) => {
  try {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(dbName);
    //
    const allActivities = await db
      .collection("usersactivities")
      .find()
      .toArray();

    res.status(200).json({
      status: 200,
      message: "list of all users activities",
      data: allActivities,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Error! getting the users activities",
    });
  }
};
module.exports = {
  postUserInfo,
  postUserActivities,
  postUserSteps,
  getUserSteps,
  getUserInfo,
  getUserActivities,
};
