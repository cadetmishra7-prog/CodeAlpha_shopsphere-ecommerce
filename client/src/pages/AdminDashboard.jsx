import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await api.get("/admin/dashboard");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">👨‍💼 Admin Dashboard</h2>

      <div className="row">

        <div className="col-md-4">
          <div className="card text-center shadow p-4">
            <h5>Total Users</h5>
            <h2>{stats.users}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow p-4">
            <h5>Total Products</h5>
            <h2>{stats.products}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow p-4">
            <h5>Total Orders</h5>
            <h2>{stats.orders}</h2>
          </div>
        </div>

      </div>

      <div className="mt-5 d-grid gap-3">

        <a href="/admin/products" className="btn btn-primary">
          Manage Products
        </a>

        <a href="/admin/orders" className="btn btn-success">
          Manage Orders
        </a>

        <a href="/admin/users" className="btn btn-dark">
          Manage Users
        </a>
        <a
  href="/admin/users"
  className="btn btn-dark"
>
  Manage Users
</a>

      </div>
    </div>
  );
}

export default AdminDashboard;