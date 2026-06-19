import { useEffect, useState } from "react";
import { apiUrlFor, apiNotice } from "../api";

type Activity = {
  _id?: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  date?: string;
  user?: { name: string };
};

function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(apiUrlFor("activities"))
      .then((response) => response.json())
      .then((data) => setActivities(data.data ?? data ?? []))
      .catch(() => setError("Unable to load activities."));
  }, []);

  return (
    <div>
      <h2>Activities</h2>
      {apiNotice && <div className="alert alert-warning">{apiNotice}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Calories</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id ?? `${activity.type}-${activity.date}`}>
                <td>{activity.user?.name ?? "Unknown"}</td>
                <td>{activity.type}</td>
                <td>{activity.durationMinutes} min</td>
                <td>{activity.caloriesBurned}</td>
                <td>{activity.date ? new Date(activity.date).toLocaleString() : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Activities;
