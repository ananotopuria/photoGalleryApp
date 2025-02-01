import { useState } from "react";
import { SearchFormProps } from "./types";

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
    }
    setSearchValue("");
  }

  return (
    <section className="bg-white flex justify-center">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="text-center w-[20rem]"
          name="search"
          placeholder="Search..."
          value={searchValue}
          onChange={handleChange}
        />
      </form>
    </section>
  );
}

export default SearchForm;
