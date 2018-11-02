var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
const Sequelize = require("sequelize");

var server = express();

var projects = [];

//middlewares
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));
server.get("/", function(req, res) {
  if (Object.keys(req.query).length !== 0) {
    projects.push(req.query);
  }
  res.render("index", {
    projects: projects
  });
});

server.get("/clear", function(req, res) {
  projects = [];
  res.redirect("/");
});

server.listen(process.env.PORT || 8080, function() {
  console.log("server has started");
});

const sequelize = new Sequelize(
  "postgres://gradrec:123456@localhost:5432/gradrec"
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });
