import { Image } from "@chakra-ui/react";
import { getStrapiMedia } from "../lib/media";

const GetImage = ({ image }) => {
  const imageUrl = getStrapiMedia(image);

  return (
    <Image
      src={imageUrl}
      alt={image.alternativeText || image.name}
      objectFit="cover"
      width="100%"
      height="100%"
    />
  );
};

export default GetImage;
