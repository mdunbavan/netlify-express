"use strict";
const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
var async = require("express-async-await");

const router = express.Router();
router.get("/api", async function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  var requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization:
        "Basic Y2VjNTZhY2UtNTI3ZC00NjIzLWE2ZmEtYmNhMGU1ZWI1ODkwOg==",
      "Access-Control-Allow-Origin": "*"
    },
    redirect: "follow"
  };

  try {
    let result = await getApi(requestOptions);
    res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }

  function getApi(requestOptions) {
    return fetch(
      "http://www.reed.co.uk/api/1.0/search?employerId=488552",
      requestOptions
    ).then(res => {
      return res.json();
    });
  }
});
router.get("/another", (req, res) => res.json({ route: req.originalUrl }));
router.post("/", (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use("/.netlify/functions/server", router); // path must route to lambda
app.use("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));

module.exports = app;
module.exports.handler = serverless(app);
