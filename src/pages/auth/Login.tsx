import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth();

  const navigate = useNavigate();

  const [username, setUsername] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [error, setError] = useState<String>("");

  async function submit(event: any) {
    event?.preventDefault();
    if (username == "" || password == "") {
      setError("Username and Password are Required");
    }

    const data = {
      username: username,
      password: password,
    };
    try {
      const res = await axios.post("http://localhost:8080/auth/login", data);
      login(res.data);
      navigate("/");
    } catch (error) {
      setError("There was an error login in  ");
    }
  }
  return (
    <div className="p-10">
      <div className="max-w-[600px] p-5 shadow rounded-md mx-auto">
        <div className=" text-center mb-5">
          <h1 className="text-2xl font-semibold">Login</h1>
          <form onSubmit={submit}>
            <div className=" mb-4">
              <label className="block mb-1 text-left">Username</label>
              <input
                onChange={function (event) {
                  setUsername(event.target.value);
                  setError("");
                }}
                type="text"
                className="block w-full p-2 border border-gray-200 rounded-md"
                placeholder="Enter your Username"
              />
            </div>
            <div className=" mb-4">
              <label className="block mb-1 text-left">Password</label>
              <input
                onChange={function (event) {
                  setPassword(event.target.value);
                  setError("");
                }}
                type="text"
                className="block w-full p-2 border border-gray-200 rounded-md"
                placeholder="Enter your Password"
              />
            </div>
            {error && <div className="text-sm text-red-500">{error}</div>}
            <div>
              <button
                type="submit"
                className="bg-cyan-500 text-white px-4 py-2 rounded-md w-full hover:bg-cyan-700"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
