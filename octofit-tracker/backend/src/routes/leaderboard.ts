import { Router } from "express";
import LeaderboardEntry from "../models/leaderboard.ts";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const leaderboard = await LeaderboardEntry.find()
      .sort({ ranking: 1 })
      .populate("user", "name email")
      .populate("team", "name");
    res.json({ resource: "leaderboard", data: leaderboard });
  } catch (error) {
    res.status(500).json({ error: "Unable to load leaderboard." });
  }
});

export default router;
