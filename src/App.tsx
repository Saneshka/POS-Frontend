import { useState } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Order from "./pages/orders/Order";
import CreateOrder from "./pages/orders/CreateOrder";
import Stock from "./pages/Stock";
import Navbar from "./pages/Navbar";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import User from "./pages/User";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Category />} />
            <Route path="/products" element={<Product />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/orders/create" element={<CreateOrder />} />
            <Route path="/stocks" element={<Stock />} />
            <Route path="/users" element={<User />} />
          </Route>
          <Route path="auth/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
