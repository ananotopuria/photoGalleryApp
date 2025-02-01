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

const url = `https://api.unsplash.com/search/photos?client_id=${import.meta.env.VITE_API_KEY}&query`;

function PhotoGallery({ searchTerm }: PhotoGalleryProps) {
  const response = useQuery({
    queryKey: ["images", searchTerm],
    queryFn: async () => {
      const result = await axios.get(`${url}&query=${searchTerm}`);
      return result.data;
    },
  });
  console.log(response);
  if (response.isLoading) {
    return (
      <section>
        <h3 className="text-center">Loading...</h3>
      </section>
    );
  }
  if (response.isError) {
    return (
      <section>
        <h3 className="text-center">There was an error...</h3>
      </section>
    );
  }
  const results = response.data.results;
  if (results.length < 1) {
    return (
      <section>
        <h3 className="text-center">There was an error...</h3>
      </section>
    );
  }
  return (
    <section className="flex flex-col mb-4 bg-amber-500">
      <h2>Gallery for: {searchTerm}</h2>
      <div className="grid grid-cols-3 gap-2 self-center">
        {results.map((item: ImageResult) => {
          const imageUrl: string | undefined = item?.urls?.regular;
          return (
            <img
              src={imageUrl}
              key={item.id}
              className="w-[20rem] p-2"
              alt={item.alt_description}
            />
          );
        })}
      </div>
    </section>
  );
}

export default PhotoGallery;
