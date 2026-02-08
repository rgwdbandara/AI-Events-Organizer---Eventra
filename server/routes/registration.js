const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");
const Event = require("../models/Event");
const auth = require("../middlewares/auth");

/* =========================
   REGISTER FOR EVENT
========================= */
router.post("/:eventId", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.organizer.toString() === req.user.id) {
      return res
        .status(400)
        .json({ message: "Organizer cannot register for own event" });
    }

    const booked = await Registration.countDocuments({
      event: event._id,
    });

    if (event.capacity && booked >= event.capacity) {
      return res.status(400).json({ message: "All seats are booked" });
    }

    const registration = await Registration.create({
      user: req.user.id,
      event: event._id,
    });

    res.status(201).json(registration);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "You already registered for this event" });
    }
    res.status(500).json({ message: error.message });
  }
});

/* =========================
   GET MY TICKETS
========================= */
router.get("/my", auth, async (req, res) => {
  try {
    const tickets = await Registration.find({ user: req.user.id })
      .populate("event")
      .sort({ createdAt: -1 });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =========================
   GET REGISTRATIONS BY EVENT (ORGANIZER)
========================= */
router.get("/event/:eventId", auth, async (req, res) => {
  try {
    const registrations = await Registration.find({
      event: req.params.eventId,
    })
      .populate("user", "name email")
      .populate("event");

    if (registrations.length === 0) {
      return res.json([]);
    }

    // Organizer-only access
    if (
      registrations[0].event.organizer.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =========================
   CANCEL TICKET
========================= */
router.delete("/:ticketId", auth, async (req, res) => {
  try {
    const ticket = await Registration.findById(req.params.ticketId);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    if (ticket.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await ticket.deleteOne();
    res.json({ message: "Ticket cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =========================
   VERIFY TICKET (CHECK-IN)
========================= */
router.post("/verify/:ticketId", auth, async (req, res) => {
  try {
    const ticket = await Registration.findById(req.params.ticketId)
      .populate("event");

    if (!ticket) {
      return res.status(404).json({ message: "Invalid ticket" });
    }

    // organizer only
    if (ticket.event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // 🚫 already used
    if (ticket.checkedIn) {
      return res.status(400).json({ message: "Ticket already checked in" });
    }

    // ⏰ EXPIRY CHECK
    const eventDateTime = new Date(
      `${ticket.event.date}T${ticket.event.time}`
    );

    if (new Date() > eventDateTime) {
      return res.status(400).json({
        message: "Ticket expired (event already ended)",
      });
    }

    ticket.checkedIn = true;
    await ticket.save();

    res.json({ message: "Check-in successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;