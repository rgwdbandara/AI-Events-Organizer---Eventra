const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const auth = require("../middlewares/auth");

/* =========================
   CREATE EVENT (AUTH)
========================= */
router.post("/create", auth, async (req, res) => {
  try {
    const event = new Event({
      ...req.body,
      organizer: req.user.id,
    });

    await event.save();

    res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =========================
   GET ALL EVENTS + SEARCH + FILTER (PUBLIC)
   /api/events?search=tech&category=IT
========================= */
router.get("/", async (req, res) => {
  try {
    const { search, category } = req.query;

    let query = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (category && category !== "All") {
      query.category = category;
    }

    const events = await Event.find(query)
      .populate("organizer", "name email")
      .sort({ createdAt: -1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =========================
   GET SINGLE EVENT (PUBLIC)
========================= */
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("organizer", "name email");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =========================
   UPDATE EVENT (OWNER ONLY)
========================= */
router.put("/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =========================
   DELETE EVENT (OWNER ONLY)
========================= */
router.delete("/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await event.deleteOne();

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;