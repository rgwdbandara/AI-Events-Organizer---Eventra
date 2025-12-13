import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="flex gap-6 px-6 py-4 text-white bg-black border-b border-gray-700">
      <Link className="hover:text-green-400" to="/">Events</Link>

      {loggedIn ? (
        <>
          <Link className="hover:text-green-400" to="/create">Create Event</Link>
          <button
            onClick={handleLogout}
            className="px-4 py-1 ml-auto bg-red-500 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link className="ml-auto hover:text-green-400" to="/login">Login</Link>
          <Link className="hover:text-green-400" to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
