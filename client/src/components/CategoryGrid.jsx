import { Link } from "react-router-dom";

const categories = [
  {
    name: "Technology",
    icon: "💻",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Music",
    icon: "🎵",
    color: "from-pink-500 to-purple-500",
  },
  {
    name: "Sports",
    icon: "🏏",
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Art & Culture",
    icon: "🎨",
    color: "from-yellow-500 to-orange-500",
  },
  {
    name: "Business",
    icon: "💼",
    color: "from-indigo-500 to-blue-500",
  },
  {
    name: "Workshop",
    icon: "🛠️",
    color: "from-red-500 to-pink-500",
  },
];

export default function CategoryGrid() {
  return (
    <div className="mt-20">
      {/* HEADER */}
      <h2 className="mb-8 text-2xl font-bold">
        Browse by Category
      </h2>

      {/* GRID */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={`/explore?category=${cat.name}`}
            className="group"
          >
            <div className="relative p-6 overflow-hidden transition border border-gray-800 rounded-xl bg-[#111827] hover:-translate-y-1">
              {/* Gradient glow */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition bg-gradient-to-br ${cat.color}`}
              />

              <div className="relative z-10 flex items-center gap-4">
                <div className="text-3xl">
                  {cat.icon}
                </div>

                <div>
                  <h3 className="text-lg font-semibold">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    Explore events
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
