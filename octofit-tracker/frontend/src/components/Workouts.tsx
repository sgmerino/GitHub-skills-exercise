import { useEffect, useState } from "react";
import { apiUrlFor, apiNotice } from "../api";

type Workout = {
  _id?: string;
  title: string;
  description?: string;
  type: string;
  difficulty?: string;
  durationMinutes: number;
};

function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(apiUrlFor("workouts"))
      .then((response) => response.json())
      .then((data) => setWorkouts(data.data ?? data ?? []))
      .catch(() => setError("Unable to load workouts."));
  }, []);

  return (
    <div>
      <h2>Workouts</h2>
      {apiNotice && <div className="alert alert-warning">{apiNotice}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row gy-3">
        {workouts.map((workout) => (
          <div key={workout._id ?? workout.title} className="col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{workout.title}</h5>
                <p className="card-text">{workout.description ?? "No description."}</p>
                <p className="mb-0">
                  <strong>Type:</strong> {workout.type}
                </p>
                <p className="mb-0">
                  <strong>Difficulty:</strong> {workout.difficulty ?? "Intermediate"}
                </p>
                <p className="mb-0">
                  <strong>Duration:</strong> {workout.durationMinutes} min
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workouts;
