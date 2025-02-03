import { useState } from "react";
import PhotoGallery from "./PhotoGallery";
import SearchForm from "./SearchForm";

function SearchPageComponents() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <main className="bg-[#e6e6e6] min-h-screen flex flex-col items-center py-10">
      <h1 className="text-center text-3xl xl:text-4xl text-[#dea2a0] font-semibold tracking-wide drop-shadow-md">
        Discover Stunning Visuals
      </h1>
      <div className="mt-6 w-full max-w-2xl px-4">
        <SearchForm setSearchTerm={setSearchTerm} />
      </div>
      <div className="mt-8 w-full max-w-6xl px-4">
        <PhotoGallery searchTerm={searchTerm} />
      </div>
    </main>
  );
}

export default SearchPageComponents;
