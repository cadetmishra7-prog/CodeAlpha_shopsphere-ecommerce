import { useEffect, useState } from "react";
import api from "../services/api";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-5">

      <h2 className="mb-4">👥 Manage Users</h2>

      <table className="table table-bordered table-striped">

        <thead>

          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>

        </thead>

        <tbody>

          {users.map((user) => (
            <tr key={user._id}>

              <td>{user.name}</td>

              <td>{user.email}</td>

              <td>
                <span className="badge bg-primary">
                  {user.role}
                </span>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default AdminUsers;