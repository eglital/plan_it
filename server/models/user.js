const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  email: [],
  name: {
    type: String
  },
  facebookToken: {
    type: String
  },
  itineraries: []
});

const User = mongoose.model("User", UserSchema);

module.exports = User;