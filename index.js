require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const router = require("./routes/router");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const User = require("./models/user");
const LocalStrategy = require("passport-local").Strategy;
const helmet = require('helmet');
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new LocalStrategy(function (username, password, done) {
    User.getUserByUsername(username, function (err, user) {
      console.log(username)
      if (err) throw err;
      if (!user) {
        return done(null, false, { message: "Unknown User" });
      }
      User.comparePassword(password, user.password, function (err, isMatch) {
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

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", 'https://users.metropolia.fi');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, PUT');
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }
}); 
const corsOptions = {
  origin: 'https://users.metropolia.fi'
}
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/small"));
app.use(express.static("uploads"));
app.set("views", path.join(__dirname, "/views/"));

mongoose
  .connect(process.env.MONGODB_URI || `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/plugger?authSource=admin`,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connection established to db");
    app.listen(process.env.PORT || 3000, () => {
      console.log('Connected');
    })
  })
  .catch (e => {
  console.log("Connection to db failed because:", e);
});

app.use("/", router);
