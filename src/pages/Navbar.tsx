import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { logout, isAuthenticated } = useAuth();
  return (
    <div className="bg-cyan-500 flex mx-auto justify-between items-center">
      <div className="text-white text-lg font-bold ml-3 py-2 flex-1">
        POS Solution
      </div>
      {isAuthenticated && (
        <div className="flex flex-row py-2 justify-end mr-4 gap-6">
          <Link
            className="text-white text-base font-bold hover:text-black cursor-pointer"
            to="/"
          >
            Home
          </Link>
          <Link
            className="text-white text-base font-bold hover:text-black cursor-pointer"
            to="/categories"
          >
            Category
          </Link>
          <Link
            className="text-white text-base font-bold hover:text-black cursor-pointer"
            to="/products"
          >
            Products
          </Link>
          <Link
            className="text-white text-base font-bold hover:text-black cursor-pointer"
            to="/stocks"
          >
            Stock
          </Link>
          <Link
            className="text-white text-base font-bold hover:text-black cursor-pointer"
            to="/users"
          >
            User
          </Link>
          <Link
            className="text-white text-base font-bold hover:text-black cursor-pointer"
            to="/orders"
          >
            Orders
          </Link>
          <Link
            className="text-white text-base font-bold hover:text-black cursor-pointer"
            to="/orders/create"
          >
            POS
          </Link>
          <button
            className="text-white text-base font-bold hover:text-black cursor-pointer"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
