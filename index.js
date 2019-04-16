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

const sslkey = fs.readFileSync("ssl-key.pem");
const sslcert = fs.readFileSync("ssl-cert.pem");

const options = {
  key: sslkey,
  cert: sslcert
};

const cookieSession = require("cookie-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  let user = users.find(user => {
    return user.id === id;
  });

  done(null, user);
});
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },

    (username, password, done) => {
      let user = users.find(user => {
        return user.email === username && user.password === password;
      });

      if (user) {
        done(null, user);
      } else {
        done(null, false, { message: "Incorrect username or password" });
      }
    }
  )
);

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(
  cookieSession({
    name: "mysession",
    keys: ["randomkey"],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
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
