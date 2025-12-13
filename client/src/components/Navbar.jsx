import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="flex items-center gap-6 px-6 py-4 text-white bg-black border-b border-gray-800">
      
      {/* Home */}
      <Link to="/" className="text-xl font-bold text-blue-400">
        Eventra
      </Link>

      {/* Events */}
      <Link to="/events" className="hover:text-blue-400">
        Events
      </Link>

      {token ? (
        <>
          <Link to="/create" className="hover:text-blue-400">
            Create Event
          </Link>

          <button
            onClick={handleLogout}
            className="px-4 py-1 ml-auto bg-red-500 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </>
      ) : (
        <div className="flex gap-4 ml-auto">
          <Link to="/login" className="hover:text-blue-400">
            Login
          </Link>
          <Link to="/register" className="hover:text-blue-400">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}
