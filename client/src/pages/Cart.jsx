import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        setLoading(false);
        return;
      }

      const res = await api.get(`/cart/${user._id}`);

      setCart(res.data.cart);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await api.delete(`/cart/${user._id}/${productId}`);

      loadCart();
    } catch (err) {
      console.log(err);
      alert("Unable to remove item");
    }
  };

  const total =
    cart?.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    ) || 0;

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading Cart...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">

      <h2 className="mb-4">🛒 My Cart</h2>

      {!cart || cart.items.length === 0 ? (
        <div className="alert alert-warning">
          Your cart is empty.
        </div>
      ) : (
        <>
          {cart.items.map((item) => (
            <div className="card shadow-sm mb-3" key={item._id}>
              <div className="row g-0">

                <div className="col-md-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="img-fluid rounded-start"
                    style={{
                      height: "180px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div className="col-md-9">
                  <div className="card-body">

                    <h4>{item.product.name}</h4>

                    <p>{item.product.description}</p>

                    <h5 className="text-success">
                      ₹ {item.product.price}
                    </h5>

                    <h6>
                      Quantity :
                      <span className="ms-2">
                        {item.quantity}
                      </span>
                    </h6>

                    <button
                      className="btn btn-danger mt-3"
                      onClick={() =>
                        removeItem(item.product._id)
                      }
                    >
                      Remove
                    </button>

                  </div>
                </div>

              </div>
            </div>
          ))}

          <div className="card p-4 mt-4">

            <h3>Total : ₹ {total}</h3>

            <Link
  to="/checkout"
  className="btn btn-success btn-lg mt-3"
>
  Proceed to Checkout
</Link>

          </div>
        </>
      )}
    </div>
  );
}

export default Cart;