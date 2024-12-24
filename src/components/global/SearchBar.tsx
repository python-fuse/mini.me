"use client";

import { FaSearch } from "react-icons/fa";
import { SyntheticEvent, useState } from "react";
import { useSearch } from "../contexts/SearchContext";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!query) return;

    router.push("/dashboard/links/search?q=" + query);
  };
  return (
    <div className="search-bar mx-auto self-center hover:border-2 focus-within:border-2 ease-in-out border-tertiary flex w-max items-center bg-accent p-2 text-sm gap-x-2 rounded-md">
      <FaSearch size={20} className="text-gray-500" />

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="outline-none bg-transparent text-gray-500"
        />
      </form>
    </div>
  );
};
export default SearchBar;
