import { Image } from "@chakra-ui/image";
import React from "react";

export default function BgIllustration({ isOpac = true }) {
  return (
    <Image
      src="https://static.wixstatic.com/media/3db22c_d17037a7ec4041338cd6841f6d837d4e~mv2.png/v1/fill/w_1145,h_564,al_c,q_90,usm_0.66_1.00_0.01/3db22c_d17037a7ec4041338cd6841f6d837d4e~mv2.webp"
      w="100%"
      h="100%"
      pos="absolute"
      top="0"
      left="0"
      objectFit="cover"
      objectPosition="center"
      opacity={isOpac ? "0.2" : "1"}
    />
  );
}
