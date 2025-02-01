import { useState } from "react";
import { SearchFormProps } from "./types";

function SearchForm({ setSearchTerm }: SearchFormProps) {
  const [searchValue, setSearchValue] = useState<string>("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value;
    setSearchValue(newValue);
    setSearchTerm(newValue);
  }

  return (
    <section className="bg-[white] flex justify-center">
      <form>
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
