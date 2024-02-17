import React from "react";
import { Box, Image, Flex, IconButton, Img } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel = (props: ImageCarouselProps) => {
  const { images } = props;
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Box>
      <Flex align="center" justify="center">
        <IconButton
          aria-label="Previous Image"
          icon={<ChevronLeftIcon />}
          onClick={handlePrevImage}
        />
        <Img
          maxH="600px"
          maxW="500px"
          src={images[currentImageIndex]}
          alt="Carousel Image"
        />
        <IconButton
          aria-label="Next Image"
          icon={<ChevronRightIcon />}
          onClick={handleNextImage}
        />
      </Flex>
    </Box>
  );
};

export default ImageCarousel;
