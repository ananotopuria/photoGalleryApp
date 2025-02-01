import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useInfiniteScroll from "./../../../hooks/useInfiniteScroll";

interface PhotoGalleryProps {
  searchTerm: string;
}

interface ImageResult {
  id: string;
  urls: {
    regular: string;
  };
  alt_description: string;
}

const ACCESS_KEY = import.meta.env.VITE_API_KEY;

function PhotoGallery({ searchTerm }: PhotoGalleryProps) {
  const [page, setPage] = useState(1);
  const [allResults, setAllResults] = useState<ImageResult[]>([]);

  const apiUrl = searchTerm.trim()
    ? `https://api.unsplash.com/search/photos?client_id=${ACCESS_KEY}&query=${searchTerm}&per_page=20&page=${page}`
    : `https://api.unsplash.com/photos?client_id=${ACCESS_KEY}&order_by=popular&per_page=20&page=${page}`;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["images", searchTerm, page],
    queryFn: async () => {
      const result = await axios.get(apiUrl);
      return result.data;
    },
  });

  useEffect(() => {
    if (data) {
      let results: ImageResult[] = [];
      if (searchTerm.trim()) {
        results = data.results;
      } else {
        results = data;
      }
      if (page === 1) {
        setAllResults(results);
      } else {
        setAllResults((prev) => [...prev, ...results]);
      }
    }
  }, [data, searchTerm, page]);

  useEffect(() => {
    setPage(1);
    setAllResults([]);
  }, [searchTerm]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  const infiniteRef = useInfiniteScroll(() => {
    loadMore();
  });

  if (isLoading && page === 1) {
    return (
      <section>
        <h3 className="text-center">Loading images...</h3>
      </section>
    );
  }

  if (isError) {
    return (
      <section>
        <h3 className="text-center">There was an error loading images.</h3>
      </section>
    );
  }

  if (allResults.length === 0) {
    return (
      <section>
        <h3 className="text-center">No images found for "{searchTerm}"</h3>
      </section>
    );
  }

  return (
    <section className="flex flex-col mb-4 bg-amber-500">
      <h2 className="text-center text-white text-xl font-bold">
        {searchTerm.trim() ? `Gallery for: ${searchTerm}` : "Popular Images"}
      </h2>
      <div className="grid grid-cols-3 gap-2 self-center">
        {allResults.map((item: ImageResult) => (
          <img
            key={item.id}
            src={item.urls.regular}
            alt={item.alt_description || "Unsplash image"}
            className="w-[20rem] p-2 rounded-lg shadow-lg"
          />
        ))}
      </div>
      <div ref={infiniteRef} className="h-10 flex justify-center items-center">
        <p>Loading more images...</p>
      </div>
    </section>
  );
}

export default PhotoGallery;
