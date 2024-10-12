import { useState } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Product from "./pages/Product";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/products" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
