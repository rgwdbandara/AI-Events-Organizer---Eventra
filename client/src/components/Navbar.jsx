import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // 🔑 SINGLE SOURCE OF TRUTH
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="px-6 py-4 text-white bg-black border-b border-gray-800">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-400">
          Eventra
        </Link>

        {/* Desktop */}
        <div className="items-center hidden gap-6 md:flex">
          <Link to="/events">Events</Link>
          <Link to="/explore">Explore</Link>

          {isLoggedIn ? (
            <>
              <Link to="/create">Create</Link>
              <button
                onClick={logout}
                className="px-4 py-1 bg-red-500 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="text-2xl md:hidden"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="flex flex-col gap-4 mt-4 md:hidden">
          <Link to="/events">Events</Link>
          <Link to="/explore">Explore</Link>

          {isLoggedIn ? (
            <>
              <Link to="/create">Create</Link>
              <button
                onClick={logout}
                className="text-left text-red-400"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
