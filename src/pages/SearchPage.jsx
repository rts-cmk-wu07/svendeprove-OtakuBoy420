import { Search } from "lucide-react";
import { useState } from "react";
import ActivityList from "../components/lists/ActivityList";
export default function SearchPage() {
  const [search, setSearch] = useState("");
  return (
    <section className="p-6">
      <h1 className="mb-4 text-xl">Søg</h1>
      <div className="relative mb-8">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          id="search"
          autoComplete="off"
          type="text"
          className="w-full rounded-full bg-[#C4C4C4]/30 py-2 pl-4 text-white shadow-lg focus:outline-none"
        />
        {/* DESIGN ÆNDRING */}
        <label htmlFor="search" className="absolute right-3 top-1/2 -mt-[1px] -translate-y-1/2">
          <Search />
        </label>
      </div>
      <ActivityList search={search} searchable />
    </section>
  );
}
