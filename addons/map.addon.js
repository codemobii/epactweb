import { AspectRatio } from "@chakra-ui/react";
import React from "react";
import BoxContainer from "../components/layouts/container.layout";

export default function MapAddon({ link = "" }) {
  return (
    <BoxContainer>
      <AspectRatio ratio={18 / 9} mb="30px">
        <iframe src={link} allowFullScreen="" loading="lazy"></iframe>
      </AspectRatio>
    </BoxContainer>
  );
}
