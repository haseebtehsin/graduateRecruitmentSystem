const Use = require("../models/user").user;
const Profile = require("../models/user").profile;
const auth = require("../middleware/auth");
const validate = require("../models/user").validate;
const Position = require("../models/position").position;
const Message = require("../models/position").message;
const Application = require("../models/position").application;

const db = require("../db").sequelize;
const bcrypt = require("bcryptjs");
const router = require("../router");
const bodyParser = require("body-parser");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const urlenCodedParser = bodyParser.urlencoded({ extended: false });

router.post("/signup", urlenCodedParser, async (req, res) => {
  if (!req.session.user_id) {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await Use.findOne({ where: { email: req.body.email } });
    if (user) return res.status(400).send("Email Already Exists.");

    //   user = await Use.findOne({ where: { userId: req.body.userId } });
    //   if (user) return res.status(400).send("UserId already exists.");

    user = await Use.findOne({ where: { username: req.body.username } });
    if (user) return res.status(400).send("Username already exists.");

    const salt = await bcrypt.genSalt(5);
    const hashed = await bcrypt.hash(req.body.password, salt);

    Use.create({
      username: req.body.username,
      email: req.body.email,
      password: hashed,
      usertype: "A"
    });
    res.render("../views/signup-success", { data: req.body, user_type: "A" });
  } else res.redirect("/api/admin/dashboard");
});

router.post("/login", urlenCodedParser, async (req, res) => {
  const { error } = validatelogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await Use.findOne({ where: { username: req.body.username } });
  if (!user) return res.status(400).send("Invalid email or password");

  if (user.usertype !== "A")
    res.send(
      "Un-Authorized Access, You are trying to login using a candidate's login details"
    );
  else {
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
    req.session.username = user.username; //Saving data in session
    req.session.user_type = user.usertype;
    req.session.save();
    console.log(req.session.user_type);
    res.render("../views/login-success", { data: req.body, user_type: "A" });
  }
  //   .then(use => res.send(`user registered`));
  //   console.log(req.body);
  //   res.send("user registered");
});

function validatelogin(user) {
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

router.post("/position", urlenCodedParser, async (req, res) => {
  if (req.session.user_type !== "A") res.send("Un-Authorized Access");
  // console.log("Unauthorized Access");
  // const { error } = validatelogin(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  // let user = await Use.findOne({ where: { username: req.body.username } });
  // if (!user) return res.status(400).send("Invalid email or password");
  // const valid = bcrypt.compare(req.body.password, user.password);
  // if (!valid) return res.status(400).send("Invalid email or password");
  // req.session.user_id = user.id; //Saving data in session
  // req.session.username = user.username; //Saving data in session
  // req.session.save();
  // res.render("../views/login-success", { data: req.body, user_type: "A" });
  else {
    await Position.create({
      userId: req.session.user_id,
      title: req.body.title,
      description: req.body.description,
      level: req.body.level,
      Specialization: req.body.specialization,
      number_of_positions: req.body.nop
    });

    res.redirect("/api/admin/dashboard");
  }
});

router.get("/message/:id", urlenCodedParser, async (req, res) => {
  if (req.session.user_type !== "A") res.send("Un-Authorized Access");
  else {
    const senders = await Message.aggregate("sender_id", "DISTINCT", {
      plain: false,
      where: {
        receiver_id: req.session.user_id
      }
    }).error(function(err) {
      console.log("Error:" + err);
    });

    console.log(senders);
    // res.send(senders);

    if (!senders) res.send("No Messages");
    else {
      const position = await Position.findOne({
        where: {
          userId: req.session.user_id,
          id: req.params.id
        }
      }).error(function(err) {
        console.log("Error:" + err);
      });
      console.log(position.id);
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

      res.render("admin_messages", {
        sender: senders,
        message: message,
        position: position
      });
    }
  }
});

router.get("/message/:p_id/:r_id", urlenCodedParser, async (req, res) => {
  if (req.session.user_type !== "A") res.send("Un-Authorized Access");
  else {
    await Message.create({
      sender_id: req.session.user_id,
      position_id: req.params.p_id,
      message_txt: req.query.messagetxt,
      receiver_id: req.params.r_id,
      admin_read: "Y",
      student_read: "N"
    });
    res.redirect(`/api/admin/message/${req.params.p_id}`);
  }
});

router.get("/position/:id", urlenCodedParser, async (req, res) => {
  if (req.session.user_type !== "A") res.send("Un-Authorized Access");
  else {
    const position = await Position.findOne({
      where: {
        userId: req.session.user_id,
        id: req.params.id
      }
    }).error(function(err) {
      console.log("Error:" + err);
    });
    res.render("admin_position", { position: position });
  }
});

router.get("/dashboard", async function(req, res) {
  if (req.session.user_type !== "A")
    res.send("Un-Authorized - Please go to student's dashboard");
  else {
    const position = await Position.findAll({
      where: {
        userId: req.session.user_id
      },
      order: [["id", "ASC"], ["createdAt", "ASC"]]
    }).error(function(err) {
      console.log("Error:" + err);
    });
    res.render("admin_dashboard", { position: position });
  }
});

router.get("/applications/:p_id", urlenCodedParser, async (req, res) => {
  if (req.session.user_type !== "A") res.send("Un-Authorized Access");
  else {
    const application = await Application.findAll({
      where: {
        position_id: req.params.p_id,
        admin_id: req.session.user_id
      }
    }).error(function(err) {
      console.log("Error:" + err);
    });
    const user_ids = application.map(a => a.applicant_id);
    console.log(user_ids);
    const user = await Use.findAll({
      where: {
        id: user_ids
      }
    });
    const profile = await Profile.findAll({
      where: {
        userId: user_ids
      }
    });
    console.log(user);
    if (!application) res.send("No Applications");
    else {
      res.render("admin_applications", {
        application: application,
        profile: profile,
        user: user
      });
    }
  }
});

router.get("/offer/:p_id/:u_id", urlenCodedParser, async (req, res) => {
  if (req.session.user_type !== "A") res.send("Un-Authorized Access");
  else {
    const application = await Application.update(
      { decision: "O" },
      {
        where: {
          position_id: req.params.p_id,
          admin_id: req.session.user_id,
          applicant_id: req.params.u_id
        }
      }
    )
      .error(function(err) {
        console.log("Error:" + err);
      })
      .then(count => {
        if (count) return count;
      });
    // const user_ids = application.map(a => a.applicant_id);
    // console.log(user_ids);
    // const user = await Use.findAll({
    //   where: {
    //     id: user_ids
    //   }
    // });
    // const profile = await Use.findAll({
    //   where: {
    //     userId: user_ids
    //   }
    // });
    // console.log(user);
    if (application) res.send("Offer sent");
    else {
      res.send("Error Occurred");
    }
  }
});

router.get("/create", function(req, res) {
  res.render("admin_create");
});

function validatelogin(user) {
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
