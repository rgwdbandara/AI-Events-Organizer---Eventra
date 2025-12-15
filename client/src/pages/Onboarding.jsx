import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const INTERESTS = [
  "Technology",
  "Business",
  "AI",
  "Education",
  "Design",
  "Startups",
];

export default function Onboarding() {
  const [city, setCity] = useState("");
  const [interests, setInterests] = useState([]);
  const navigate = useNavigate();

  const toggleInterest = (item) => {
    setInterests((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  const submit = async () => {
    await api.post(
      "/users/onboarding",
      { city, interests },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    navigate("/events");
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-white bg-gray-900">
      <div className="w-full max-w-lg p-8 bg-gray-800 rounded-lg">
        <h1 className="mb-6 text-3xl font-bold">
          Tell us about you
        </h1>

        {/* City */}
        <input
          placeholder="Your city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-3 mb-6 bg-gray-700 rounded"
        />

        {/* Interests */}
        <p className="mb-3 text-gray-300">Your interests</p>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {INTERESTS.map((i) => (
            <button
              key={i}
              onClick={() => toggleInterest(i)}
              className={`p-2 rounded ${
                interests.includes(i)
                  ? "bg-blue-500"
                  : "bg-gray-700"
              }`}
            >
              {i}
            </button>
          ))}
        </div>

        <button
          onClick={submit}
          className="w-full p-3 bg-green-500 rounded hover:bg-green-600"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
