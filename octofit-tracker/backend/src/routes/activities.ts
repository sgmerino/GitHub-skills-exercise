import { Router } from "express";
import Activity from "../models/activity.ts";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const activities = await Activity.find().populate("user", "name email");
    res.json({ resource: "activities", data: activities });
  } catch (error) {
    res.status(500).json({ error: "Unable to load activities." });
  }
});

export default router;
