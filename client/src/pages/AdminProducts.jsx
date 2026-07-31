import { useEffect, useState } from "react";
import api from "../services/api";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.products);
    } catch (err) {
      console.log(err);
    }
  };

  const addProduct = async (e) => {
  e.preventDefault();

  try {
    const res = await api.post("/products", {
      name,
      description,
      price,
      category,
      stock,
      image,
    });

    alert(res.data.message);

    setName("");
    setDescription("");
    setPrice("");
    setCategory("");
    setStock("");
    setImage("");

    loadProducts();

  } catch (err) {
    console.log(err);

    alert(err.response?.data?.message || "Error");
  }
};

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      const res = await api.delete(`/products/${id}`);

      alert(res.data.message);

      loadProducts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-5">

      <h2 className="mb-4">🛒 Admin Product Management</h2>

      <div className="card shadow p-4 mb-5">

        <form onSubmit={addProduct}>

          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
  type="text"
  className="form-control"
  placeholder="Image URL"
  value={image}
  onChange={(e) => setImage(e.target.value)}
  required
/>
          </div>

          <button className="btn btn-success">
            Add Product
          </button>

        </form>

      </div>

      <h3 className="mb-4">All Products</h3>

      <div className="row">

        {products.map((product) => (

          <div
            className="col-md-4 mb-4"
            key={product._id}
          >

            <div className="card shadow h-100">

              <img
                src={product.image}
                alt={product.name}
                className="card-img-top"
                style={{
                  height: "220px",
                  objectFit: "cover",
                }}
              />

              <div className="card-body">

                <h5>{product.name}</h5>

                <p>{product.description}</p>

                <h4 className="text-success">
                  ₹ {product.price}
                </h4>

                <p>
                  Category: {product.category}
                </p>

                <p>
                  Stock: {product.stock}
                </p>

                <button
                  className="btn btn-danger"
                  onClick={() =>
                    deleteProduct(product._id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AdminProducts;