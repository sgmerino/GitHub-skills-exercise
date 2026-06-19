import mongoose from "mongoose";
import User from "../models/user.ts";
import Team from "../models/team.ts";
import Activity from "../models/activity.ts";
import LeaderboardEntry from "../models/leaderboard.ts";
import Workout from "../models/workout.ts";

// Seed the octofit_db database with test data
const uri = process.env.MONGODB_URI ?? "mongodb://localhost:27017/octofit_db";

async function seed() {
  await mongoose.connect(uri);
  console.log("Connected to MongoDB for seeding:", uri);

  await mongoose.connection.dropDatabase();
  console.log("Dropped existing octofit_db database.");

  const users = await User.create([
    {
      name: "Ava Hughes",
      email: "ava.hughes@example.com",
      role: "admin",
    },
    {
      name: "Noah Patel",
      email: "noah.patel@example.com",
      role: "member",
    },
    {
      name: "Mia Chen",
      email: "mia.chen@example.com",
      role: "member",
    },
  ]);

  const teams = await Team.create([
    {
      name: "OctoRunners",
      description: "A team focused on endurance and daily movement.",
      members: [users[0]._id, users[1]._id],
    },
    {
      name: "Core Crushers",
      description: "Strength routines and functional fitness challenges.",
      members: [users[2]._id],
    },
  ]);

  const activities = await Activity.create([
    {
      user: users[0]._id,
      type: "running",
      durationMinutes: 45,
      caloriesBurned: 510,
      date: new Date("2026-06-14T07:30:00Z"),
    },
    {
      user: users[1]._id,
      type: "cycling",
      durationMinutes: 60,
      caloriesBurned: 620,
      date: new Date("2026-06-14T10:00:00Z"),
    },
    {
      user: users[2]._id,
      type: "yoga",
      durationMinutes: 30,
      caloriesBurned: 180,
      date: new Date("2026-06-14T18:00:00Z"),
    },
  ]);

  const leaderboardEntries = await LeaderboardEntry.create([
    {
      user: users[0]._id,
      team: teams[0]._id,
      score: 980,
      ranking: 1,
      period: "weekly",
    },
    {
      user: users[1]._id,
      team: teams[0]._id,
      score: 860,
      ranking: 2,
      period: "weekly",
    },
    {
      user: users[2]._id,
      team: teams[1]._id,
      score: 710,
      ranking: 3,
      period: "weekly",
    },
  ]);

  const workouts = await Workout.create([
    {
      title: "Morning HIIT Blast",
      description: "A high-intensity interval routine to kickstart your day.",
      type: "HIIT",
      difficulty: "Advanced",
      durationMinutes: 25,
      recommendedFor: ["cardio", "strength"],
    },
    {
      title: "Evening Stretch Flow",
      description: "A mobility and recovery session for post-workout relief.",
      type: "Yoga",
      difficulty: "Beginner",
      durationMinutes: 30,
      recommendedFor: ["flexibility", "recovery"],
    },
    {
      title: "Team Challenge Circuit",
      description: "Group-friendly exercises designed for teams and partner work.",
      type: "Circuit",
      difficulty: "Intermediate",
      durationMinutes: 40,
      recommendedFor: ["team", "strength"],
    },
  ]);

  console.log("Seed the octofit_db database with test data completed.");
  console.log({
    users: users.length,
    teams: teams.length,
    activities: activities.length,
    leaderboard: leaderboardEntries.length,
    workouts: workouts.length,
  });

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB after seeding.");
}

seed().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
