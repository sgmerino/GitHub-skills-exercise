import { Router } from "express";
import User from "../models/user.ts";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find().populate("team", "name");
    res.json({ resource: "users", data: users });
  } catch (error) {
    res.status(500).json({ error: "Unable to load users." });
  }
});

export default router;
