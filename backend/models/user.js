const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const UserSchema = new Schema(
  {
    email : String,
    password: String,
    passwordConfirmationValid: String
  });

// const BoardSchema = new Schema({
//   name : String,
//   title : String,
//   description : String,
//   category : String,
//   location : String,
//   partner : String
// })
// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("User", UserSchema);
// module.exports = mongoose.model("Board", BoardSchema);