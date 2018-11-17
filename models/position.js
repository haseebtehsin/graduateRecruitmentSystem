// const Sequelize = require("sequelize");

const Joi = require("joi");
const Sequelize = require("sequelize");
const db = require("../db").sequelize;

const Position = db.define("position", {
  title: {
    type: Sequelize.STRING,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  description: {
    type: Sequelize.STRING,
    required: true,
    minlength: 30,
    maxlength: 3000
  },
  level: {
    type: Sequelize.STRING,
    required: true,
    minlength: 3,
    maxlength: 10
  },
  Specialization: {
    type: Sequelize.STRING,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: "users", // <<< Note, its table's name, not object name
      key: "id" // <<< Note, its a column name,
    }
  },
  number_of_positions: {
    type: Sequelize.INTEGER,
    required: true
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

function validatePosition(position) {
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

  return Joi.validate(position, validate);
}

exports.position = Position;
exports.validatePosition = validatePosition;

// User.create({
//   firstName: "John",
//   lastName: "Hancock"
// });
