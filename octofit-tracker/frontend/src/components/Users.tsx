import { useEffect, useState } from "react";
import { apiUrlFor, apiNotice } from "../api";

type User = {
  _id?: string;
  name: string;
  email: string;
  role?: string;
};

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(apiUrlFor("users"))
      .then((response) => response.json())
      .then((data) => setUsers(data.data ?? data ?? []))
      .catch(() => setError("Unable to load users."));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {apiNotice && <div className="alert alert-warning">{apiNotice}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id ?? `${user.name}-${user.email}`}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role ?? "member"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
