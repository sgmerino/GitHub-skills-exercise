import { useEffect, useState } from "react";
import { apiUrlFor, apiNotice } from "../api";

type Team = {
  _id?: string;
  name: string;
  description?: string;
};

function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(apiUrlFor("teams"))
      .then((response) => response.json())
      .then((data) => setTeams(data.data ?? data ?? []))
      .catch(() => setError("Unable to load teams."));
  }, []);

  return (
    <div>
      <h2>Teams</h2>
      {apiNotice && <div className="alert alert-warning">{apiNotice}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row gy-3">
        {teams.map((team) => (
          <div key={team._id ?? team.name} className="col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <p className="card-text">{team.description ?? "No description."}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
