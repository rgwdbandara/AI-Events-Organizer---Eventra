import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0b1120] border-b border-gray-800">
      <div className="flex items-center justify-between px-8 py-4 mx-auto max-w-7xl">
        
        {/* 🔵 LEFT – LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide text-white"
        >
          Eventra<span className="text-indigo-400">.</span>
        </Link>

        {/* 🟣 CENTER – NAV LINKS */}
        <div className="hidden gap-8 md:flex">
          <Link
            to="/"
            className="text-gray-300 hover:text-white"
          >
            Home
          </Link>

          <Link
            to="/explore"
            className="text-gray-300 hover:text-white"
          >
            Explore
          </Link>

          <Link
            to="/pricing"
            className="text-gray-300 hover:text-white"
          >
            Pricing
          </Link>
        </div>

        {/* 🟢 RIGHT – ACTIONS */}
        <div className="flex items-center gap-4">
          {token ? (
            <>
              <Link
                to="/create"
                className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700"
              >
                + Create Event
              </Link>

              <button
                onClick={handleLogout}
                className="text-sm text-gray-400 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-300 hover:text-white"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 text-sm font-semibold text-black bg-white rounded hover:bg-gray-200"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
