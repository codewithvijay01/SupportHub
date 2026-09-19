import express from "express";
import Ticket from "../models/Ticket.js";
import authMiddleware from "../authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    const ticket = await Ticket.create({
      title,
      description,
      priority,
      user: req.user.id,
    });

    res.status(201).json({
      message: "Ticket created successfully ✅",
      ticket,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tickets = await Ticket.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json({
      message: "Tickets fetched successfully ✅",
      tickets,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    res.json({
      message: "Ticket fetched successfully ✅",
      ticket,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, description, priority, status } = req.body;

    const ticket = await Ticket.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    if (title !== undefined) ticket.title = title;
    if (description !== undefined) ticket.description = description;
    if (priority !== undefined) ticket.priority = priority;
    if (status !== undefined) ticket.status = status;

    await ticket.save();

    res.json({
      message: "Ticket updated successfully ✅",
      ticket,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const ticket = await Ticket.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    res.json({
      message: "Ticket deleted successfully ✅",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

export default router;
