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

const url =
  "https://api.unsplash.com/search/photos?client_id=0WwI5ofHM4S-UXcuh92k7LTEf1vdow3HAlKETyblUEA&query=cars";

function PhotoGallery({ searchTerm }: PhotoGalleryProps) {
  const response = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      const result = await axios.get(url);
      return result.data;
    },
  });
  console.log(response);
  if (response.isLoading) {
    return (
      <section>
        <h3>Loading...</h3>
      </section>
    );
  }
  if (response.isError) {
    return (
      <section>
        <h3>There was an error...</h3>
      </section>
    );
  }
  const results = response.data.results;
  if (results.length < 1) {
    return (
      <section>
        <h3>There was an error...</h3>
      </section>
    );
  }
  return (
    <section>
      <h2>Gallery for: {searchTerm}</h2>
      {results.map((item: ImageResult) => {
        const imageUrl: string | undefined = item?.urls?.regular;
        return <img src={imageUrl} key={item.id} alt={item.alt_description} />;
      })}
    </section>
  );
}

export default PhotoGallery;
