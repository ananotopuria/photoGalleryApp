import { useState } from "react";
import PhotoGallery from "./PhotoGallery";
import SearchForm from "./SearchForm";

function SearchPageComponents() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <main className="bg-[#f3f0ea]">
      <h1 className="text-center p-[2rem] text-2xl xl:text-3xl text-[#dea2ad] font-light ">
        Discover Stunning Visuals
      </h1>
      <SearchForm setSearchTerm={setSearchTerm} />
      <PhotoGallery searchTerm={searchTerm} />
    </main>
  );
}

export default SearchPageComponents;
