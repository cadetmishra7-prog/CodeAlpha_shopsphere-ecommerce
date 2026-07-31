import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.products);
    } catch (err) {
      console.error(err);
    }
  };

  const addToCart = async (productId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please login first.");
        return;
      }

      const res = await api.post("/cart", {
        userId: user._id,
        productId,
        quantity: 1,
      });

      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Unable to add product.");
    }
  };

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      item.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mt-5">

      <h1 className="text-center mb-4">
        Latest Products
      </h1>

      <div className="row mb-4">

        <div className="col-md-8">
          <input
            className="form-control"
            placeholder="Search Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Books</option>
            <option>Sports</option>
            <option>Home</option>
          </select>
        </div>

      </div>

      <p>
        <strong>Total Products:</strong> {filteredProducts.length}
      </p>

      <div className="row">

        {filteredProducts.map((item) => (

          <div className="col-md-4 mb-4" key={item._id}>

            <div className="card shadow h-100">

              <Link to={`/product/${item._id}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="card-img-top"
                  style={{
                    height: "220px",
                    objectFit: "cover",
                  }}
                />
              </Link>

              <div className="card-body d-flex flex-column">

                <h4>
                  <Link
                    to={`/product/${item._id}`}
                    className="text-decoration-none text-dark"
                  >
                    {item.name}
                  </Link>
                </h4>

                <p>{item.description}</p>

                <h5 className="text-success">
                  ₹ {item.price}
                </h5>

                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => addToCart(item._id)}
                >
                  Add to Cart
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Home;