const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    //unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
  },
  interests: {
    type: Array,
  },
  image: {
    type: String
  },
  sex: {
    type : String,
  },
  birth: {
    type : Date,
  },
  about: {
    type : String,
  },
  date :{
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('users',UserSchema);

module.exports.hashPassword = async (password) => {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      return hash;     
    });
});
}