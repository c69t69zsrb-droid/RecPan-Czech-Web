import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { downloadImage } from "@/lib/downloadImage";

export default function GalleryLightbox({ images = [], index = null, alt = "", onClose, onNavigate, downloadLabel = "Download", downloadName = "photo" }) {
  const open = index !== null && index >= 0;

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNavigate((index + 1) % images.length);
      else if (e.key === "ArrowLeft") onNavigate((index - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, index, images.length, onClose, onNavigate]);

  if (!open) return null;

  const prev = () => onNavigate((index - 1 + images.length) % images.length);
  const next = () => onNavigate((index + 1) % images.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[4000] bg-obsidian/95 flex items-center justify-center p-4 md:p-10">

      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-5 right-5 md:top-8 md:right-8 text-white/60 hover:text-white transition-colors">
        <X size={24} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        aria-label="Previous"
        className="absolute left-2 md:left-8 z-10 p-2 text-white/60 hover:text-white transition-colors">
        <ChevronLeft size={34} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        aria-label="Next"
        className="absolute right-2 md:right-8 z-10 p-2 text-white/60 hover:text-white transition-colors">
        <ChevronRight size={34} />
      </button>

      <motion.img
        key={index}
        src={images[index]}
        alt={alt}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-full max-h-full object-contain rounded-lg select-none" />

      <p className="absolute bottom-5 md:bottom-8 font-heading text-[11px] uppercase tracking-[0.2em] text-white/50">
        {index + 1} / {images.length}
      </p>

      <button
        onClick={(e) => { e.stopPropagation(); downloadImage(images[index], `${downloadName}-${index + 1}.jpg`); }}
        aria-label={downloadLabel}
        className="absolute bottom-4 md:bottom-7 right-4 md:right-8 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 font-heading text-[10px] font-medium uppercase tracking-[0.15em] text-white hover:bg-brand-green transition-colors">
        <Download size={14} />
        {downloadLabel}
      </button>
    </motion.div>
  );
}