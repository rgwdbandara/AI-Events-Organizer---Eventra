const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

/*
  MOCK AI EVENT GENERATOR
  (Stable, demo-ready, interview safe)
*/

router.post("/generate-event", auth, async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    // 🧠 SIMPLE AI-LIKE LOGIC
    const lower = prompt.toLowerCase();

    let category = "Workshop";
    if (lower.includes("tech")) category = "Technology";
    if (lower.includes("business")) category = "Business";
    if (lower.includes("dance")) category = "Workshop";
    if (lower.includes("education")) category = "Education";

    const aiEvent = {
      title: prompt.slice(0, 50),
      description: `This event is about ${prompt}. It is designed to give participants a valuable and engaging experience.`,
      category,
      capacity: 50,
    };

    res.json(aiEvent);
  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({ message: "AI generation failed" });
  }
});

module.exports = router;
