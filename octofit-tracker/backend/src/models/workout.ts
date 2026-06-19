import { Schema, model } from "mongoose";

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    type: { type: String, required: true },
    difficulty: { type: String, default: "Intermediate" },
    durationMinutes: { type: Number, required: true },
    recommendedFor: [{ type: String }],
  },
  { timestamps: true }
);

const Workout = model("Workout", workoutSchema);
export default Workout;
