import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
  const apiUrl = searchTerm
    ? `https://api.unsplash.com/search/photos?client_id=${ACCESS_KEY}&query=${searchTerm}&per_page=20`
    : `https://api.unsplash.com/photos?client_id=${ACCESS_KEY}&order_by=popular&per_page=20`;

  const response = useQuery({
    queryKey: ["images", searchTerm],
    queryFn: async () => {
      const result = await axios.get(apiUrl);
      return result.data;
    },
  });

  if (response.isLoading) {
    return (
      <section>
        <h3 className="text-center">Loading popular images...</h3>
      </section>
    );
  }
  if (response.isError) {
    return (
      <section>
        <h3 className="text-center">There was an error loading images.</h3>
      </section>
    );
  }
  const results = searchTerm ? response.data.results : response.data;
  if (!results || results.length === 0) {
    return (
      <section>
        <h3 className="text-center">No images found for "{searchTerm}".</h3>
      </section>
    );
  }

  return (
    <section className="flex flex-col mb-4 bg-amber-500">
      <h2 className="text-center text-white text-xl font-bold">
        {searchTerm ? `Gallery for: ${searchTerm}` : "Popular Images"}
      </h2>
      <div className="grid grid-cols-3 gap-2 self-center">
        {results.map((item: ImageResult) => (
          <img
            src={item.urls.regular}
            key={item.id}
            className="w-[20rem] p-2 rounded-lg shadow-lg"
            alt={item.alt_description || "Unsplash image"}
          />
        ))}
      </div>
    </section>
  );
}

export default PhotoGallery;
