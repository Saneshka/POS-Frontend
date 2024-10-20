import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-cyan-500 flex flex-row">
      <div className="text-white text-lg font-bold ml-3 py-2 flex-1">
        POS Solution
      </div>
      <div className="flex flex-row gap-6 py-2 justify-end mr-4">
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
      </div>
    </div>
  );
}

export default Navbar;
