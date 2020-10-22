const express = require("express");
const passport = require("passport");
const router = express.Router();

//@desc Authenticate with google
// @rooute GET /
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

//@descGoogle auth callback
// @rooute GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

// @desc logout user
// @route GET /auth/logout\
router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

module.exports = router;
