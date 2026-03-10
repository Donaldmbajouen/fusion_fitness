import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageLightboxProps {
  images: { url: string; title?: string }[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const ImageLightbox = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: ImageLightboxProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        onNavigate(currentIndex - 1);
      }
      if (e.key === "ArrowRight" && currentIndex < images.length - 1) {
        onNavigate(currentIndex + 1);
      }
    },
    [isOpen, currentIndex, images.length, onClose, onNavigate]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-10 text-foreground hover:text-primary hover:bg-primary/10"
        onClick={onClose}
      >
        <X className="w-6 h-6" />
      </Button>

      {/* Navigation - Previous */}
      {currentIndex > 0 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 text-foreground hover:text-primary hover:bg-primary/10 w-10 h-10 md:w-12 md:h-12"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentIndex - 1);
          }}
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
        </Button>
      )}

      {/* Navigation - Next */}
      {currentIndex < images.length - 1 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 text-foreground hover:text-primary hover:bg-primary/10 w-10 h-10 md:w-12 md:h-12"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentIndex + 1);
          }}
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
        </Button>
      )}

      {/* Image Container */}
      <div
        className="max-w-[95vw] max-h-[90vh] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentImage.url}
          alt={currentImage.title || `Image ${currentIndex + 1}`}
          className="max-w-full max-h-[85vh] object-contain"
        />
        
        {/* Image Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background to-transparent">
          <div className="flex items-center justify-between">
            {currentImage.title && (
              <h3 className="font-display text-lg md:text-xl text-foreground">
                {currentImage.title}
              </h3>
            )}
            <span className="font-body text-sm text-muted-foreground">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto py-2 px-4">
        {images.slice(0, 10).map((img, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(idx);
            }}
            className={`w-12 h-12 md:w-16 md:h-16 flex-shrink-0 overflow-hidden border-2 transition-all ${
              idx === currentIndex
                ? "border-primary scale-110"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <img
              src={img.url}
              alt=""
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageLightbox;
