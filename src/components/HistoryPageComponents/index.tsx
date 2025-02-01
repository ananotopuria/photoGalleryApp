import { useState, useEffect } from "react";
import PhotoGallery from "./../SearchPageComponents/PhotoGallery";

function HistoryPageComponents() {
  const [history, setHistory] = useState<string[]>([]);
  const [selectedQuery, setSelectedQuery] = useState<string>("");
  useEffect(() => {
    const storedHistory = JSON.parse(
      localStorage.getItem("searchHistory") || "[]",
    );
    setHistory(storedHistory);
  }, []);
  const handleKeywordClick = (term: string) => {
    setSelectedQuery(term);
  };

  return (
    <main className="bg-[#f3f0ea] p-4">
      <h1 className="text-center text-2xl xl:text-3xl text-[#dea2ad] font-light mb-4">
        Search History
      </h1>
      <ul className="list-none flex">
        {history.map((term, index) => (
          <li
            key={index}
            onClick={() => handleKeywordClick(term)}
            className="cursor-pointer p-2 hover:bg-gray-200"
          >
            {term}
          </li>
        ))}
      </ul>

      {selectedQuery && (
        <section className="mt-8">
          <PhotoGallery searchTerm={selectedQuery} />
        </section>
      )}
    </main>
  );
}

export default HistoryPageComponents;
