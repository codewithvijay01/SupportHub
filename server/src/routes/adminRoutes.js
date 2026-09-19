import express from "express";
import Ticket from "../models/Ticket.js";
import authMiddleware from "../authMiddleware.js";
import adminMiddleware from "../adminMiddleware.js";

const router = express.Router();

router.get("/test", authMiddleware, adminMiddleware, (req, res) => {
  res.json({
    message: "Admin access granted ✅",
    user: req.user,
  });
});
router.get("/tickets", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({
      message: "All tickets fetched successfully ✅",
      tickets,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});
router.put(
  "/tickets/:id/status",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const { status } = req.body;

      const allowedStatuses = ["open", "in-progress", "resolved", "closed"];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          message: "Invalid status",
        });
      }

      const ticket = await Ticket.findById(req.params.id);

      if (!ticket) {
        return res.status(404).json({
          message: "Ticket not found",
        });
      }

      ticket.status = status;

      await ticket.save();

      res.json({
        message: "Ticket status updated successfully ✅",
        ticket,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Server error",
      });
    }
  },
);

export default router;
