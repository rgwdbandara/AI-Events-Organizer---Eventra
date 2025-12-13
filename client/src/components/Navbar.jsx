import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex gap-6 px-6 py-4 text-white bg-black border-b border-gray-700">
      <Link className="hover:text-green-400" to="/">Events</Link>
      <Link className="hover:text-green-400" to="/create">Create Event</Link>
      <Link className="hover:text-green-400" to="/login">Login</Link>
      <Link className="hover:text-green-400" to="/register">Register</Link>
    </nav>
  );
}
