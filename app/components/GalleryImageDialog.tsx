"use client";

import React, { useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Box, Flex, Text } from "@radix-ui/themes";

interface GalleryImage {
  id: number;
  imageUrl: string;
  caption?: string;
  alt: string;
}

interface GalleryImageDialogProps {
  images: GalleryImage[];
  initialIndex?: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const GalleryImageDialog: React.FC<GalleryImageDialogProps> = ({
  images,
  initialIndex = 0,
  isOpen,
  onOpenChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const currentImage = images[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      handlePrevious();
    } else if (e.key === "ArrowRight") {
      handleNext();
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 z-50" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[90vh] bg-gray-2 rounded-lg p-6 focus:outline-none"
          onKeyDown={handleKeyDown}
        >
          <Flex direction="column" gap="4" height="100%">
            {/* Close Button */}
            <Flex justify="end">
              <Dialog.Close asChild>
                <button
                  className="text-gray-9 hover:text-gray-12 transition-colors p-2"
                  aria-label="Close dialog"
                >
                  <Cross2Icon width="24" height="24" />
                </button>
              </Dialog.Close>
            </Flex>

            {/* Image Container */}
            <Flex
              justify="center"
              align="center"
              className="flex-1 overflow-hidden"
            >
              {currentImage && currentImage.imageUrl ? (
                <Box className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={currentImage.imageUrl}
                    alt={currentImage.alt}
                    width={800}
                    height={800}
                    unoptimized
                    className="max-w-full max-h-full object-contain"
                    priority
                  />
                </Box>
              ) : (
                <Box className="w-full h-full bg-gray-5 flex items-center justify-center rounded">
                  <Text className="text-gray-9">Image not available</Text>
                </Box>
              )}
            </Flex>

            {/* Caption */}
            {currentImage?.caption && (
              <Box className="bg-gray-3 p-4 rounded">
                <Text size="2" className="text-gray-11">
                  {currentImage.caption}
                </Text>
              </Box>
            )}

            {/* Navigation */}
            {images.length > 1 && (
              <Flex justify="between" align="center" gap="4">
                <button
                  onClick={handlePrevious}
                  className="p-2 hover:bg-gray-4 rounded transition-colors text-gray-9 hover:text-gray-12"
                  aria-label="Previous image"
                >
                  <ChevronLeftIcon width="24" height="24" />
                </button>

                <Text size="1" className="text-gray-9">
                  {currentIndex + 1} / {images.length}
                </Text>

                <button
                  onClick={handleNext}
                  className="p-2 hover:bg-gray-4 rounded transition-colors text-gray-9 hover:text-gray-12"
                  aria-label="Next image"
                >
                  <ChevronRightIcon width="24" height="24" />
                </button>
              </Flex>
            )}
          </Flex>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default GalleryImageDialog;
