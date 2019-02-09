const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContentsSchema = new Schema({
  title: String,
  category: Array,
  description: String,
  imageUrl: String,
});

module.exports = mongoose.model("Contents", ContentsSchema);