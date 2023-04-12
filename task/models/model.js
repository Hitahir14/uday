const mongoose = require("mongoose");
const bcript = require("bcrypt");
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

schema.pre("save", async function (next) {
  try {
    this.password = await bcript.hash(this.password, 10);
  } catch (error) {
    console.log(error);
  }
});
module.exports = mongoose.model("hit", schema);
