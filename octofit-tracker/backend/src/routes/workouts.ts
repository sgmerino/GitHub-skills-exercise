import { Router } from "express";
import Workout from "../models/workout.ts";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json({ resource: "workouts", data: workouts });
  } catch (error) {
    res.status(500).json({ error: "Unable to load workouts." });
  }
});

export default router;
