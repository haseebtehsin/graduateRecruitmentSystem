const Profile = require("../models/user").profile;
const auth = require("../middleware/auth");
const validate = require("../models/user").validate;
const bcrypt = require("bcryptjs");
const router = require("../router");
const bodyParser = require("body-parser");

// router.use(
//   session({ secret: "atest", resave: false, saveUninitialized: true })
// );

const urlenCodedParser = bodyParser.urlencoded({ extended: false });

router.get("/", urlenCodedParser, async (req, res) => {
  profile = await Profile.findOne({ where: { id: req.session.user_id } });
  if (!profile) res.render("../views/profile");
  // console.log(req.session.user_id); //accessing session data but it gives undefined
  else res.render("../views/dashboard");
});

module.exports = router;
