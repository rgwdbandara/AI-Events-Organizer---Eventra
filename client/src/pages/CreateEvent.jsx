import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function CreateEvent() {
  const navigate = useNavigate();

  // ✅ SINGLE FORM STATE
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    imageUrl: "",
    capacity: "",
  });
  const [image, setImage] = useState(null); // ✅ NEW
  const [error, setError] = useState("");

  // ✅ HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("date", form.date);
    formData.append("time", form.time);
    formData.append("location", form.location);
    formData.append("category", form.category);
    formData.append("capacity", form.capacity);
    if (image) formData.append("image", image);

    try {
      await api.post("/events/create", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/events");
    } catch (err) {
      console.error(err);
      setError("Failed to create event");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-white bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-8 bg-gray-800 rounded-lg"
      >
        <h2 className="mb-6 text-3xl font-bold">Create Event</h2>

        {error && <p className="mb-3 text-red-400">{error}</p>}

        <input
          name="title"
          className="w-full p-3 mb-3 bg-gray-700 rounded"
          placeholder="Event Title"
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

        {/* 🖼 IMAGE URL */}
        <input
          name="imageUrl"
          className="w-full p-3 mb-3 bg-gray-700 rounded"
          placeholder="Image URL (optional)"
          value={form.imageUrl}
          onChange={handleChange}
        />

        {/* 📁 IMAGE FILE */}
        <input
          type="file"
          accept="image/*"
          className="w-full p-3 mb-3 bg-gray-700 rounded"
          onChange={(e) => setImage(e.target.files[0])}
        />

        {/* 🪑 CAPACITY */}
        <input
          type="number"
          name="capacity"
          min="1"
          className="w-full p-3 mb-6 bg-gray-700 rounded"
          placeholder="Max Seats"
          value={form.capacity}
          onChange={handleChange}
          required
        />

        <button className="w-full p-3 font-semibold bg-green-500 rounded hover:bg-green-600">
          Create Event
        </button>
      </form>
    </div>
  );
}
