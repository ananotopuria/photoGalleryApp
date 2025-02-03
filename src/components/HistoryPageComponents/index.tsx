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
    <main className="min-h-screen bg-gradient-to-b from-[#e6e6e6] to-[#FFD8DA] flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl xl:text-4xl text-[#dfa1b7] font-semibold mb-6 drop-shadow-lg">
        Search History
      </h1>

      {history.length > 0 ? (
        <ul className="flex flex-wrap justify-center gap-3 w-full max-w-4xl">
          {history.map((term, index) => (
            <li
              key={index}
              onClick={() => handleKeywordClick(term)}
              className="text-[#dfa1b7] text-sm md:text-base font-medium px-4 py-2 shadow-md cursor-pointer transition-all duration-300 hover:bg-[#dfa1b7] hover:text-white hover:shadow-lg"
            >
              {term}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-lg text-gray-600">No search history found.</p>
      )}

      {selectedQuery && (
        <section className="mt-8 w-full max-w-6xl">
          <h2 className="text-lg md:text-xl text-[#dfa1b7] font-semibold mb-4 text-center">
            Results for: <span className="font-bold">{selectedQuery}</span>
          </h2>
          <PhotoGallery searchTerm={selectedQuery} />
        </section>
      )}
    </main>
  );
}

export default HistoryPageComponents;
