import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/events/${id}`)
      .then(res => setForm(res.data))
      .catch(() => setError("Failed to load event"));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/events/${id}`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      navigate(`/events/${id}`);
    } catch (err) {
      setError("Update failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-white bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-8 bg-gray-800 rounded-lg"
      >
        <h2 className="mb-6 text-3xl font-bold">Edit Event</h2>

        {error && <p className="mb-3 text-red-400">{error}</p>}

        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder={key}
            className="w-full p-3 mb-3 bg-gray-700 rounded"
            required
          />
        ))}

        <button className="w-full p-3 font-semibold bg-blue-500 rounded hover:bg-blue-600">
          Update Event
        </button>
      </form>
    </div>
  );
}
