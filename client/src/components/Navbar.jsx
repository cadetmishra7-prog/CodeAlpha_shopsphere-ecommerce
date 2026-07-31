import { Link, useNavigate } from "react-router-dom";


function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          🛒 ShopSphere
        </Link>

        <div className="collapse navbar-collapse">
         <ul className="navbar-nav ms-auto">

  <li className="nav-item">
    <Link className="nav-link" to="/">
      Home
    </Link>
  </li>

  {token && (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/cart">
          🛒 Cart
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/orders">
          📦 Orders
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/profile">
          👤 Profile
        </Link>
      </li>

      {user?.role === "admin" && (
        <li className="nav-item">
          <Link className="nav-link" to="/admin">
            ⚙️ Admin
          </Link>
        </li>
      )}
    </>
  )}

  {!token ? (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Register
        </Link>
      </li>
    </>
  ) : (
    <>
      <li className="nav-item">
        <span className="nav-link">
          👋 {user?.name}
        </span>
      </li>

      <li className="nav-item">
        <button
          onClick={logout}
          className="btn btn-danger ms-2"
        >
          Logout
        </button>
      </li>
    </>
  )}

</ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;