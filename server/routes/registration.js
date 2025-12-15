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
   GET REGISTRATION COUNT
========================= */
router.get("/count/:eventId", async (req, res) => {
  try {
    const count = await Registration.countDocuments({
      event: req.params.eventId,
    });

    res.json({ count });
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

    // Organizer cannot register
    if (event.organizer.toString() === req.user.id) {
      return res.status(400).json({
        message: "Organizer cannot register for own event",
      });
    }

    // 🔢 COUNT CURRENT SEATS
    const bookedSeats = await Registration.countDocuments({
      event: event._id,
    });

    // 🚫 FULL
    if (bookedSeats >= event.capacity) {
      return res.status(400).json({
        message: "All seats are booked",
      });
    }

    const registration = new Registration({
      user: req.user.id,
      event: event._id,
    });

    await registration.save();

    res.status(201).json({
      message: "Seat booked successfully",
      seatsLeft: event.capacity - (bookedSeats + 1),
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "You already booked a seat",
      });
    }
    res.status(500).json({ message: error.message });
  }
});
/* =========================
   CANCEL TICKET (AUTH)
========================= */
router.delete("/:ticketId", auth, async (req, res) => {
  try {
    const ticket = await Registration.findById(req.params.ticketId);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Only ticket owner can cancel
    if (ticket.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await ticket.deleteOne();

    res.json({ message: "Ticket cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




module.exports = router;
