import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);

  const [shippingAddress, setShippingAddress] = useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("Cash On Delivery");

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await api.get(`/cart/${user._id}`);

      setCart(res.data.cart);
    } catch (err) {
      console.log(err);
    }
  };

  const total =
    cart?.items.reduce(
      (sum, item) =>
        sum + item.product.price * item.quantity,
      0
    ) || 0;

  const placeOrder = async () => {
    if (!shippingAddress.trim()) {
      return alert("Please enter shipping address.");
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await api.post("/orders", {
        userId: user._id,
        shippingAddress,
        paymentMethod,
      });

      alert(res.data.message);

      navigate("/orders");
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Order failed"
      );
    }
  };

  return (
    <div className="container mt-5">

      <div className="card shadow p-4">

        <h2 className="mb-4">
          Checkout
        </h2>

        <label className="form-label">
          Shipping Address
        </label>

        <textarea
          className="form-control mb-3"
          rows="4"
          value={shippingAddress}
          onChange={(e) =>
            setShippingAddress(e.target.value)
          }
        />

        <label className="form-label">
          Payment Method
        </label>

        <select
          className="form-select mb-4"
          value={paymentMethod}
          onChange={(e) =>
            setPaymentMethod(e.target.value)
          }
        >
          <option>
            Cash On Delivery
          </option>

          <option>
            UPI
          </option>

          <option>
            Credit Card
          </option>
        </select>

        <h3 className="text-success">
          Total : ₹ {total}
        </h3>

        <button
          className="btn btn-success btn-lg mt-4"
          onClick={placeOrder}
        >
          Place Order
        </button>

      </div>
    </div>
  );
}

export default Checkout;