// const Sequelize = require("sequelize");

const Joi = require("joi");
const Sequelize = require("sequelize");
const db = require("../db").sequelize;
// const jwt = require("jsonwebtoken");
// const config = require("config");
// const db = new Sequelize("postgres://gradrec:123456@localhost:5432/gradrec");

const profile = db.define("profile", {
  fname: {
    type: Sequelize.STRING,
    minlength: 3,
    maxlength: 255
  },
  lname: {
    type: Sequelize.STRING,
    minlength: 3,
    maxlength: 255
  },
  gender: {
    type: Sequelize.STRING,
    minlength: 1,
    maxlength: 1
  },
  dob: {
    type: Sequelize.DATE
  },
  ms_institute: {
    type: Sequelize.STRING,
    minlength: 3,
    maxlength: 255
  },
  ms_degree: {
    type: Sequelize.STRING,
    minlength: 3,
    maxlength: 255
  },
  ms_specialization: {
    type: Sequelize.STRING,
    minlength: 3,
    maxlength: 255
  },
  ms_startdate: {
    type: Sequelize.DATE
  },
  ms_enddate: {
    type: Sequelize.DATE
  },
  ms_gpaobtainted: {
    type: Sequelize.FLOAT
  },
  ms_gpatotal: {
    type: Sequelize.FLOAT
  },

  bs_institute: {
    type: Sequelize.STRING,
    minlength: 3,
    maxlength: 255
  },
  bs_degree: {
    type: Sequelize.STRING,
    minlength: 3,
    maxlength: 255
  },
  bs_specialization: {
    type: Sequelize.STRING,
    minlength: 3,
    maxlength: 255
  },
  bs_startdate: {
    type: Sequelize.DATE
  },
  bs_enddate: {
    type: Sequelize.DATE
  },
  bs_gpaobtainted: {
    type: Sequelize.FLOAT
  },
  bs_gpatotal: {
    type: Sequelize.FLOAT
  },
  clginstitute: {
    type: Sequelize.STRING,
    minlength: 3,
    maxlength: 255
  },
  clg_degree: {
    type: Sequelize.STRING,
    minlength: 3,
    maxlength: 255
  },
  clg_specialization: {
    type: Sequelize.STRING,
    minlength: 3,
    maxlength: 255
  },
  clg_startdate: {
    type: Sequelize.DATE
  },
  clg_enddate: {
    type: Sequelize.DATE
  },
  clg_gpaobtainted: {
    type: Sequelize.FLOAT
  },
  clg_gpatotal: {
    type: Sequelize.FLOAT
  }
});

// User.generteAuthToken = function() {
//   const token = jwt.sign(
//     {
//       _id: this.id,
//       _username: this.username
//     },
//     config.get("jwtPrivateKey")
//   );
//   return token;
// };

function validateUser(user) {
  const validate = {
    username: Joi.string()
      .min(3)
      .max(255)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    // userId: Joi.string(),
    usertype: Joi.string()
      .min(1)
      .max(1)
  };

  return Joi.validate(user, validate);
}

exports.user = profile;
// exports.db = db;
exports.validate = validateUser;

// User.create({
//   firstName: "John",
//   lastName: "Hancock"
// });
