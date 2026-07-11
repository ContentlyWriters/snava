"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect } from "react";

interface Props {
  images: string[];
  index: number;
  open: boolean;
  onClose: () => void;
  onChange: (index: number) => void;
}

export default function ImageViewer({ images, index, open, onClose, onChange }: Props) {
  useEffect(() => {
    if (!open) return;

    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange((index + 1) % images.length);
      if (e.key === "ArrowLeft") onChange((index - 1 + images.length) % images.length);
    };

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = old;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, index, images.length, onClose, onChange]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#1C0F09]/90 p-6 backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close"
            className="absolute top-6 right-6 rounded-full border border-white/10 bg-white/[0.06] p-2.5 text-white/80 backdrop-blur-md transition hover:border-[#D99A4E]/40 hover:text-white"
          >
            <X size={20} />
          </button>

          {images.length > 1 && (
            <div className="absolute top-7 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs tracking-wide text-white/60 backdrop-blur-md">
              {index + 1} / {images.length}
            </div>
          )}

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onChange((index - 1 + images.length) % images.length);
                }}
                aria-label="Previous image"
                className="absolute left-4 sm:left-6 rounded-full border border-white/10 bg-white/[0.06] p-3 text-white/80 backdrop-blur-md transition hover:border-[#D99A4E]/40 hover:text-white"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onChange((index + 1) % images.length);
                }}
                aria-label="Next image"
                className="absolute right-4 sm:right-6 rounded-full border border-white/10 bg-white/[0.06] p-3 text-white/80 backdrop-blur-md transition hover:border-[#D99A4E]/40 hover:text-white"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          <motion.img
            key={images[index]}
            src={images[index]}
            alt=""
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="max-h-[88vh] max-w-[90vw] rounded-2xl object-contain shadow-[0_40px_120px_rgba(0,0,0,0.6)] ring-1 ring-white/10"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
