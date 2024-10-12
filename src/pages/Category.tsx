import axios from "axios";
import { useEffect, useState } from "react";
import CategoryType from "../types/CategoryType";

function Category() {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const [catName, setCatName] = useState<string>("");
  const [description, setDescription] = useState<String>("");

  useEffect(function () {
    loadCategories();
  }, []);

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
    <div className="container mx-auto py-5">
      <h1 className="text-3xl font-bold mb-5 text-slate-900 ml-3">
        Category Management
      </h1>

      <table className="table-auto mx-auto w-11/12 border border-collapse border-slate-400 ">
        <thead>
          <tr className="bg-cyan-500 text-white">
            <th className="border border-slate-300 p-2">Category Id</th>
            <th className="border border-slate-300 p-2">Category Name</th>
            <th className="border border-slate-300 p-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {categories &&
            categories.map(function (category: CategoryType) {
              return (
                <tr>
                  <td className="border border-slate-300 p-2">
                    {category.catId}
                  </td>
                  <td className="border border-slate-300 p-2">
                    {category.catName}
                  </td>
                  <td className="border border-slate-300 p-2">
                    {category.description}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <div className="border border-slate-200 py-3 px-4 rounded-md w-11/12 mx-auto mt-6 bg-slate-50">
        <form>
          <h2 className="text-slate-600 font-semibold mb-5">Create Category</h2>

          <input
            className="py-3 px-4 text-sm w-full rounded-md border border-slate-200 mb-3"
            type="text"
            placeholder="Category Name"
            required
            onChange={handleCatName}
          />
          <input
            className="py-3 px-4 text-sm w-full rounded-md border border-slate-200 mb-3"
            type="text"
            placeholder="Description"
            onChange={handleDescription}
          />

          <button
            type="button"
            className="bg-cyan-500 text-white px-4 py-3 rounded-md hover:bg-cyan-700"
            onClick={handelSubmit}
          >
            Create Category
          </button>
        </form>
      </div>
    </div>
  );
}

export default Category;
