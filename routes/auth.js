const Use = require("../models/user").user;
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const config = require("config");
const urlenCodedParser = bodyParser.urlencoded({ extended: false });
const cookieParser = require("cookie-parser");
const session = require("express-session");
router.use(cookieParser());
router.use(
  //setting up session middleware
  session({
    secret: "keyboard_cat",
    resave: false,
    saveUninitialized: true,
    cooke: { secure: false }
  })
);

router.post("/", urlenCodedParser, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await Use.findOne({ where: { username: req.body.username } });
  if (!user) return res.status(400).send("Invalid email or password");

  const valid = bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.status(400).send("Invalid email or password");

  const token = jwt.sign(
    {
      _id: user.id,
      _username: user.username
    },
    config.get("jwtPrivateKey")
  );
  //I need to store user.id and user.username here
  //   const token = user.generateAuthToken();
  //   localStorage.setItem("currentUser", token);
  // res.header("x-auth-token", token)
  req.session.user_id = user.id; //Saving data in session
  req.session.save();
  res.render("../views/login-success");

  //   .then(use => res.send(`user registered`));
  //   console.log(req.body);
  //   res.send("user registered");
});

function validate(user) {
  const validate = {
    username: Joi.string()
      .min(3)
      .max(255)
      .required(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  return Joi.validate(user, validate);
}

module.exports = router;
