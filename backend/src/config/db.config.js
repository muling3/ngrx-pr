const mongoose = require("mongoose");

const CONNECTION_URI = "mongodb://root:password@localhost:27017/ngrx-pr"

module.exports = async () => {
  try {
    await mongoose.connect(CONNECTION_URI);
    console.log("Connected successfully to db")
  } catch (error) {
    console.log("Error occurred while connecting to db", error)
    process.exit(1)
  }
};
