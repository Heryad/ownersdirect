'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { useState } from 'react';

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-4 gap-4 h-[500px]">
        {/* Main Large Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-4 md:col-span-2 row-span-2 relative group cursor-pointer overflow-hidden rounded-2xl"
          onClick={() => openLightbox(0)}
        >
          <img
            src={images[0]}
            alt="Property main"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <div className="p-3 bg-white rounded-full">
                <Maximize2 className="w-6 h-6 text-slate-900" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Secondary Images */}
        {images.slice(1, 5).map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
            className="col-span-2 md:col-span-1 relative group cursor-pointer overflow-hidden rounded-2xl"
            onClick={() => openLightbox(index + 1)}
          >
            <img
              src={image}
              alt={`Property ${index + 2}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <div className="p-2 bg-white rounded-full">
                  <Maximize2 className="w-5 h-5 text-slate-900" />
                </div>
              </motion.div>
            </div>
            {/* Show +X more overlay on last image if there are more images */}
            {index === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  +{images.length - 5} more
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 bg-white/10 backdrop-blur-lg rounded-full hover:bg-white/20 transition-all z-10"
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>

            {/* Image Counter */}
            <div className="absolute top-6 left-6 px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full text-white font-semibold">
              {currentIndex + 1} / {images.length}
            </div>

            {/* Previous Button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-6 p-3 bg-white/10 backdrop-blur-lg rounded-full hover:bg-white/20 transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </motion.button>

            {/* Current Image */}
            <motion.img
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              src={images[currentIndex]}
              alt={`Property ${currentIndex + 1}`}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next Button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-6 p-3 bg-white/10 backdrop-blur-lg rounded-full hover:bg-white/20 transition-all"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </motion.button>

            {/* Thumbnail Strip */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto px-4">
              {images.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(index);
                  }}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    currentIndex === index
                      ? 'border-white scale-110'
                      : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageGallery;
