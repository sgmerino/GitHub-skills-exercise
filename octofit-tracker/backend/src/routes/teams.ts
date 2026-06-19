import { Router } from "express";
import Team from "../models/team.ts";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const teams = await Team.find().populate("members", "name email");
    res.json({ resource: "teams", data: teams });
  } catch (error) {
    res.status(500).json({ error: "Unable to load teams." });
  }
});

export default router;
