const Profile = require("../models/user").profile;
const auth = require("../middleware/auth");
const validate = require("../models/user").validate;
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

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
// router.use(
//   session({ secret: "atest", resave: false, saveUninitialized: true })
// );

const urlenCodedParser = bodyParser.urlencoded({ extended: false });

router.get("/", urlenCodedParser, async (req, res) => {
  // profile = await Profile.findOne({ where: { id: req.session.id } });
  // if (!profile) res.render("../views/profile");
  console.log(req.session.user_id); //accessing session data but it gives undefined

  res.render("../views/signup-success", { data: req.body });
});

module.exports = router;
