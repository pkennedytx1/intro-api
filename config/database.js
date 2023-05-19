const mongoose = require("mongoose");

const { MONGO_CONNECTION_STRING } = process.env;
console.log(MONGO_CONNECTION_STRING)

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};