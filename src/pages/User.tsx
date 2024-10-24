import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import UserType from "../types/UserType";

function User() {
  const { isAuthenticated, jwtToken } = useAuth();

  const [users, setUsers] = useState<UserType[]>([]);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  useEffect(
    function () {
      if (isAuthenticated) {
        loadUsers();
      }
    },
    [isAuthenticated]
  );

  function handleUsername(event: any) {
    setUsername(event.target.value);
  }
  function handlePassword(event: any) {
    setPassword(event.target.value);
  }
  async function handelSubmit() {
    const data = {
      username: username,
      password: password,
    };
    try {
      const res = await axios.post("http://localhost:8080/users", data, config);
      loadUsers();
      setUsername("");
      setPassword("");
    } catch (error) {}
  }
  async function loadUsers() {
    const res = await axios.get("http://localhost:8080/users", config);
    setUsers(res.data);
  }
  async function deleteUser(id: number) {
    try {
      const res = await axios.delete(
        "http://localhost:8080/users/" + id,
        config
      );
      loadUsers();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mx-auto">
      <div className="border border-slate-200 py-3 px-4 rounded-md m-3 bg-slate-50">
        <h1 className="text-xl font-bold mb-3">User Management</h1>
        <form>
          <div>
            <input
              className="py-3 px-4 text-sm w-full rounded-md border border-slate-200 mb-3"
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={handleUsername}
            />
            <input
              className="py-3 px-4 text-sm w-full rounded-md border border-slate-200 mb-3"
              type="text"
              placeholder="Password"
              required
              value={password}
              onChange={handlePassword}
            />
          </div>
          <button
            type="button"
            className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-700"
            onClick={handelSubmit}
          >
            Create User
          </button>
        </form>
        <div className="mt-6 overflow-y-auto h-[415px]">
          <table className="table w-full border-separate border-spacing-0 border-none text-left">
            <thead className="bg-cyan-300 sticky top-0">
              <tr>
                <th>User ID</th>
                <th>Username</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(function (user: UserType) {
                return (
                  <tr>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                      >
                        Delete
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
export default User;
