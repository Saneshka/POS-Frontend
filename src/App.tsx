import { useState } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Order from "./pages/orders/Order";
import CreateOrder from "./pages/orders/CreateOrder";
import Stock from "./pages/Stock";
import Navbar from "./Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/products" element={<Product />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/orders/create" element={<CreateOrder />} />
        <Route path="/stocks" element={<Stock />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
