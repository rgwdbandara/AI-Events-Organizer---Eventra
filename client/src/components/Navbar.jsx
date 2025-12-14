import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white px-6 py-4 border-b border-gray-800">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-400">
          Eventra
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/events">Events</Link>

          {loggedIn ? (
            <>
              <Link to="/create">Create</Link>
              <button
                onClick={logout}
                className="bg-red-500 px-4 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
              <Link to="/explore">Explore</Link>

            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden mt-4 flex flex-col gap-4">
          <Link to="/events">Events</Link>

          {loggedIn ? (
            <>
              <Link to="/create">Create</Link>
              <button onClick={logout} className="text-left text-red-400">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
              <Link to="/explore">Explore</Link>

            </>
          )}
        </div>
      )}
    </nav>
  );
}
