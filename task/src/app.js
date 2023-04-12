const express = require("express");
const hbs = require("hbs");
const jwt = require("jsonwebtoken");
const cookiepasrl = require("cookie-parser");
const bcript = require("bcrypt");
require("../db/mongo");
const user = require("../models/model");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(cookiepasrl());

app.set("view engine", "hbs");
app.get("/", (req, res) => {
  res.render("home.hbs");
});
app.get("/signup", (req, res) => {
  res.render("signup.hbs");
});
app.get("/login", (req, res) => {
  res.render("login.hbs");
});

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const veri = await jwt.verify(token, "hiteshnaghera");
    const data = await user.findOne({ _id: veri._id });
    console.log(data);
    next();
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

app.get("/secret", auth, async (req, res) => {
  res.render("secret.hbs");
});
app.post("/signup", async (req, res) => {
  try {
    const data = new user({
      name: req.body.name,
      lname: req.body.lname,
      email: req.body.email,
      password: req.body.password,
    });
    await data.save();
    const token = await jwt.sign({ _id: data.id }, "hiteshnaghera", {
      expiresIn: "100s",
    });
    res.render("home.hbs");
    console.log(data);
    console.log(token);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
app.post("/login", async (req, res) => {
  try {
    const data = await user.findOne({ email: req.body.email });
    const ismatch = await bcript.compare(req.body.password, data.password);
    if (ismatch) {
      res.render("home.hbs");
      const token = await jwt.sign({ _id: data.id }, "hiteshnaghera", {
        expiresIn: "100s",
      });
      res.cookie("jwt", token);
      console.log(data);
      console.log(token);
    } else {
      console.log("password don match");
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.listen(3000, () => {
  console.log("ok");
});
