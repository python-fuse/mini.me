import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="search-bar mx-auto self-center hover:border-2 focus-within:border-2 ease-in-out border-tertiary flex w-max items-center bg-accent p-2 text-sm gap-x-2 rounded-md">
      <FaSearch size={20} className="text-gray-500" />
      <input
        type="text"
        placeholder="Search..."
        className="outline-none w- bg-transparent text-gray-500"
      />
    </div>
  );
};
export default SearchBar;
