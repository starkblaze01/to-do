const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const buckets = require('./routers/api/buckets');
require('dotenv').config()

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = process.env.YOUR_KEY;

// connect to mongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


// Use Routes
app.use("/api/buckets", buckets);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
