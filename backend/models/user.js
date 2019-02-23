const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const UserSchema = new Schema(
  {
    email : String,
    password: String,
    passwordConfirmationValid: String,
    count: Number,
  });

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("User", UserSchema);
