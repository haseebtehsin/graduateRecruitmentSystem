const Sequelize = require("sequelize");

// function connect(username, password, port, db) {
//   const sequelize = new Sequelize(
//     `postgres://${username}:${password}@localhost:${port}/${db}`
//   );

function connect() {
  const sequelize = new Sequelize(
    `postgres://gradrec:123456@localhost:5432/gradrec`
  );

  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
    });

  return sequelize;
}

module.exports = {
  connect
};
// postgres://gradrec:123456@localhost:5432/gradrec
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch(err => {
//     console.error("Unable to connect to the database:", err);
//   });
