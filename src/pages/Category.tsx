import axios from "axios";
import { useState } from "react";
import CategoryType from "../types/CategoryType";

function Category() {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const [catName, setCatName] = useState<string>("");
  const [description, setDescription] = useState<String>("");

  async function loadCategories() {
    const response = await axios.get("http://localhost:8080/categories");
    setCategories(response.data);
  }
  async function handelSubmit() {
    const data = {
      catName: catName,
      description: description,
    };
    const response = await axios.post("http://localhost:8080/categories", data);
    console.log(response);
    loadCategories();
  }

  function handleCatName(event: any) {
    setCatName(event.target.value);
  }
  function handleDescription(event: any) {
    setDescription(event.target.value);
  }

  return (
    <div>
      <h1>Category</h1>
      <button onClick={loadCategories}>Load Categories</button>

      {categories &&
        categories.map(function (category: CategoryType) {
          return <div>{category.catName}</div>;
        })}

      <h2>Create Category</h2>
      <form>
        <label>Category Name : </label>
        <input type="text" required onChange={handleCatName} />
        <label>Description : </label>
        <input type="text" onChange={handleDescription} />

        <button type="button" onClick={handelSubmit}>
          Create Category
        </button>
      </form>
    </div>
  );
}

export default Category;
