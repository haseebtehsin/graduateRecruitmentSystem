const Profile = require("../models/user").profile;
const router = require("../router");
const bodyParser = require("body-parser");
// router.use(
//   session({ secret: "atest", resave: false, saveUninitialized: true })
// );
const urlenCodedParser = bodyParser.urlencoded({ extended: false });

router.post("/add", urlenCodedParser, async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  //I need to use user.id and user.username here
  let profile = await Profile.findOne({
    where: { id: req.session.user_id }
  });
  if (profile) return res.status(400).send("Profile Already Exists.");
  // //   user = await Use.findOne({ where: { userId: req.body.userId } });
  // //   if (user) return res.status(400).send("UserId already exists.");
  // user = await Use.findOne({ where: { username: req.body.username } });
  // if (user) return res.status(400).send("Username already exists.");
  // const salt = await bcrypt.genSalt(5);
  // const hashed = await bcrypt.hash(req.body.password, salt);
  // console.log(req.session.user.user_id);
  else {
    if (req.body.MSLEVEL == "NA") {
      profile = await Profile.create({
        id: req.session.user_id,
        userId: req.session.user_id,
        fname: req.body.fname,
        lname: req.body.lname,
        gender: req.body.gender,
        dob: req.body.dob,

        ms_institute: "NA",
        ms_degree: "NA",
        ms_specialization: "NA",
        // ms_startdate: null,
        // ms_enddate: null,
        // ms_gpaobtainted: null,
        // ms_gpatotal: null,

        bs_institute: req.body.bsinstitute,
        bs_degree: req.body.bsdegree,
        bs_specialization: req.body.bsspecialization,
        bs_startdate: req.body.bsstart_date,
        bs_enddate: req.body.bsend_date,
        bs_gpaobtainted: req.body.bsgpa_o,
        bs_gpatotal: req.body.bsgpa_t,

        hs_institute: req.body.hsinstitute,
        hs_degree: req.body.hsdegree,
        hs_specialization: req.body.hsspecialization,
        hs_startdate: req.body.hsstart_date,
        hs_enddate: req.body.hsend_date,
        hs_gpaobtainted: req.body.hsgpa_o,
        hs_gpatotal: req.body.hsgpa_t
      }).catch(err => res.send("invalid details"));
      console.log("profile successfully setup");
    } else {
      profile = await Profile.create({
        id: req.session.user_id,
        userId: req.session.user_id,
        fname: req.body.fname,
        lname: req.body.lname,
        gender: req.body.gender,
        dob: req.body.dob,

        ms_institute: req.body.msinstitute,
        ms_degree: req.body.msdegree,
        ms_specialization: req.body.msspecialization,
        ms_startdate: req.body.msstart_date,
        ms_enddate: req.body.msend_date,
        ms_gpaobtainted: req.body.msgpa_o,
        ms_gpatotal: req.body.msgpa_t,

        bs_institute: req.body.bsinstitute,
        bs_degree: req.body.bsdegree,
        bs_specialization: req.body.bsspecialization,
        bs_startdate: req.body.bsstart_date,
        bs_enddate: req.body.bsend_date,
        bs_gpaobtainted: req.body.bsgpa_o,
        bs_gpatotal: req.body.bsgpa_t,

        hs_institute: req.body.hsinstitute,
        hs_degree: req.body.hsdegree,
        hs_specialization: req.body.hsspecialization,
        hs_startdate: req.body.hsstart_date,
        hs_enddate: req.body.hsend_date,
        hs_gpaobtainted: req.body.hsgpa_o,
        hs_gpatotal: req.body.hsgpa_t
      }).catch(err => res.send("invalid details"));
      console.log("profile successfully setup");
    }
    if (profile) res.redirect("/api/dashboard");
  }
  //   .then(use => res.send(`user registered`));
  //   console.log(req.body);
  //   res.send("user registered");
});

// function validate(profile) {
//             // let fname = document.forms["profileForm"]["fname"];
//             // let lname = document.forms["profileForm"]["name"];
//             // let gender = document.forms["profileForm"]["gender"];
//             // let dob = document.forms["profileForm"]["dob"];

//             // let msinstitute =  document.forms["profileForm"]["msinstitute"];
//             // let msdegree = document.forms["profileForm"]["msdegree"];
//             // let msspecialization = document.forms["profileForm"]["msspecialization"];
//             // let msstart_date = document.forms["profileForm"]["msstart_date"];
//             // let msend_date = document.forms["profileForm"]["msend_date"];
//             // let msgpa_o = document.forms["profileForm"]["msgpa_o"];
//             // let msgpa_t = document.forms["profileForm"]["msgpa_t"];

//             // let bsinstitute = document.forms["profileForm"]["bsinstitute"];
//             // let bsdegree = document.forms["profileForm"]["bsdegree"];
//             // let bsstart_date = document.forms["profileForm"]["bsstart_date"];
//             // let bsgpa_o = document.forms["profileForm"]["bsgpa_o"];
//             // let bsgpa_t = document.forms["profileForm"]["bsgpa_t"];
//             // let bsspecialization = document.forms["profileForm"]["bsspecialization"];
//             // let bsend_date = document.forms["profileForm"]["bsend_date"];

//             // let hsinstitute = document.forms["profileForm"]["hsinstitute"];
//             // let hsdegree = document.forms["profileForm"]["hsdegree"];
//             // let hsspecialization = document.forms["profileForm"]["hsspecialization"];
//             // let hsstart_date = document.forms["profileForm"]["hsstart_date"];
//             // let hsend_date = document.forms["profileForm"]["hsend_date"];
//             // let hsgpa_o = document.forms["profileForm"]["hsgpa_o"];
//             // let hsgpa_t = document.forms["profileForm"]["hsgpa_t"];

//             if (profile.fname == "")
//             {
//                 return false;
//             }
//             if (profile.lname == "")
//             {
//                 return false;
//             }
//             if (dob.value == "")
//             {
//                 window.alert("Please enter your date of birth.");
//                 dob.focus();
//                 return false;
//             }
//             if (msspecialization.value == "NA")
//             {
//              msdegree.disabled=true;
//              msspecialization.disabled=true;
//              msstart_date.disabled=true;
//              msend_date.disabled=true;
//              msgpa_o.disabled=true;
//              msgpa_t.disabled=true;
//             } else {
//                 if (msstart_date>msend_date)
//                     {
//                     window.alert("MS Start Date cannot be less than end date");
//                     msstart_date.focus();
//                     return false;
//                     }
//                 if (msgpa_o>msgpa_t)
//                     {

//                     window.alert("Marks/GPA Obtained cannot be greater than total Marks/GPA");
//                     msgpa_o.focus();
//                     return false;

//                     }
//             }

//             if (bsstart_date>bsend_date)
//                 {
//                 window.alert("MS Start Date cannot be less than end date");
//                 bsstart_date.focus();
//                 return false;
//                 }
//             if (bsgpa_o>bsgpa_t)
//                 {

//                 window.alert("Marks/GPA Obtained cannot be greater than total Marks/GPA");
//                 bsgpa_o.focus();
//                 return false;

//                 }

//             if (hsstart_date>hsend_date)
//                 {
//                 window.alert("MS Start Date cannot be less than end date");
//                 hsstart_date.focus();
//                 return false;
//                 }
//             if (hsgpa_o>hsgpa_t)
//                 {

//                 window.alert("Marks/GPA Obtained cannot be greater than total Marks/GPA");
//                 hsgpa_o.focus();
//                 return false;

//                 }

//             return true;
//         }</script>
// }

module.exports = router;
