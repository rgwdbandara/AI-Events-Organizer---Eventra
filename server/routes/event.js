const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload"); // added
const Registration = require("../models/Registration");


/* =========================
   CREATE EVENT (AUTH)
========================= */
router.post(
  "/create",
  auth,
  upload.single("image"),
  async (req, res) => {
    try {
      const event = new Event({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        category: req.body.category,
        capacity: req.body.capacity,
        imageUrl: req.file ? req.file.path : "",
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
  }
);

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
   GET MY EVENTS (AUTH)
========================= */
router.get("/my-events", auth, async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user.id })
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
router.put(
  "/:id",
  auth,
  upload.single("image"),
  async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);

      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      // owner check
      if (event.organizer.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not authorized" });
      }

      // update fields
      event.title = req.body.title;
      event.description = req.body.description;
      event.date = req.body.date;
      event.time = req.body.time;
      event.location = req.body.location;
      event.category = req.body.category;
      event.capacity = req.body.capacity;

      // 🔥 IMPORTANT: image replace only if new image uploaded
      if (req.file) {
        event.imageUrl = req.file.path;
      }

      await event.save();

      res.json({
        message: "Event updated successfully",
        event,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

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

/* =========================
   VERIFY TICKET (QR SCAN)
========================= */
router.get("/verify/:ticketId", auth, async (req, res) => {
  try {
    const ticket = await Registration.findById(req.params.ticketId)
      .populate("event user");

    if (!ticket) {
      return res.status(404).json({ message: "Invalid ticket" });
    }

    res.json({
      valid: true,
      ticket,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;