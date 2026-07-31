import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await api.get(`/orders/${user._id}`);

      setOrders(res.data.orders);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-5">

      <h2 className="mb-4">📦 My Orders</h2>

      {orders.length === 0 ? (
        <div className="alert alert-warning">
          No Orders Found
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="card shadow mb-4"
          >
            <div className="card-body">

              <h5>
                Order ID : {order._id}
              </h5>

              <h6 className="text-success">
                Total : ₹ {order.totalAmount}
              </h6>

              <h6>
                Status :
                <span className="badge bg-primary ms-2">
                  {order.status}
                </span>
              </h6>

              <hr />

              {order.items.map((item) => (
                <div key={item._id}>

                  <strong>
                    {item.product.name}
                  </strong>

                  <p>
                    Qty : {item.quantity}
                  </p>

                </div>
              ))}

            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;