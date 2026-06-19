import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, default: "member" },
    team: { type: Schema.Types.ObjectId, ref: "Team" },
    joinedAt: { type: Date, required: true, default: () => new Date() },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
export default User;
