import { useFetcher } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

function Navbar() {
  const fetcher = useFetcher();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch.trim()) {
      const formData = new FormData();
      formData.append("search", debouncedSearch);
      fetcher.submit(formData, { method: "get", action: `/search?q=${debouncedSearch}` });
    }
  }, [debouncedSearch, fetcher]);

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Logo */}
      <div className="flex items-center">
        <img src="/logo.jpg" alt="Logo" className="w-16 h-16 rounded-full mr-4" />
        <h1 className="text-xl font-bold text-gray-800">Bazar Online</h1>
      </div>

      {/* Search Input */}
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          name="search"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64 px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
    </nav>
  );
}

export default Navbar;
