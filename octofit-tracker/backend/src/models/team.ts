import { Schema, model } from "mongoose";

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    createdAt: { type: Date, required: true, default: () => new Date() },
  },
  { timestamps: true }
);

const Team = model("Team", teamSchema);
export default Team;
