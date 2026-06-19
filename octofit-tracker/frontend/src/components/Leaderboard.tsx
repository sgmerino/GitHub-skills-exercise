import { useEffect, useState } from "react";
import { apiUrlFor, apiNotice } from "../api";

type LeaderboardEntry = {
  _id?: string;
  score: number;
  ranking: number;
  period?: string;
  user?: { name: string };
  team?: { name: string };
};

function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(apiUrlFor("leaderboard"))
      .then((response) => response.json())
      .then((data) => setEntries(data.data ?? data ?? []))
      .catch(() => setError("Unable to load leaderboard."));
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      {apiNotice && <div className="alert alert-warning">{apiNotice}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Team</th>
              <th>Score</th>
              <th>Period</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry._id ?? `${entry.ranking}-${entry.score}`}>
                <td>{entry.ranking}</td>
                <td>{entry.user?.name ?? "Unknown"}</td>
                <td>{entry.team?.name ?? "None"}</td>
                <td>{entry.score}</td>
                <td>{entry.period ?? "weekly"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
