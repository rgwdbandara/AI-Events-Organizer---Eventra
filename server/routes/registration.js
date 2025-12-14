const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");
const Event = require("../models/Event");
const auth = require("../middlewares/auth");


/* =========================
   GET MY TICKETS (AUTH)
========================= */
router.get("/my-tickets", auth, async (req, res) => {
  try {
    const tickets = await Registration.find({
      user: req.user.id,
    }).populate("event");

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


/* =========================
   REGISTER FOR EVENT (FREE)
========================= */
router.post("/:eventId", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Prevent organizer registering
    if (event.organizer.toString() === req.user.id) {
      return res
        .status(400)
        .json({ message: "Organizer cannot register for own event" });
    }

    const registration = new Registration({
      user: req.user.id,
      event: event._id,
    });

    await registration.save();

    res.status(201).json({ message: "Registered successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Already registered" });
    }
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;
