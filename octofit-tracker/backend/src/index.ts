import express from "express";
import mongoose from "mongoose";
import usersRouter from "./routes/users.ts";
import teamsRouter from "./routes/teams.ts";
import activitiesRouter from "./routes/activities.ts";
import leaderboardRouter from "./routes/leaderboard.ts";
import workoutsRouter from "./routes/workouts.ts";

const app = express();
const port = 8000;
const mongoUri = process.env.MONGODB_URI ?? "mongodb://localhost:27017/octofit_db";
const codespace = process.env.CODESPACE_NAME;
const apiUrl = codespace
  ? `https://${port}-${codespace}.githubpreview.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "OctoFit Tracker API is running." });
});

app.use("/api/users", usersRouter);
app.use("/api/teams", teamsRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/leaderboard", leaderboardRouter);
app.use("/api/workouts", workoutsRouter);

mongoose.connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server listening on ${apiUrl}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
