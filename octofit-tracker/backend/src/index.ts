import express from "express";
import usersRouter from "./routes/users.ts";
import teamsRouter from "./routes/teams.ts";
import activitiesRouter from "./routes/activities.ts";
import leaderboardRouter from "./routes/leaderboard.ts";
import workoutsRouter from "./routes/workouts.ts";
import { connectDatabase } from "./config/database.ts";
import { startServer } from "./server.ts";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "OctoFit Tracker API is running." });
});

app.use("/api/users", usersRouter);
app.use("/api/teams", teamsRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/leaderboard", leaderboardRouter);
app.use("/api/workouts", workoutsRouter);

connectDatabase()
  .then(() => {
    startServer(app);
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
