const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/hit")
  .then(() => {
    console.log("run");
  })
  .catch((er) => {
    console.log(er);
  });
