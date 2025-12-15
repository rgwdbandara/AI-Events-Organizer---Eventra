const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const User = require("../models/User");

/* ======================
   USER ONBOARDING
====================== */
router.post("/onboarding", auth, async (req, res) => {
  try {
    const { city, interests } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        city,
        interests,
        onboarded: true,
      },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

