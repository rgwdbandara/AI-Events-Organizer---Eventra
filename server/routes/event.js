const express = require("express");
const Event = require("../models/Event");
const auth = require("../middlewares/auth");

const router = express.Router();

// CREATE EVENT
router.post("/create", auth, async (req, res) => {
  try {
    const event = await Event.create({
      ...req.body,
      organizer: req.user.id
    });

    res.json({ message: "Event created successfully", event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET ALL EVENTS
router.get("/", async (req, res) => {
  const events = await Event.find().populate("organizer", "name email");
  res.json(events);
});

// GET SINGLE EVENT
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("organizer", "name email");
    res.json(event);
  } catch (error) {
    res.status(404).json({ message: "Event not found" });
  }
});

// UPDATE EVENT
router.put("/:id", auth, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Event updated", event });
  } catch (error) {
    res.status(404).json({ message: "Event not found" });
  }
});

// DELETE EVENT
router.delete("/:id", auth, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(404).json({ message: "Event not found" });
  }
});

module.exports = router;
