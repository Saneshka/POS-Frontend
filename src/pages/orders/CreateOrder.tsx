import { useEffect, useState } from "react";
import ProductType from "../../types/ProductType";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CategoryType from "../../types/CategoryType";

function CreateOrder() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [orderedProducts, setOrderedProducts] = useState<ProductType[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);

  const navigate = useNavigate();

  async function loadCategories() {
    try {
      const res = await axios.get("http://localhost:8080/categories");
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function loadProducts() {
    try {
      const res = await axios.get("http://localhost:8080/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function saveOrder() {
    var productIds: any = [];

    orderedProducts.map(function (product) {
      productIds.push(product.productId);
    });

    try {
      await axios.post("http://localhost:8080/orders", {
        productIds: productIds,
      });
      navigate("/orders");
    } catch (error) {
      console.log(error);
    }
  }

  //   function filterProducts(category: CategoryType) {
  //     setFilteredProducts([]);
  //     products.map(function (product) {
  //       if (product.category.catId === category.catId) {
  //         const updatedfilteredProducts = [...filteredProducts, product];
  //         setFilteredProducts(updatedfilteredProducts);
  //       }
  //     });
  //   }

  function filterProducts(category: CategoryType) {
    // Clear the filtered products array first
    setFilteredProducts([]);

    // Filter the products that match the selected category
    const updatedFilteredProducts = products.filter(
      (product) => product.category.catId === category.catId
    );

    // Update the state with the filtered products
    setFilteredProducts(updatedFilteredProducts);
  }

  function addProductToOrder(product: ProductType) {
    const updatedOrder = [...orderedProducts, product];
    setOrderedProducts(updatedOrder);
    console.log(orderedProducts);
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
    loadProducts();
    loadCategories();
  }, []);

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
    </div>
  );
}

export default CreateOrder;
