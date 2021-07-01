import { Avatar } from "@chakra-ui/avatar";
import { Box, Center, Stack, Text } from "@chakra-ui/layout";
import React from "react";
import Slider from "react-slick";
import BgIllustration from "../components/helpers/bg_illus.helper";
import TitleHelper from "../components/helpers/title.helper";
import BoxContainer from "../components/layouts/container.layout";
import { getStrapiMedia } from "../utils/media.util";

export default function TeamAddon({ data = [] }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    arrows: false,
  };

  return (
    <Box w="100%" position="relative" bg="gray.50" py="80px">
      <BgIllustration />
      <BoxContainer>
        <Stack spacing="30px">
          <TitleHelper color="gray.50">We Are Family</TitleHelper>

          <Slider {...settings}>
            {data.map((e, i) => (
              <div>
                <Center>
                  <Stack spacing="20px" key={i} textAlign="center">
                    <Avatar
                      boxShadow="base"
                      size="2xl"
                      name={e.fullname}
                      src={getStrapiMedia(e.image)}
                    />
                    <Stack spacing="1">
                      <Text
                        textTransform="uppercase"
                        fontSize="lg"
                        fontWeight="bold"
                      >
                        {e.fullname}
                      </Text>
                      <Text
                        textTransform="uppercase"
                        fontSize="sm"
                        fontWeight="medium"
                      >
                        {e.role}
                      </Text>
                    </Stack>
                  </Stack>
                </Center>
              </div>
            ))}
          </Slider>
        </Stack>
      </BoxContainer>
    </Box>
  );
}
