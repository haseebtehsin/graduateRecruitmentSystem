const Sequelize = require("sequelize");

// const sequelize = new Sequelize(
//   `postgres://gradrec:123456@localhost:5432/gradrec`
// );

const sequelize = new Sequelize(
  `postgres://haseeb:haseeb123@harishaseebdb.crxtlfcpvwcw.us-east-2.rds.amazonaws.com:5432/gradrec`
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = {
  sequelize
};
