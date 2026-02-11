import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#0b1120] border-b border-white/10 z-50">
      <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🎟️</span>
          <span className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text">
            Eventra
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="items-center hidden gap-6 text-sm font-medium text-gray-300 md:flex">
          <Link to="/" className="hover:text-white">Home</Link>
          <Link to="/explore" className="hover:text-white">Explore</Link>

          {token && (
            <>
              <Link to="/events/create" className="hover:text-white">
                Create Event
              </Link>
              <Link to="/my-tickets" className="hover:text-white">
                My Tickets
              </Link>
              <Link to="/organizer/dashboard" className="hover:text-indigo-400">
                Organizer Dashboard
              </Link>
            </>
          )}
        </div>

        {/* DESKTOP AUTH */}
        <div className="items-center hidden gap-4 md:flex">
          {!token ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm text-gray-300 border border-gray-600 rounded hover:text-white"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 text-sm font-semibold text-black bg-white rounded"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 px-3 py-1 border rounded-full border-white/20">
                <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-purple-600 rounded-full">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <span className="text-sm text-gray-300">
                  {user?.name || "Account"}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-red-400 border rounded border-red-400/40 hover:bg-red-500 hover:text-white"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {isOpen && (
        <div className="md:hidden bg-[#0b1120] border-t border-white/10">

          <div className="flex flex-col px-6 py-4 space-y-4 text-sm text-gray-300">

            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block py-2 hover:text-white"
            >
              Home
            </Link>

            <Link
              to="/explore"
              onClick={() => setIsOpen(false)}
              className="block py-2 hover:text-white"
            >
              Explore
            </Link>

            {token && (
              <>
                <Link
                  to="/events/create"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 hover:text-white"
                >
                  Create Event
                </Link>

                <Link
                  to="/my-tickets"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 hover:text-white"
                >
                  My Tickets
                </Link>

                <Link
                  to="/organizer/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 hover:text-indigo-400"
                >
                  Organizer Dashboard
                </Link>
              </>
            )}

            <div className="pt-4 border-t border-white/10">
              {!token ? (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 text-center border border-gray-600 rounded"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 font-semibold text-center text-black bg-white rounded"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 text-red-400 border rounded border-red-400/40 hover:bg-red-500 hover:text-white"
                >
                  Logout
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </nav>
  );
}
