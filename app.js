const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const users = require("./routes/users");
const admin = require("./routes/admin_user");
const auth = require("./routes/auth");
const dashboard = require("./routes/dashboard");
const profile = require("./routes/profiles");
const root = require("./routes/root");
const app = express();
const db = require("./db").sequelize;
const config = require("config");
const cookieParser = require("cookie-parser");
const session = require("express-session");

// const migrate=require('./models/tables');
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(cookieParser());
app.use(
  //setting up session middleware
  session({
    secret: "keyboard_cat",
    resave: false,
    saveUninitialized: true,
    cooke: { secure: false }
  })
);

app.use("/api/profile", profile);
app.use("/api/users", users);
app.use("/api/admin", admin);
app.use("/api/auth", auth);
// app.use(session({ secret: "atest", resave: false, saveUninitialized: true }));
app.use("/api/dashboard", dashboard);
// app.use("/", root);
app.get("/", function(req, res) {
  if (req.session.user_id) {
    if (req.session.user_type === "S") res.redirect("/api/dashboard");
    else res.redirect("/api/admin/dashboard");
  } else res.render("home");
});

app.get("/logout", function(req, res) {
  req.session.user_id = "";
  if (req.session.user_type == "A") res.render("admin_home");
  else res.render("home");
});

app.get("/admin", function(req, res) {
  res.render("admin_home");
});

// app.get("/api/dashboard", function(req, res) {
//   res.render("dashboard");
// });

app.listen(process.env.PORT || 8080, function() {
  console.log("Server has started");
  db.sync().then(() => console.log("Database Connected"));
});

// let a = db.sequelize.query(
//   "select date_part('year', CURRENT_DATE)||lpad((nextval('test_seq'))::TEXT,5,'0')::TEXT"
// );

// console.log(a);

// model.createTables(db.sequelize);
