import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";

function Navbar() {
  const nav = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearchSubmit = () => {
    if (search.trim()) {
      console.log(search);
      nav(`/search?q=${search}`);
    }
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Logo */}
      <div className="flex items-center">
        <img src="/logo.jpg" alt="Logo" className="w-16 h-16 rounded-full mr-4" />
        <h1 className="text-xl font-bold text-gray-800">Bazar Online</h1>
      </div>

      {/* Search Input and Button */}
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          name="search"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64 px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <Button
          variant="default"
          size="sm"
          onClick={handleSearchSubmit}
        >
          Buscar
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;
