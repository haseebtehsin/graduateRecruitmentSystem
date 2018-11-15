const Profile = require("../models/user").profile;
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
// router.use(
//   session({ secret: "atest", resave: false, saveUninitialized: true })
// );
const urlenCodedParser = bodyParser.urlencoded({ extended: false });

router.post("/", urlenCodedParser, async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  //I need to use user.id and user.username here
  // let profile = await Profile.findOne({
  //   where: { id: req.session.cookie() }
  // });
  // if (profile) return res.status(400).send("Profile Already Exists.");

  // //   user = await Use.findOne({ where: { userId: req.body.userId } });
  // //   if (user) return res.status(400).send("UserId already exists.");

  // user = await Use.findOne({ where: { username: req.body.username } });
  // if (user) return res.status(400).send("Username already exists.");

  // const salt = await bcrypt.genSalt(5);
  // const hashed = await bcrypt.hash(req.body.password, salt);
  console.log(req.session.user.user_id);
  // Profile.create({
  //   id: req.session.user.user_id,
  //   userId: req.session.user.user_id,
  //   fname: req.body.fname,
  //   lname: req.body.lname,
  //   gender: req.body.gender,
  //   dob: req.body.dob,
  //   ms_institute: req.body.msinstitute,
  //   ms_degree: req.body.msdegree,
  //   ms_specialization: req.body.msspecialization,
  //   ms_startdate: req.body.msstart_date,
  //   ms_enddate: req.body.msend_date,
  //   ms_gpaobtainted: req.body.msgpa_o,
  //   ms_gpatotal: req.body.msgpa_t,

  //   bs_institute: req.body.bsinstitute,
  //   bs_degree: req.body.bsdegree,
  //   bs_specialization: req.body.bsspecialization,
  //   bs_startdate: req.body.bsstart_date,
  //   bs_enddate: req.body.bsend_date,
  //   bs_gpaobtainted: req.body.bsgpa_o,
  //   bs_gpatotal: req.body.bsgpa_t,

  //   hs_institute: req.body.hsinstitute,
  //   hs_degree: req.body.hsdegree,
  //   hs_specialization: req.body.hsspecialization,
  //   hs_startdate: req.body.hsstart_date,
  //   hs_enddate: req.body.hsend_date,
  //   hs_gpaobtainted: req.body.hsgpa_o,
  //   hs_gpatotal: req.body.hsgpa_t
  // });
  res.render("../views/signup-success", { data: req.body });
  //   .then(use => res.send(`user registered`));
  //   console.log(req.body);
  //   res.send("user registered");
});

// router.get("/:id",, async (req, res) => {
//   const user = Use.findById(req.user.id);
//   res.send(user.username);
// });

module.exports = router;
