import { useState } from "react";
import { SearchFormProps } from "./types";

function SearchForm({ setSearchTerm }: SearchFormProps) {
  const [searchValue, setSearchValue] = useState<string>("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!searchValue.trim()) {
      return;
    }
    setSearchTerm(searchValue);
  }

  return (
    <section className="bg-[white] flex justify-center">
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
