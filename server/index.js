"use strict";

const express = require("express");
const morgan = require("morgan");

const { getProducts, getProductById } = require("./handlers");

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // REST endpoints here
  // ********************
  // returns all the product objects
  .get("/products", getProducts)
  // returns a product based on the id
  .get("/products/:_id", getProductById)
  // catch all endpoint
  .get(`*`, (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is not the server you are looking for.",
    });
  })
  // .get("/bacon", (req, res) => res.status(200).json("🥓"))

  // ******************************
  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
