const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const session = require("express-session");
router.use(cookieParser());
router.use(
  //setting up session middleware
  session({
    secret: "keyboard_cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

module.exports = router;
