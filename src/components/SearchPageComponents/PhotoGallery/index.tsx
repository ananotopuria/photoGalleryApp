import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useInfiniteScroll from "./../../../hooks/useInfiniteScroll";
import PhotoModal from "./../PhotoModal";

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
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);

  const apiUrl = searchTerm.trim()
    ? `https://api.unsplash.com/search/photos?client_id=${ACCESS_KEY}&query=${searchTerm}&per_page=20&page=${page}`
    : `https://api.unsplash.com/photos?client_id=${ACCESS_KEY}&order_by=popular&per_page=20&page=${page}`;

  const { data, isFetching } = useQuery({
    queryKey: ["images", searchTerm, page],
    queryFn: async () => {
      console.log("Fetching images...");
      const response = await axios.get(apiUrl);
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: true,
  });

  useEffect(() => {
    if (!data) return;

    const results: ImageResult[] = searchTerm.trim()
      ? data.results || []
      : Array.isArray(data)
        ? data
        : [];

    setAllResults((prev) => {
      if (page === 1) return results;
      return [
        ...prev,
        ...results.filter(
          (item) => !prev.some((prevItem) => prevItem.id === item.id),
        ),
      ];
    });
  }, [data, searchTerm, page]);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      setPage(1);
      setAllResults([]);
    }
  }, [searchTerm]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  const { isFetching: isFetchingMore } = useInfiniteScroll(loadMore);

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <section className="flex flex-col items-center py-6 bg-gradient-to-b from-[#29353c] to-[#aac7d8] min-h-screen">
      <h2 className="text-center text-white text-3xl font-extrabold mb-6 drop-shadow-lg">
        {searchTerm.trim() ? `Gallery for: ${searchTerm}` : "Popular Images"}
      </h2>
      {isFetching && (
        <p className="text-white font-semibold text-lg animate-pulse mt-4">
          Loading images...
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 px-6 max-w-6xl">
        {allResults.map((item) => (
          <div key={item.id} className="relative group">
            <img
              src={item.urls.regular}
              alt={item.alt_description || "Unsplash image"}
              className="w-full h-52 object-cover shadow-md transition-transform transform group-hover:scale-105 group-hover:shadow-cyan-400/40"
              onClick={() => {
                console.log("Clicked Photo ID:", item.id);
                setSelectedPhotoId(item.id);
              }}
            />

            <div className="absolute inset-0 bg-[#e1939342] bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer pointer-events-none">
              <p className="text-white text-sm font-semibold">Click to View</p>
            </div>
          </div>
        ))}
      </div>
      {isFetchingMore && (
        <p className="text-[#44576d] font-semibold animate-pulse mt-6">
          Loading more images...
        </p>
      )}

      {selectedPhotoId && (
        <PhotoModal
          photoId={selectedPhotoId}
          onClose={() => setSelectedPhotoId(null)}
        />
      )}
    </section>
  );
}

export default PhotoGallery;
