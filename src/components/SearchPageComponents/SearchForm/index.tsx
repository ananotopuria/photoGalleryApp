import { useState } from "react";
import { SearchFormProps } from "./types";
import toast, { Toaster } from "react-hot-toast";

function SearchForm({ setSearchTerm }: SearchFormProps) {
  const [searchValue, setSearchValue] = useState<string>("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value;
    setSearchValue(newValue);
    setSearchTerm(newValue);
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (searchValue.trim() === "") return;

    const storedHistory = JSON.parse(
      localStorage.getItem("searchHistory") || "[]",
    );
    if (!storedHistory.includes(searchValue)) {
      storedHistory.push(searchValue);
      localStorage.setItem("searchHistory", JSON.stringify(storedHistory));
      toast.success(`"${searchValue}" added to search history!`, {
        position: "top-center",
        duration: 2000,
      });
    } else {
      toast.error(`"${searchValue}" is already in history!`, {
        position: "top-center",
        duration: 2000,
      });
    }
    setSearchValue("");
  }

  return (
    <section className="flex justify-center items-center py-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col items-center"
      >
        <div className="relative w-full">
          <input
            type="text"
            className="w-full p-3 text-gray-800 text-lg rounded-lg border border-gray-300 shadow-md outline-none focus:border-[#29353c] focus:ring focus:ring-[#aac7d8] transition"
            name="search"
            placeholder="Search for something..."
            value={searchValue}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 transition"
          >
            🔍
          </button>
        </div>
        <p className="mt-1 text-[0.5rem] text-gray-400">
          ⏎ Press <span className="font-semibold">Enter</span> to save in
          history.
        </p>
      </form>
      <Toaster />
    </section>
  );
}

export default SearchForm;
