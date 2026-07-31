import { useEffect, useState } from "react";
import api from "../services/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data.orders);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}`, {
        status,
      });

      alert("Order status updated successfully");

      loadOrders();
    } catch (err) {
      console.log(err);
      alert("Unable to update order.");
    }
  };

  return (
    <div className="container mt-5">

      <h2 className="mb-4">
        Admin Order Management
      </h2>

      {orders.length === 0 ? (
        <div className="alert alert-info">
          No Orders Found
        </div>
      ) : (
        <div className="table-responsive">

          <table className="table table-bordered table-striped">

            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Products</th>
                <th>Total</th>
                <th>Address</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Update</th>
              </tr>
            </thead>

            <tbody>

              {orders.map((order, index) => (

                <tr key={order._id}>

                  <td>{index + 1}</td>

                  <td>
                    {order.user?.name}
                    <br />
                    <small>{order.user?.email}</small>
                  </td>

                  <td>

                    {order.orderItems.map((item) => (
                      <div key={item._id}>
                        {item.product?.name}
                        <br />
                        Qty : {item.quantity}
                      </div>
                    ))}

                  </td>

                  <td>
                    ₹ {order.totalAmount}
                  </td>

                  <td>
                    {order.shippingAddress}
                  </td>

                  <td>
                    {order.paymentMethod}
                  </td>

                  <td>
                    <span className="badge bg-primary">
                      {order.orderStatus}
                    </span>
                  </td>

                  <td>

                    <select
                      className="form-select"
                      value={order.orderStatus}
                      onChange={(e) =>
                        updateStatus(
                          order._id,
                          e.target.value
                        )
                      }
                    >
                      <option>Pending</option>
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default AdminOrders;