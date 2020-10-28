"use strict";
const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");

const router = express.Router();
router.get("/api", async function(req, res, next) {
  res.setHeader("Content-Type", "application/json");

  // var requestOptions = {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     Authorization:
  //       "Basic Y2VjNTZhY2UtNTI3ZC00NjIzLWE2ZmEtYmNhMGU1ZWI1ODkwOg==",
  //     "Access-Control-Allow-Origin": "*"
  //   },
  //   redirect: "follow"
  // };

  try {
    let result = getApi();
    result.then(function(result) {
      res.status(200).json(result); // "Some User token"
    });
    // let result = await getApi();
    // res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }

  async function getApi() {
    const promise = await axios
      .post(
        "http://www.reed.co.uk/api/1.0/search?employerId=488552",
        {},
        {
          headers: {
            Authorization:
              "Basic Y2VjNTZhY2UtNTI3ZC00NjIzLWE2ZmEtYmNhMGU1ZWI1ODkwOg==",
            Accept: "application/json"
          }
        }
      )
      .then(response => response.data);

    const dataPromise = promise;

    return dataPromise;
  }
});
router.get("/another", (req, res) => res.json({ route: req.originalUrl }));
router.post("/", (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use("/.netlify/functions/server", router); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
