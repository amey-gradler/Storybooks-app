const express = require("express");
const Story = require("../models/Story");
const router = express.Router();

const { ensureAuth, ensureGuest } = require("../middleware/auth");
//@desc login/landing page
// @rooute GET /
router.get("/", ensureGuest, (req, res) => {
  res.render("login", {
    layout: "login",
  });
});

//@desc dashboard page
// @rooute GET /dashboard
router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean();
    res.render("dashboard", {
      name: req.user.firstName,
      stories,
    });
  } catch (error) {
    console.error(error);
    res.render("error/500");
  }
});

module.exports = router;
