import { useEffect, useState } from "react";
import ProductType from "../../types/ProductType";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CategoryType from "../../types/CategoryType";
import StockType from "../../types/StockType";
import { useAuth } from "../../context/AuthContext";

function CreateOrder() {
  const { isAuthenticated, jwtToken } = useAuth();

  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [orderedProducts, setOrderedProducts] = useState<ProductType[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [remainingStock, setRemainingStock] = useState<{
    [key: number]: number;
  }>({});
  const [showModal, setShowModal] = useState<boolean>(false); // Modal state
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  async function loadCategories() {
    try {
      const res = await axios.get("http://localhost:8080/categories", config);
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function loadProducts() {
    try {
      const res = await axios.get("http://localhost:8080/products", config);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function loadStocks(id: number): Promise<StockType | null> {
    try {
      const res = await axios.get("http://localhost:8080/stocks/" + id, config);
      return res.data;
    } catch (error) {
      return null;
    }
  }

  async function saveOrder() {
    var productIds: any = [];

    orderedProducts.map(function (product) {
      productIds.push(product.productId);
    });

    try {
      const res = await axios.post(
        "http://localhost:8080/orders",
        {
          productIds: productIds,
        },
        config
      );
      console.log("order details : ", res.data);
      setOrderDetails(res.data);
      setShowModal(true);
      // navigate("/orders");
    } catch (error) {
      console.log(error);
    }
  }

  function filterProducts(category: CategoryType) {
    setFilteredProducts([]);

    const updatedFilteredProducts = products.filter(
      (product) => product.category.catId === category.catId
    );

    setFilteredProducts(updatedFilteredProducts);
  }

  // async function addProductToOrder(product: ProductType) {
  //   const stock = await loadStocks(product.productId);
  //   console.log("saneshka", stock);
  //   if (stock?.qty! <= 0) {
  //     alert("Not Enough Stocks!");
  //   } else {
  //     const updatedOrder = [...orderedProducts, product];
  //     setOrderedProducts(updatedOrder);
  //   }
  // }

  async function addProductToOrder(product: ProductType) {
    let currentStock = remainingStock[product.productId];

    // If stock is not tracked yet, fetch it from the API
    if (currentStock === undefined) {
      const stock = await loadStocks(product.productId); // Fetch stock data
      currentStock = stock?.qty!;

      if (currentStock <= 0) {
        alert("Not Enough Stocks!");
        return;
      } else {
        setRemainingStock((prev) => ({
          ...prev,
          [product.productId]: currentStock,
        }));
      }
    }

    // Check the current stock (locally tracked)
    if (currentStock <= 0) {
      alert("Not Enough Stocks!");
    } else {
      // Add the product to the order
      const updatedOrder = [...orderedProducts, product];
      setOrderedProducts(updatedOrder);

      // Reduce the available stock locally
      currentStock -= 1;
      setRemainingStock((prev) => ({
        ...prev,
        [product.productId]: currentStock,
      }));
    }
  }

  useEffect(
    function () {
      orderedProducts.map(function (product) {
        const totalPrice = total + product.price;
        setTotal(totalPrice);
      });
    },
    [orderedProducts]
  );

  useEffect(() => {
    if (isAuthenticated) {
      loadProducts();
      loadCategories();
    }
  }, [isAuthenticated]);

  function handlePrint() {
    window.print();
  }
  function closeBill() {
    setShowModal(false);
    navigate("/orders");
  }

  return (
    <div>
      <div className="flex">
        <div className="w-[800px] border-r border-slate-100 p-2">
          <span className="text-xl font-semibold text-slate-800">
            Categories
          </span>
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map(function (category: CategoryType) {
              return (
                <div
                  onClick={() => filterProducts(category)}
                  className="border border-slate-200 rounded-md p-2 mb-3 w-[150px]"
                >
                  <div className="text-lg font-semibold text-slate-800">
                    {category.catName}
                  </div>
                  <div className="text-sm text-slate-400">
                    {category.description}
                  </div>
                </div>
              );
            })}
          </div>
          <span className="text-xl font-semibold text-slate-800 mt-3">
            Products
          </span>
          <div className="mt-3 flex flex-wrap gap-2">
            {filteredProducts.map(function (product: ProductType) {
              return (
                <div
                  onClick={() => addProductToOrder(product)}
                  className="border border-slate-200 rounded-md p-2 mb-3 w-[150px]"
                >
                  <div className="text-lg font-semibold text-slate-800">
                    {product.productName}
                  </div>
                  <div className="text-sm text-slate-400 ">
                    {product.category.catName}{" "}
                  </div>
                  <div className="text-sm text-green-500 text-right">
                    Rs. {product.price}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-2 flex-1">
          <span className="text-xl font-semibold text-slate-800">
            New Order
          </span>
          <table className="w-full border-separate border-spacing-0 border-none text-left">
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th className="text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {orderedProducts.map(function (product) {
                return (
                  <tr>
                    <td>{product.productId}</td>
                    <td>{product.productName}</td>
                    <td className="text-right">{product.price}</td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan={2}>
                  <strong>Total</strong>
                </td>
                <td className="text-right">
                  <strong>{total}</strong>
                </td>
              </tr>
            </tbody>
          </table>
          <button
            onClick={saveOrder}
            className="bg-cyan-500 text-white px-4 py-3 rounded-md hover:bg-cyan-700 mt-3"
          >
            Complete Order
          </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-md w-[600px]">
            <h1 className="text-xl font-bold mb-2 text-center">POS Solution</h1>
            <h2 className="text-xl font-bold mb-4">Order Bill</h2>
            <p>
              <strong>Order ID:</strong> {orderDetails.id}
            </p>
            <p>
              <strong>Order Date:</strong>{" "}
              {new Date(orderDetails.orderDateTime).toLocaleString()}
            </p>
            <table className="w-full border-separate border-spacing-0 border-none text-left mt-4">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th className="text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.orderedProducts.map((product: any) => (
                  <tr key={product.productId}>
                    <td>{product.productId}</td>
                    <td>{product.productName}</td>
                    <td className="text-right">{product.price}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={2}>
                    <strong>Total</strong>
                  </td>
                  <td className="text-right">
                    <strong>{orderDetails.totalPrice}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="text-xs text-center">
              **** Thank you! Come Again ****
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handlePrint}
                className="bg-cyan-500 text-white px-4 py-3 rounded-md hover:bg-cyan-700"
              >
                Print
              </button>
              <button
                onClick={closeBill}
                className="bg-gray-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateOrder;
