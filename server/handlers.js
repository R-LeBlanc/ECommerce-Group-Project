"use strict";

require("dotenv").config();
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Retrieves all products from the database
const getProducts = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("ReservoirCats");

  db.collection("Products")
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(500).json({ status: 500, message: err });
      }
      res.status(200).json({ status: 200, data: result });
      client.close();
    });
};

// Retrieves a product based on the id
const getProductById = async (req, res) => {
  const _id = req.params._id;
  const client = new MongoClient(MONGO_URI, options);
  console.log(typeof _id);
  try {
    await client.connect();
    const db = client.db("ReservoirCats");

    const product = await db
      .collection("Products")
      //   the id is not stored as a string so the _id from the req has to be parsed into a number
      .findOne({ _id: parseInt(_id) });
    console.log(product);
    res.status(200).json({ status: 200, data: product });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

// Updates the stock of a product based on id
// relies on the frontend sending the updated stock amount
const updateStock = async (req, res) => {
  const _id = req.params._id;
  const query = { _id };
  const newValues = {
    $set: {
      // req.body.numInStock should be the updated stock amount sent from the front end
      numInStock: req.body.numInStock,
    },
  };
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("ReservoirCats");
    await db.collection("Products").updateOne(query, newValues);
    res.status(200).json({
      status: 200,
      data: newValues.$set,
      message: "Stock has been updated",
    });
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
};

module.exports = { getProducts, getProductById, updateStock };
