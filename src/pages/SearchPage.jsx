import { useState, useMemo } from "react";
import { Search } from "lucide-react";

const categories = [
  { title: "Pop", gradient: "from-red-500 to-yellow-600" },
  { title: "Rock", gradient: "from-orange-500 to-green-600" },
  { title: "Hip Hop", gradient: "from-lime-500 to-emerald-700" },
  { title: "Electronic", gradient: "from-green-500 to-teal-700" },
  { title: "Jazz", gradient: "from-emerald-500 to-blue-700" },
  { title: "Classical", gradient: "from-cyan-500 to-indigo-700" },
  { title: "R&B", gradient: "from-blue-500 to-purple-700" },
  { title: "Country", gradient: "from-indigo-500 to-pink-700" },
  { title: "Indie", gradient: "from-purple-500 to-red-700" },
  { title: "Metal", gradient: "from-pink-500 to-orange-700" },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const filteredCategories = useMemo(() => {
    return categories.filter((cat) =>
      cat.title.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  return (
    <div className="p-4 md:p-8 ">
      <div className="mb-6 md:mb-8  ">
        <h1 className="mb-4 md:mb-6 text-2xl font-bold">Search</h1>

        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

          <input
            type="text"
            placeholder="What do you want to listen to?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-md bg-muted border-0 outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <section>
        <h2 className="mb-4 text-lg font-semibold">
          {query ? "Search Results" : "Browse All"}
        </h2>

        {filteredCategories.length === 0 ? (
          <p className="text-muted-foreground">No results found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {filteredCategories.map((item) => (
              <div
                key={item.title}
                className={`aspect-square rounded-xl p-4 md:p-6 cursor-pointer hover:scale-105 transition-transform bg-linear-to-br ${item.gradient}`}
              >
                <h3 className="text-white font-semibold text-lg">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
