"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, Flex, Box, Text, IconButton, Button } from "@radix-ui/themes";
import { Cross2Icon, ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

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

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

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

  if (!currentImage) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Content
        size="4"
        maxWidth="900px"
        maxHeight="90vh"
        onKeyDown={handleKeyDown}
        style={{ overflow: "auto" }}
      >
        <Flex direction="column" gap="4" style={{ height: "100%" }}>
          <Flex justify="between" align="center" style={{ flexShrink: 0 }}>
            <Dialog.Title size="5">
              {currentImage.alt}
            </Dialog.Title>
            <Dialog.Close>
              <IconButton variant="ghost" color="gray">
                <Cross2Icon />
              </IconButton>
            </Dialog.Close>
          </Flex>

          {currentImage.caption && (
            <Dialog.Description size="2" style={{ flexShrink: 0 }}>
              {currentImage.caption}
            </Dialog.Description>
          )}

          <Box style={{ position: "relative", width: "100%", height: "50vh", minHeight: "300px", maxHeight: "600px", flexShrink: 0 }}>
            <Image
              src={currentImage.imageUrl}
              alt={currentImage.alt}
              fill
              style={{ objectFit: "contain" }}
              unoptimized
              priority
            />
          </Box>

          {images.length > 1 && (
            <Flex direction="column" gap="3" style={{ flexShrink: 0 }}>
              <Flex gap="2" justify="between" align="center">
                <Button variant="soft" onClick={handlePrevious}>
                  <ChevronLeftIcon />
                  Previous
                </Button>
                <Text size="2" color="gray">
                  {currentIndex + 1} / {images.length}
                </Text>
                <Button onClick={handleNext}>
                  Next
                  <ChevronRightIcon />
                </Button>
              </Flex>

              <Flex gap="2" wrap="wrap" justify="center" style={{ maxHeight: "140px", overflowY: "auto" }}>
                {images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setCurrentIndex(idx)}
                    style={{
                      position: "relative",
                      width: "64px",
                      height: "64px",
                      border: idx === currentIndex ? "2px solid var(--accent-9)" : "2px solid var(--gray-6)",
                      borderRadius: "var(--radius-2)",
                      overflow: "hidden",
                      cursor: "pointer",
                      opacity: idx === currentIndex ? 1 : 0.6,
                      transition: "all 0.2s",
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => {
                      if (idx !== currentIndex) {
                        e.currentTarget.style.opacity = "1";
                        e.currentTarget.style.borderColor = "var(--gray-8)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (idx !== currentIndex) {
                        e.currentTarget.style.opacity = "0.6";
                        e.currentTarget.style.borderColor = "var(--gray-6)";
                      }
                    }}
                  >
                    <Image
                      src={img.imageUrl}
                      alt={img.alt}
                      fill
                      style={{ objectFit: "cover" }}
                      unoptimized
                    />
                  </button>
                ))}
              </Flex>
            </Flex>
          )}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default GalleryImageDialog;
