import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function CreateEvent() {
  const navigate = useNavigate();

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

  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  // 🔮 AI modal states
  const [showAI, setShowAI] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔮 AI GENERATE (REAL BACKEND)
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) =>
      formData.append(key, value)
    );
    if (image) formData.append("image", image);

    try {
      await api.post("/events/create", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      navigate("/events");
    } catch (err) {
      setError("Event creation failed. Check required fields.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1B3A] text-white p-10">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Create Event</h1>
          <p className="text-sm text-gray-300">
            Free: 0 / 1 events created
          </p>
        </div>

        <button
          onClick={() => setShowAI(true)}
          className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700"
        >
          ✨ Generate with AI
        </button>
      </div>

      {/* MAIN FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-8 lg:grid-cols-3"
      >
        {/* IMAGE */}
        <div className="bg-[#12244D] rounded-xl h-72 flex items-center justify-center border border-dashed border-blue-400 overflow-hidden">
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="object-cover w-full h-full rounded-xl"
            />
          )}
          <label className="text-center cursor-pointer">
            <p className="text-sm text-gray-300">
              Click to add cover image
            </p>
            <input
              type="file"
              accept="image/*"
              className="hidden"
               placeholder="Image URL (optional)"
              onChange={(e) =>
                setImage(e.target.files[0])
              }
            />
          </label>
        </div>

        {/* FIELDS */}
        <div className="space-y-5 lg:col-span-2">
          <input
            name="title"
            placeholder="Event Name"
            className="w-full p-3 rounded bg-[#12244D]"
            value={form.title}
            onChange={handleChange}
          />

          <div className="grid grid-cols-2 gap-4">
           <input
              type="date"
              name="date"
              className="p-3 bg-[#12244D] rounded"
              value={form.date}
              onChange={handleChange}
          />
          
           <input
           type="time"
           name="time"
           className="p-3 bg-[#12244D] rounded"
           value={form.time}
           onChange={handleChange}
          />
          </div>

          

          <select
            name="category"
            className="w-full p-3 bg-[#12244D] rounded"
            value={form.category}
            onChange={handleChange}
          >
            <option value="">Select category</option>
            <option>Technology</option>
            <option>Business</option>
            <option>Workshop</option>
            <option>Education</option>
          </select>

          <input
            name="location"
            placeholder="Location"
            className="w-full p-3 bg-[#12244D] rounded"
            value={form.location}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            rows="4"
            className="w-full p-3 bg-[#12244D] rounded"
            value={form.description}
            onChange={handleChange}
          />

          <input
            type="number"
            name="capacity"
            placeholder="Max seats"
            className="w-full p-3 bg-[#12244D] rounded"
            value={form.capacity}
            onChange={handleChange}
          />

          <button className="w-full py-3 font-semibold bg-green-500 rounded hover:bg-green-600">
            Create Event
          </button>
        </div>
      </form>

      {/* 🔮 AI MODAL */}
      {showAI && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-[#111827] w-full max-w-md rounded-lg p-6">
            <h2 className="flex items-center gap-2 mb-2 text-lg font-semibold">
              ✨ AI Event Creator
            </h2>
            <p className="mb-4 text-sm text-gray-400">
              Describe your event idea and let AI
              create details for you
            </p>

            <textarea
              rows="3"
              placeholder="e.g. Dancing workshop for beginners in Colombo"
              className="w-full p-3 mb-4 bg-gray-800 rounded"
              value={aiPrompt}
              onChange={(e) =>
                setAiPrompt(e.target.value)
              }
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
                className="px-4 py-2 font-semibold text-black bg-white rounded"
                disabled={aiLoading}
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
