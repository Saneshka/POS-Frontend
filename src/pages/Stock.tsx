import axios from "axios";
import { useEffect, useState } from "react";
import ProductType from "../types/ProductType";
import StockType from "../types/StockType";
import { useAuth } from "../context/AuthContext";

function Stock() {
  const { isAuthenticated, jwtToken } = useAuth();

  const [stocks, setStocks] = useState<StockType[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);

  const [qty, setQty] = useState<number | null>(null);
  const [newQty, setNewQty] = useState<number | null>(null);
  const [productId, setProductId] = useState<number>(0);

  const [editingStock, setEditingStock] = useState<StockType | null>(null);

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  async function loadProducts() {
    const res = await axios.get("http://localhost:8080/products", config);
    setProducts(res.data);
  }
  async function loadStocks() {
    const res = await axios.get("http://localhost:8080/stocks", config);
    setStocks(res.data);
  }
  async function removeStock() {
    const totalQty = Number(qty) - Number(newQty);
    const data = {
      qty: totalQty,
      productId: productId,
    };
    try {
      const res = await axios.put(
        "http://localhost:8080/stocks/" + editingStock?.id,
        data,
        config
      );
      loadStocks();
      setEditingStock(null);
      setQty(null);
      setNewQty(null);
      setProductId(0);
    } catch (error) {}
  }
  async function addStock() {
    const totalQty = Number(qty) + Number(newQty);
    const data = {
      qty: totalQty,
      productId: productId,
    };
    try {
      const res = await axios.put(
        "http://localhost:8080/stocks/" + editingStock?.id,
        data,
        config
      );
      loadStocks();
      setEditingStock(null);
      setQty(null);
      setNewQty(null);
      setProductId(0);
    } catch (error) {}
  }

  useEffect(function () {
    loadStocks();
    loadProducts();
  }, []);

  function handleNewQty(event: any) {
    setNewQty(event.target.value);
  }

  function handleProductId(event: any) {
    setProductId(event.target.value);
  }

  function manageStock(stock: StockType) {
    setEditingStock(stock);
    setQty(stock.qty);
    setProductId(stock.product.productId);
  }

  return (
    <div className="container mx-auto">
      <div className="border border-slate-200 py-3 px-4 rounded-md m-3 bg-slate-50">
        <h1 className="text-xl font-bold mb-3">Stock Management</h1>
        <form>
          <div>
            <select
              className="py-3 px-4 text-sm w-full rounded-md border border-slate-200 mb-3"
              onChange={handleProductId}
              value={productId}
              disabled
            >
              <option value=""></option>
              {products.map(function (product: ProductType) {
                return (
                  <option value={product.productId}>
                    {product.productName}
                  </option>
                );
              })}
            </select>
            <input
              className="py-3 px-4 text-sm w-full rounded-md border border-slate-200 mb-3"
              type="number"
              placeholder="Quantity"
              onChange={handleNewQty}
              value={newQty !== null ? newQty : ""}
            />
          </div>
          <button
            type="button"
            className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-700 mr-2"
            onClick={addStock}
          >
            Add To Stock
          </button>
          <button
            type="button"
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            onClick={removeStock}
          >
            Remove From Stock
          </button>
          {/* {editingStock ? (
          )} */}
        </form>
        <div className="mt-6 overflow-y-auto h-[415px]">
          <table className="table w-full border-separate border-spacing-0 border-none text-left">
            <thead className="bg-cyan-300 sticky top-0">
              <tr>
                <th>Stock ID</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map(function (stock: StockType) {
                return (
                  <tr>
                    <td>{stock.id}</td>
                    <td>{stock.product.productName}</td>
                    <td>{stock.qty}</td>
                    <td>
                      <button
                        className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-700 mr-2"
                        type="button"
                        onClick={() => manageStock(stock)}
                      >
                        Manage Stock
                      </button>
                    </td>
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

export default Stock;
