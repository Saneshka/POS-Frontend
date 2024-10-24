import axios from "axios";
import { useEffect, useState } from "react";
import CategoryType from "../types/CategoryType";
import { useAuth } from "../context/AuthContext";

function Category() {
  const { isAuthenticated, jwtToken } = useAuth();
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const [catName, setCatName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [editingCategory, setEditingCategory] = useState<CategoryType | null>(
    null
  );

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  useEffect(
    function () {
      if (isAuthenticated) {
        loadCategories();
      }
    },
    [isAuthenticated]
  );

  async function loadCategories() {
    const response = await axios.get(
      "http://localhost:8080/categories",
      config
    );
    setCategories(response.data);
  }
  async function handelSubmit() {
    const data = {
      catName: catName,
      description: description,
    };
    const response = await axios.post(
      "http://localhost:8080/categories",
      data,
      config
    );
    console.log(response);
    loadCategories();
  }
  async function updateCategory() {
    const data = {
      catName: catName,
      description: description,
    };
    try {
      const res = await axios.put(
        "http://localhost:8080/categories/" + editingCategory?.catId,
        data,
        config
      );
      loadCategories();
      setEditingCategory(null);
      setCatName("");
      setDescription("");
    } catch (error) {
      console.log(error);
    }
  }

  function handleCatName(event: any) {
    setCatName(event.target.value);
  }
  function handleDescription(event: any) {
    setDescription(event.target.value);
  }
  function editCategory(category: CategoryType) {
    setEditingCategory(category);
    setCatName(category.catName);
    setDescription(category.description);
  }

  return (
    <div className="container mx-auto">
      <div className="border border-slate-200 py-3 px-4 rounded-md m-3 bg-slate-50">
        <h1 className="text-xl font-bold mb-3">Category Management</h1>
        <form>
          <input
            className="py-3 px-4 text-sm w-full rounded-md border border-slate-200 mb-3"
            type="text"
            placeholder="Category Name"
            required
            value={catName}
            onChange={handleCatName}
          />
          <input
            className="py-3 px-4 text-sm w-full rounded-md border border-slate-200 mb-3"
            type="text"
            placeholder="Description"
            value={description}
            onChange={handleDescription}
          />
          {editingCategory ? (
            <button
              type="button"
              className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-700"
              onClick={updateCategory}
            >
              Edit Category
            </button>
          ) : (
            <button
              type="button"
              className="bg-cyan-500 text-white px-4 py-3 rounded-md hover:bg-cyan-700"
              onClick={handelSubmit}
            >
              Create Category
            </button>
          )}
        </form>
        <div className="mt-6 overflow-y-auto h-[405px]">
          <table className="table w-full border-separate border-spacing-0 border-none text-left ">
            <thead className="bg-cyan-300 stick top-0">
              <tr>
                <th>Category Id</th>
                <th>Category Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories &&
                categories.map(function (category: CategoryType) {
                  return (
                    <tr>
                      <td>{category.catId}</td>
                      <td>{category.catName}</td>
                      <td>{category.description}</td>
                      <td>
                        <button
                          onClick={() => editCategory(category)}
                          className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-700 mr-2"
                        >
                          Edit
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

export default Category;
