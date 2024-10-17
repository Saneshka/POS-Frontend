import { useEffect, useState } from "react";
import OrderType from "../../types/OrderType";
import axios from "axios";
import { Link } from "react-router-dom";

function Order() {
  const [orders, setOrders] = useState<OrderType[]>([]);

  async function loadOrders() {
    try {
      const res = await axios.get("http://localhost:8080/orders");
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(function () {
    loadOrders();
  }, []);

  return (
    <div className="container mx-auto py-5">
      <h1 className="text-3xl font-bold">Orders</h1>

      <Link to={"/orders/create"} className="text-blue-500 mb-5 block">
        Add Order
      </Link>
      <div className="table w-11/12 mx-auto border-separate border-spacing-0 border-none text-left">
        <thead className="bg-slate-200">
          <tr>
            <th>Order Id</th>
            <th>Order Date & Time</th>
            <th>Total Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(function (order) {
            return (
              <tr>
                <td>{order.id}</td>
                <td>{order.orderDateTime}</td>
                <td>{order.totalPrice}</td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </div>
    </div>
  );
}
export default Order;
