const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");


// config .env file
dotenv.config({ path: "./.env" });

// set Database url
const DB = process.env.DB_URL.replace("<PASSWORD>", process.env.DB_PASSWORD);

// connect to database
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });


// connect to server
app.listen(process.env.PORT, () => {
  console.log(`Connected to ${process.env.PORT} port`);
});
