const Profile = require("../models/user").profile;
const auth = require("../middleware/auth");
const User = require("../models/user").user;
const validate = require("../models/user").validate;
const Position = require("../models/position").position;
const Message = require("../models/position").message;
const Application = require("../models/position").application;
const bcrypt = require("bcryptjs");
const router = require("../router");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
// router.use(
//   session({ secret: "atest", resave: false, saveUninitialized: true })
// );

const urlenCodedParser = bodyParser.urlencoded({ extended: false });

router.get("/", urlenCodedParser, async (req, res) => {
  if (req.session.user_type !== "S")
    res.send("Un-Authorized - Please go to admin's dashboard");
  else {
    profile = await Profile.findOne({ where: { id: req.session.user_id } });
    if (!profile) res.render("profile");
    // console.log(req.session.user_id); //accessing session data but it gives undefined
    else {
      if (profile.ms_degree === null) {
        const position = await Position.findAll({
          where: {
            Specialization: profile.bs_specialization,
            level: {
              [Op.ne]: "PHD"
            }
          },
          order: [["id", "ASC"], ["createdAt", "ASC"]]
        }).error(function(err) {
          console.log("Error:" + err);
        });

        res.render("dashboard", { position: position });
      } else {
        const position = await Position.findAll({
          where: {
            Specialization: profile.ms_specialization
          },
          order: [["id", "ASC"], ["createdAt", "ASC"]]
        }).error(function(err) {
          console.log("Error:" + err);
        });

        res.render("dashboard", { position: position });
      }
    }
  }
});

router.get("/positions/:id", async (req, res) => {
  if (req.session.user_type !== "S") res.send("Un-Authorized Access");
  else {
    const position = await Position.findOne({
      where: {
        id: req.params.id
      }
    }).error(function(err) {
      console.log("Error:" + err);
    });

    const message = await Message.findAll({
      where: {
        position_id: req.params.id,
        [Op.or]: [
          { sender_id: req.session.user_id },
          { receiver_id: req.session.user_id }
        ]
      },
      order: [["id", "ASC"], ["createdAt", "ASC"]]
    }).error(function(err) {
      console.log("Error:" + err);
    });

    res.render("position", { position: position, message: message });
  }
});

router.get("/messages/:p_id/:r_id", async (req, res) => {
  if (req.session.user_type !== "S") res.send("Un-Authorized Access");
  else {
    // console.log(req.body.messagetxt);
    await Message.create({
      sender_id: req.session.user_id,
      position_id: req.params.p_id,
      message_txt: req.query.messagetxt,
      receiver_id: req.params.r_id,
      admin_read: "N",
      student_read: "Y"
    });
    // res.writeHead(200, {
    //   "Content-Type": mimeType,
    //   "Content-Length": contents.length,
    //   "Accept-Ranges": "bytes",
    //   "Cache-Control": "no-cache"
    // });
    res.redirect(`/api/dashboard/positions/${req.params.p_id}`);
  }
});

router.get("/apply/:p_id", async (req, res) => {
  if (req.session.user_type !== "S") res.send("Un-Authorized Access");
  else {
    const position = await Position.findOne({
      where: {
        id: req.params.p_id
      }
    }).error(function(err) {
      console.log("Error:" + err);
    });

    res.render("apply", { position: position });
  }
});

router.post("/apply", urlenCodedParser, async (req, res) => {
  if (req.session.user_type !== "S") res.send("Un-Authorized Access");
  else {
    const position = await Position.findOne({
      where: {
        id: req.body.positionid
      }
    }).error(function(err) {
      console.log("Error:" + err);
    });

    const application = await Application.findOne({
      where: {
        applicant_id: req.session.user_id,
        position_id: req.body.positionid
      }
    }).error(function(err) {
      console.log("Error:" + err);
    });
    if (application)
      res.send("Cannot re-apply, you have already applied for this position");
    else {
      await Application.create({
        applicant_id: req.session.user_id,
        position_id: req.body.positionid,
        cover_letter: req.body.description,
        admin_id: position.userId
      });
    }
    res.send("Successfully Applied");
  }
});

module.exports = router;
