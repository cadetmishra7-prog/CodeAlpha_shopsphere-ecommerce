import { useEffect, useState } from "react";
import api from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const loggedUser = JSON.parse(localStorage.getItem("user"));

      if (!loggedUser) return;

      // Using stored user for now
      setUser(loggedUser);

      // Later you can replace this with:
      // const res = await api.get(`/users/${loggedUser._id}`);
      // setUser(res.data.user);

    } catch (err) {
      console.log(err);
    }
  };

  if (!user) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading Profile...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">

      <div className="card shadow-lg p-4">

        <div className="text-center">

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile"
            width="120"
          />

          <h2 className="mt-3">{user.name}</h2>

          <span className="badge bg-success">
            {user.role}
          </span>

        </div>

        <hr />

        <div className="row">

          <div className="col-md-6">
            <h5>Name</h5>
            <p>{user.name}</p>
          </div>

          <div className="col-md-6">
            <h5>Email</h5>
            <p>{user.email}</p>
          </div>

        </div>

        <div className="mt-4">

          <button
            className="btn btn-danger"
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default Profile;