import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex gap-6 px-6 py-4 text-white bg-gray-900">
      <Link to="/">Events</Link>
      <Link to="/create">Create Event</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </nav>
  );
}
