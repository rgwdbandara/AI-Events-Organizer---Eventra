import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function CreateEvent() {
  const navigate = useNavigate();

  /* ================= FORM STATE ================= */
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    capacity: "",
  });

  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  /* ================= AI STATES ================= */
  const [showAI, setShowAI] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= AI GENERATE ================= */
  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) return;

    setAiLoading(true);
    try {
      const res = await api.post(
        "/ai/generate-event",
        { prompt: aiPrompt },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setForm((prev) => ({
        ...prev,
        ...res.data,
      }));

      setShowAI(false);
      setAiPrompt("");
    } catch (err) {
      alert("AI generation failed");
    } finally {
      setAiLoading(false);
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (image) {
      formData.append("image", image);
    }

    try {
      await api.post("/events/create", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      navigate("/events");
    } catch (err) {
      console.error(err);
      setError("Event creation failed. Please fill all required fields.");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-[#0B1B3A] text-white p-10">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Create Event</h1>
          <p className="text-sm text-gray-300">
            Free plan – create your first event
          </p>
        </div>

        <button
          onClick={() => setShowAI(true)}
          className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700"
        >
          ✨ Generate with AI
        </button>
      </div>

      {error && <p className="mb-4 text-red-400">{error}</p>}

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-8 lg:grid-cols-3"
      >
        {/* IMAGE */}
        <div className="bg-[#12244D] rounded-xl h-72 flex items-center justify-center border border-dashed border-blue-400 overflow-hidden">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="object-cover w-full h-full rounded-xl"
            />
          ) : (
            <label className="text-center cursor-pointer">
              <p className="text-sm text-gray-300">
                Click to add cover image
              </p>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
          )}
        </div>

        {/* FIELDS */}
        <div className="space-y-5 lg:col-span-2">
          <input
            name="title"
            placeholder="Event Name"
            className="w-full p-3 rounded bg-[#12244D]"
            value={form.title}
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              name="date"
              className="p-3 bg-[#12244D] rounded"
              value={form.date}
              onChange={handleChange}
              required
            />

            <input
              type="time"
              name="time"
              className="p-3 bg-[#12244D] rounded"
              value={form.time}
              onChange={handleChange}
              required
            />
          </div>

          <select
            name="category"
            className="w-full p-3 bg-[#12244D] rounded"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            <option>Technology</option>
            <option>Business</option>
            <option>Workshop</option>
            <option>Education</option>
            <option>Music</option>
            <option>Sports</option>
          </select>

          <input
            name="location"
            placeholder="Location"
            className="w-full p-3 bg-[#12244D] rounded"
            value={form.location}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            rows="4"
            className="w-full p-3 bg-[#12244D] rounded"
            value={form.description}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="capacity"
            placeholder="Max seats"
            min="1"
            className="w-full p-3 bg-[#12244D] rounded"
            value={form.capacity}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full py-3 font-semibold bg-green-500 rounded hover:bg-green-600"
          >
            Create Event
          </button>
        </div>
      </form>

      {/* ================= AI MODAL ================= */}
      {showAI && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-[#111827] w-full max-w-md rounded-lg p-6">
            <h2 className="mb-2 text-lg font-semibold">
              ✨ AI Event Creator
            </h2>

            <textarea
              rows="3"
              placeholder="e.g. Dancing workshop for beginners in Colombo"
              className="w-full p-3 mb-4 bg-gray-800 rounded"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowAI(false)}
                className="px-4 py-2 bg-gray-600 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleAIGenerate}
                disabled={aiLoading}
                className="px-4 py-2 font-semibold text-black bg-white rounded"
              >
                {aiLoading ? "Generating..." : "Generate"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
