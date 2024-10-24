import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { isAuthenticated, jwtToken } = useAuth();

  const [userCount, setUserCount] = useState<number>(0);
  const [categoryCount, setCategoryCount] = useState<number>(0);
  const [productCount, setProductCount] = useState<number>(0);
  const [orderCount, setOrderCount] = useState<number>(0);

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  useEffect(
    function () {
      if (isAuthenticated) {
        loadCategories();
        loadProducts();
        loadOrders();
        loadUsers();
      }
    },
    [isAuthenticated]
  );

  async function loadCategories() {
    const res = await axios.get("http://localhost:8080/categories", config);
    setCategoryCount(res.data.length);
  }
  async function loadProducts() {
    const res = await axios.get("http://localhost:8080/products", config);
    setProductCount(res.data.length);
  }
  async function loadOrders() {
    const res = await axios.get("http://localhost:8080/orders", config);
    setOrderCount(res.data.length);
  }
  async function loadUsers() {
    const res = await axios.get("http://localhost:8080/users", config);
    setUserCount(res.data.length);
  }

  return (
    <div className="container mx-auto">
      <div className="border border-slate-200 py-3 px-4 rounded-md m-3 bg-slate-50">
        <h1 className="text-2xl text-center font-bold mb-1">
          Welcome To POS Solution!
        </h1>
        <p className="text-sm text-center font-semibold mb-6 text-slate-400">
          Where User's find their future POS Solution{" "}
        </p>
        <div className="flex flex-row py-2 justify-center mr-4 gap-6">
          <div className="bg-cyan-500 w-[300px] h-[150px] rounded-md">
            <h1 className="text-center text-[80px] text-white font-bold">
              {categoryCount}
            </h1>
            <p className="text-sm text-slate-200 text-center font-semibold">
              Total Categories
            </p>
          </div>
          <div className="bg-cyan-500 w-[300px] h-[150px] rounded-md">
            <h1 className="text-center text-[80px] text-white font-bold">
              {productCount}
            </h1>
            <p className="text-sm text-slate-200 text-center font-semibold">
              Total Products
            </p>
          </div>
          <div className="bg-cyan-500 w-[300px] h-[150px] rounded-md">
            <h1 className="text-center text-[80px] text-white font-bold">
              {orderCount}
            </h1>
            <p className="text-sm text-slate-200 text-center font-semibold">
              Total Orders
            </p>
          </div>
          <div className="bg-cyan-500 w-[300px] h-[150px] rounded-md">
            <h1 className="text-center text-[80px] text-white font-bold">
              {userCount}
            </h1>
            <p className="text-sm text-slate-200 text-center font-semibold">
              Total Users
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
