const router = require("../router");
router.get("/forgotPassword", function(req, res) {
  res.render("forgotPassword");
});

router.get("/maintenance", function(req, res) {
  res.render("maintenance");
});

module.exports = router;
