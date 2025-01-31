interface PhotoGalleryProps {
  searchTerm: string;
}

function PhotoGallery({ searchTerm }: PhotoGalleryProps) {
  return (
    <div>
      <h2>Gallery for: {searchTerm}</h2>
    </div>
  );
}

export default PhotoGallery;
