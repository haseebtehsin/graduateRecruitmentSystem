const Use = require("../models/user").user;
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = require("../router");
const urlenCodedParser = bodyParser.urlencoded({ extended: false });

router.post("/", urlenCodedParser, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await Use.findOne({ where: { username: req.body.username } });
  if (!user) return res.status(400).send("Invalid email or password");

  if (user.usertype !== "S")
    res.send(
      "Un-Authorized Access, You are trying to login using an admin's login details"
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
    res.render("../views/login-success", { data: req.body, user_type: "S" });
  }
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
