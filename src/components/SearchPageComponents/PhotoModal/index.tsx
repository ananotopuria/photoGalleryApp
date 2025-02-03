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
  const dialogRef = useRef<HTMLDialogElement>(null);

  const {
    data: details,
    isLoading: loadingDetails,
    isError: errorDetails,
  } = useQuery({
    queryKey: ["photoDetails", photoId],
    queryFn: async () => {
      if (!photoId) return null;
      const res = await axios.get(
        `https://api.unsplash.com/photos/${photoId}?client_id=${ACCESS_KEY}`,
      );
      return res.data;
    },
    enabled: !!photoId,
  });

  const {
    data: stats,
    isLoading: loadingStats,
    isError: errorStats,
  } = useQuery({
    queryKey: ["photoStats", photoId],
    queryFn: async () => {
      if (!photoId) return null;
      const res = await axios.get(
        `https://api.unsplash.com/photos/${photoId}/statistics?client_id=${ACCESS_KEY}`,
      );
      return res.data;
    },
    enabled: !!photoId,
  });

  useEffect(() => {
    if (dialogRef.current) {
      console.log("Showing modal...");
      dialogRef.current.showModal();
    }
  }, []);

  const handleClose = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    onClose();
  };

  if (loadingDetails || loadingStats) {
    return createPortal(
      <dialog
        ref={dialogRef}
        className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50"
      >
        <div className="bg-white rounded-lg shadow-2xl p-6 max-w-lg w-full text-center">
          <p className="text-lg font-semibold text-gray-700">Loading...</p>
          <button
            onClick={handleClose}
            className="mt-4 py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
          >
            Close
          </button>
        </div>
      </dialog>,
      document.getElementById("modal-root")!,
    );
  }

  if (errorDetails || errorStats) {
    return createPortal(
      <dialog
        ref={dialogRef}
        className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50"
      >
        <div className="bg-white rounded-lg shadow-2xl p-6 max-w-lg w-full text-center">
          <p className="text-lg text-red-500">Error loading photo details.</p>
          <button
            onClick={handleClose}
            className="mt-4 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Close
          </button>
        </div>
      </dialog>,
      document.getElementById("modal-root")!,
    );
  }

  if (!details || !stats) {
    return null;
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50 w-full h-full mx-auto my-auto"
    >
      <div className="bg-white rounded-lg shadow-2xl p-6 max-w-3xl w-full relative">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-700 hover:text-gray-900 text-lg cursor-pointer"
        >
          ✖
        </button>
        <img
          src={details.urls.full}
          alt={details.alt_description || "Full image"}
          className="rounded-lg w-full max-h-[75vh] object-contain shadow-lg"
        />
        <div className="mt-4 flex flex-col gap-2 text-gray-700 text-lg">
          <p className="flex items-center gap-2">
            <strong>♥️ Likes:</strong> {details.likes}
          </p>
          <p className="flex items-center gap-2">
            <strong>🎯 Downloads:</strong> {stats.downloads.total}
          </p>
          <p className="flex items-center gap-2">
            <strong>🔮 Views:</strong> {stats.views.total}
          </p>
        </div>
      </div>
    </dialog>,
    document.getElementById("modal-root")!,
  );
}

export default PhotoModal;
