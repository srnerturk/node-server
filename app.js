"use strict";

const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
})

app.listen(5000, () =>
  console.log(`Listening on port 5000.`),
);