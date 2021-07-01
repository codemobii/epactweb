import { AspectRatio } from "@chakra-ui/react";
import React from "react";
import BoxContainer from "../components/layouts/container.layout";

export default function MapAddon() {
  return (
    <BoxContainer>
      <AspectRatio ratio={18 / 9} mb="30px">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.2140441932493!2d3.3227936147728214!3d6.494561725300914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8eba38954d7f%3A0xe114cb14c1355b86!2s72%20Tapa%20St%2C%20Lawanson%2C%20Lagos!5e0!3m2!1sen!2sng!4v1623757638130!5m2!1sen!2sng"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </AspectRatio>
    </BoxContainer>
  );
}
