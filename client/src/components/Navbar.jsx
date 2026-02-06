import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY) {
        // Scrolling UP - show navbar
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling DOWN - hide navbar (but keep it visible if near top)
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 bg-[#0b1120] border-b border-white/10 px-8 py-4 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        
        {/* LEFT: LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🎟️</span>
          <span className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text">
            Eventra
          </span>
        </Link>

        {/* CENTER: NAV LINKS */}
        <div className="flex items-center gap-6 text-sm font-medium text-gray-300">
          <Link to="/" className="hover:text-white">
            Home
          </Link>

          <Link to="/explore" className="hover:text-white">
            Explore
          </Link>

          {token && (
            <>
              <Link to="/events/create" className="hover:text-white">
                Create Event
              </Link>

              <Link to="/my-tickets" className="hover:text-white">
                My Tickets
              </Link>

              <Link
                to="/organizer/dashboard"
                className="px-3 py-2 text-sm hover:text-indigo-400"
              >
                Organizer Dashboard
              </Link>
            </>
          )}
        </div>

        {/* RIGHT: AUTH ACTIONS */}
        <div className="flex items-center gap-4">
          {!token ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm text-gray-300 border border-gray-600 rounded hover:text-white hover:border-white"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 text-sm font-semibold text-black bg-white rounded hover:bg-gray-200"
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
      </div>
    </nav>
  );
}
