import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

interface PhotoModalProps {
  photoId: string;
  onClose: () => void;
}

const ACCESS_KEY = import.meta.env.VITE_API_KEY;

function PhotoModal({ photoId, onClose }: PhotoModalProps) {
  const {
    data: details,
    isLoading: loadingDetails,
    isError: errorDetails,
  } = useQuery({
    queryKey: ["photoDetails", photoId],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.unsplash.com/photos/${photoId}?client_id=${ACCESS_KEY}`,
      );
      return res.data;
    },
  });

  const {
    data: stats,
    isLoading: loadingStats,
    isError: errorStats,
  } = useQuery({
    queryKey: ["photoStats", photoId],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.unsplash.com/photos/${photoId}/statistics?client_id=${ACCESS_KEY}`,
      );
      return res.data;
    },
  });

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, []);

  if (loadingDetails || loadingStats) {
    return createPortal(
      <dialog ref={dialogRef} className="rounded p-4">
        <div>Loading...</div>
        <button onClick={onClose}>Close</button>
      </dialog>,
      document.getElementById("modal-root")!,
    );
  }

  if (errorDetails || errorStats) {
    return createPortal(
      <dialog ref={dialogRef} className="rounded p-4">
        <div>Error loading photo details.</div>
        <button onClick={onClose}>Close</button>
      </dialog>,
      document.getElementById("modal-root")!,
    );
  }

  const modalContent = (
    <dialog ref={dialogRef} className="rounded p-4 relative max-w-3xl mx-4">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
      >
        Close
      </button>
      <img
        src={details.urls.full}
        alt={details.alt_description || "Full image"}
        className="w-full h-auto mb-4"
      />
      <div>
        <p>
          <strong>Likes:</strong> {details.likes}
        </p>
        <p>
          <strong>Downloads:</strong> {stats.downloads.total}
        </p>
        <p>
          <strong>Views:</strong> {stats.views.total}
        </p>
      </div>
    </dialog>
  );

  return createPortal(modalContent, document.getElementById("modal-root")!);
}

export default PhotoModal;
