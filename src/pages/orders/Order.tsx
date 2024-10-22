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
    <div className="container mx-auto">
      <div className="border border-slate-200 py-3 px-4 rounded-md m-3 bg-slate-50">
        <h1 className="text-xl font-bold mb-4">Order Management</h1>

        <Link
          to={"/orders/create"}
          className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-700 mr-2 justify-end"
        >
          Add Order
        </Link>
        <div className="overflow-y-auto h-[540px] mt-6">
          <table className="table w-full border-separate border-spacing-0 border-none text-left">
            <thead className="bg-cyan-300 sticky top-0 ">
              <tr>
                <th>Order Id</th>
                <th>Order Date & Time</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(function (order) {
                return (
                  <tr>
                    <td>{order.id}</td>
                    <td>{order.orderDateTime}</td>
                    <td>{order.totalPrice}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Order;
