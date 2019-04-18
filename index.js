require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const https = require("https");
const http = require("http");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const router = require("./routes/router.js");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const User = require("./models/user");
const sslkey = fs.readFileSync("ssl-key.pem");
const sslcert = fs.readFileSync("ssl-cert.pem");
const LocalStrategy = require("passport-local").Strategy;

const options = {
  key: sslkey,
  cert: sslcert
};
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cookieParser());
app.use(
  session({
    secret: "secret is secret",
    saveUninitialized: true,
    resave: true
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new LocalStrategy(function(username, password, done) {
    User.getUserByUsername(username, function(err, user) {
      if (err) throw err;
      if (!user) {
        return done(null, false, { message: "Unknown User" });
      }
      User.comparePassword(password, user.password, function(err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Invalid password" });
        }
      });
    });
  })
);
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/small"));
app.use(express.static("uploads"));
app.set("views", path.join(__dirname, "/views/"));

mongoose
  .connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${
      process.env.DB_HOST
    }:${process.env.DB_PORT}/plugger?authSource=admin`,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connection established to db");
  })
  .then(() => appListen())
  .catch(e => {
    console.log("Connection to db failed because:", e);
  });
app.use("/", router);

function appListen() {
  https.createServer(options, app).listen(3000);
  http
    .createServer((req, res) => {
      res.writeHead(301, { Location: "https://localhost:3000" + req.url });
      res.end();
    })
    .listen(8001);
}
