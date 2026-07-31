import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data.product);
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please login first.");
        return;
      }

      const res = await api.post("/cart", {
        userId: user._id,
        productId: product._id,
        quantity: 1,
      });

      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Unable to add product.");
    }
  };

  const submitReview = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please login first.");
        return;
      }

      const res = await api.post(
        `/products/${product._id}/review`,
        {
          userId: user._id,
          rating: Number(rating),
          comment,
        }
      );

      alert(res.data.message);

      setComment("");
      setRating(5);

      loadProduct();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to submit review.");
    }
  };

  if (!product) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading Product...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">

      <div className="row">

        <div className="col-md-5">

          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded shadow"
          />

        </div>

        <div className="col-md-7">

          <h2>{product.name}</h2>

          <p>{product.description}</p>

          <h3 className="text-success">
            ₹ {product.price}
          </h3>

          <p>
            <strong>Category:</strong> {product.category}
          </p>

          <p>
            <strong>Stock:</strong> {product.stock}
          </p>

          <button
            className="btn btn-primary btn-lg mt-3"
            onClick={addToCart}
          >
            Add to Cart
          </button>

          <hr />

          <h4>Write a Review</h4>

          <select
            className="form-select mb-3"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
            <option value={4}>⭐⭐⭐⭐ (4)</option>
            <option value={3}>⭐⭐⭐ (3)</option>
            <option value={2}>⭐⭐ (2)</option>
            <option value={1}>⭐ (1)</option>
          </select>

          <textarea
            className="form-control mb-3"
            rows="4"
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button
            className="btn btn-warning"
            onClick={submitReview}
          >
            Submit Review
          </button>

        </div>

      </div>

      <hr className="my-5" />

      <h3>Customer Reviews</h3>

      {product.reviews && product.reviews.length > 0 ? (
        product.reviews.map((review, index) => (
          <div
            key={index}
            className="card shadow-sm mb-3"
          >
            <div className="card-body">

              <h5>{review.name}</h5>

              <p>
                Rating: ⭐ {review.rating}/5
              </p>

              <p>{review.comment}</p>

            </div>
          </div>
        ))
      ) : (
        <div className="alert alert-info">
          No reviews yet.
        </div>
      )}

    </div>
  );
}

export default ProductDetails;