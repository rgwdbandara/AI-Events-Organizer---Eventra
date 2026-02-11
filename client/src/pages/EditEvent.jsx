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
    capacity: "",
    imageUrl: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔹 fetch existing event
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        setForm({
          title: res.data.title,
          description: res.data.description,
          date: res.data.date,
          time: res.data.time,
          location: res.data.location,
          category: res.data.category,
          capacity: res.data.capacity,
          imageUrl: res.data.imageUrl || "",
        });
      } catch (err) {
        setError("Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    if (image) {
      formData.append("image", image);
    }

    try {
      await api.put(`/events/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/my-events");
    } catch (err) {
      setError("Update failed");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400 bg-gray-900">
        Loading event...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen text-white bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-8 bg-gray-800 rounded-lg"
      >
        <h2 className="mb-6 text-3xl font-bold">Edit Event</h2>

        {error && <p className="mb-4 text-red-400">{error}</p>}

        <input
          name="title"
          className="w-full p-3 mb-3 bg-gray-700 rounded"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          className="w-full p-3 mb-3 bg-gray-700 rounded"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          className="w-full p-3 mb-3 bg-gray-700 rounded"
          value={form.date}
          onChange={handleChange}
          required
        />

        <input
          type="time"
          name="time"
          className="w-full p-3 mb-3 bg-gray-700 rounded"
          value={form.time}
          onChange={handleChange}
          required
        />

        <input
          name="location"
          className="w-full p-3 mb-3 bg-gray-700 rounded"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />

        <input
          name="category"
          className="w-full p-3 mb-3 bg-gray-700 rounded"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="capacity"
          min="1"
          className="w-full p-3 mb-3 bg-gray-700 rounded"
          placeholder="Max Seats"
          value={form.capacity}
          onChange={handleChange}
          required
        />

        {/* Existing Image */}
        {form.imageUrl && (
          <img
            src={form.imageUrl}
            alt="Event"
            className="object-cover w-full h-40 mb-3 rounded"
          />
        )}

        {/* Replace Image */}
        <input
          type="file"
          accept="image/*"
          className="w-full p-3 mb-6 bg-gray-700 rounded"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button className="w-full p-3 font-semibold bg-green-500 rounded hover:bg-green-600">
          Update Event
        </button>
      </form>
    </div>
  );
}
