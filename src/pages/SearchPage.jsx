import { Search } from "lucide-react";
import { useState } from "react";
import ActivityList from "../components/lists/ActivityList";
export default function SearchPage() {
  const [search, setSearch] = useState("");
  return (
    <section className="mx-auto max-w-6xl p-6">
      <h1 className="mb-4 text-xl lg:mt-14 lg:text-center">Søg</h1>
      <div className="relative mx-auto mb-8 max-w-lg">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          id="search"
          autoComplete="off"
          type="text"
          className="max-w- w-full rounded-full bg-[#C4C4C4]/30 py-2 pl-4 text-white shadow-lg focus:outline-none"
        />
        <label htmlFor="search" className="absolute right-3 top-1/2 -mt-[1px] -translate-y-1/2">
          <Search />
        </label>
      </div>
      <ActivityList search={search} searchable />
    </section>
  );
}
