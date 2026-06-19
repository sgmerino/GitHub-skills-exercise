import { Schema, model } from "mongoose";

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    team: { type: Schema.Types.ObjectId, ref: "Team" },
    score: { type: Number, required: true },
    ranking: { type: Number, required: true },
    period: { type: String, default: "weekly" },
  },
  { timestamps: true }
);

const LeaderboardEntry = model("LeaderboardEntry", leaderboardSchema);
export default LeaderboardEntry;
