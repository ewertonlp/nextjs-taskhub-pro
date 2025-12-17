import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim() === "") return; 
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="hidden md:block w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="w-full rounded-lg border border-slate-300 dark:border-slate-500 bg-slate-50 dark:bg-slate-700 py-2 pl-10 pr-4 text-slate-700 dark:text-slate-200  focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none placeholder:dark:text-slate-200"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
         <IoSearchOutline size={24} className="text-slate-800 dark:text-slate-200" />
        </div>
      </div>
    </form>
  );
}
