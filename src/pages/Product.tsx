import { useEffect, useState } from "react";
import ProductType from "../types/ProductType";
import axios from "axios";
import CategoryType from "../types/CategoryType";

function Product() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const [editingProduct, setEditingProduct] = useState<ProductType | null>(
    null
  );

  const [productName, setProductName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [qty, setQty] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [categoryId, setCategoryId] = useState<number>(0);

  useEffect(function () {
    loadProducts();
    loadCategories();
  }, []);

  function handleProductName(event: any) {
    setProductName(event.target.value);
  }
  function handleDescription(event: any) {
    setDescription(event.target.value);
  }
  function handleQty(event: any) {
    setQty(event.target.value);
  }
  function handlePrice(event: any) {
    setPrice(event.target.value);
  }
  function handleCategoryId(event: any) {
    setCategoryId(event.target.value);
  }
  function editProduct(product: ProductType) {
    setEditingProduct(product);
    setProductName(product.productName);
    setDescription(product.description);
    setQty(product.qty);
    setPrice(product.price);
    setCategoryId(product.category.catId);
  }

  async function loadProducts() {
    const res = await axios.get("http://localhost:8080/products");
    setProducts(res.data);
  }
  async function loadCategories() {
    const res = await axios.get("http://localhost:8080/categories");
    setCategories(res.data);
  }

  async function handleSubmit() {
    const data = {
      productName: productName,
      description: description,
      qty: qty,
      price: price,
      categoryId: categoryId,
    };
    try {
      const res = await axios.post("http://localhost:8080/products", data);
      console.log(res);
      loadProducts();
      setProductName("");
      setDescription("");
      setQty(null);
      setPrice(null);
      setCategoryId(0);
    } catch (error: any) {
      console.log(error);
    }
  }
  async function updateProduct() {
    const data = {
      productName: productName,
      description: description,
      qty: qty,
      price: price,
      categoryId: categoryId,
    };
    try {
      const res = await axios.put(
        "http://localhost:8080/products/" + editingProduct?.productId,
        data
      );
      loadProducts();
      setEditingProduct(null);
      setProductName("");
      setDescription("");
      setQty(null);
      setPrice(null);
      setCategoryId(0);
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteProduct(productId: number) {
    try {
      const res = await axios.delete(
        "http://localhost:8080/products/" + productId
      );
      loadProducts();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mx-auto py-5">
      <h1 className="text-3xl font-bold">Product</h1>

      <div className="table w-11/12 mx-auto border-separate border-spacing-0 border-none text-left">
        <thead className="bg-slate-200">
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(function (product: ProductType) {
            return (
              <tr>
                <td>{product.productId}</td>
                <td>{product.productName}</td>
                <td>{product.description}</td>
                <td>{product.qty}</td>
                <td>{product.price}</td>
                <td>{product.category.catName}</td>
                <td>
                  <button
                    onClick={() => editProduct(product)}
                    className="bg-cyan-500 text-white px-4 py-3 rounded-md hover:bg-cyan-700 mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProduct(product.productId)}
                    className="bg-red-600 text-white px-4 py-3 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </div>
      <div className="border border-slate-200 py-3 px-4 rounded-md w-11/12 mx-auto mt-6 bg-slate-50">
        <form>
          <div>
            <input
              className="py-3 px-4 text-sm w-full rounded-md border border-slate-200 mb-3"
              type="text"
              placeholder="Product Name"
              required
              value={productName}
              onChange={handleProductName}
            />
            <input
              className="py-3 px-4 text-sm w-full rounded-md border border-slate-200 mb-3"
              type="text"
              placeholder="Description"
              required
              value={description}
              onChange={handleDescription}
            />
            <input
              className="py-3 px-4 text-sm w-full rounded-md border border-slate-200 mb-3"
              type="number"
              placeholder="Quantity"
              required
              value={qty !== null ? qty : ""}
              onChange={handleQty}
            />
            <input
              className="py-3 px-4 text-sm w-full rounded-md border border-slate-200 mb-3"
              type="number"
              placeholder="Product Price"
              required
              value={price !== null ? price : ""}
              onChange={handlePrice}
            />
            <select
              className="py-3 px-4 text-sm w-full rounded-md border border-slate-200 mb-3"
              onChange={handleCategoryId}
              value={categoryId}
              required
            >
              <option value="">Please select a Category</option>
              {categories.map(function (category: CategoryType) {
                return (
                  <option value={category.catId}>{category.catName}</option>
                );
              })}
            </select>
          </div>
          {editingProduct ? (
            <button
              type="button"
              className="bg-cyan-500 text-white px-4 py-3 rounded-md hover:bg-cyan-700"
              onClick={updateProduct}
            >
              Edit Product
            </button>
          ) : (
            <button
              type="button"
              className="bg-cyan-500 text-white px-4 py-3 rounded-md hover:bg-cyan-700"
              onClick={handleSubmit}
            >
              Create Product
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
export default Product;
