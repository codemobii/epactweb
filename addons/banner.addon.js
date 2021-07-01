import { Button } from "@chakra-ui/button";
import { Box, Center, Heading, Link, Stack } from "@chakra-ui/layout";
import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Slider from "react-slick";
import MainButton from "../components/buttons/main.button";
import BoxContainer from "../components/layouts/container.layout";
import { getStrapiMedia } from "../utils/media.util";

export default function BannerAddon({ title, video, link }) {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  // ******************* CUSTOMIZE THE CONTROL BUTTON ****************** //

  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <Button
        pos="absolute"
        right="0"
        zIndex="50"
        bottom="50%"
        mt="50px"
        onClick={onClick}
        d={{ base: "none", md: "flex" }}
        size="sm"
        leftIcon={
          <BsChevronRight style={{ marginRight: "-10px" }} size="24px" />
        }
        rounded="full"
        pl="0px"
        pr="0"
      />
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <Button
        pos="absolute"
        left="0"
        zIndex="50"
        bottom="50%"
        d={{ base: "none", md: "flex" }}
        mt="50px"
        onClick={onClick}
        size="sm"
        leftIcon={<BsChevronLeft style={{ marginRight: "-5px" }} size="24px" />}
        rounded="full"
        pl="0px"
        pr="0"
      />
    );
  }

  return (
    <Box
      // backgroundImage="url(https://static.wixstatic.com/media/3db22c_11efeb57ed414fa2a8b6e88d5d23daf0~mv2.jpg/v1/fill/w_1583,h_400,al_c,q_85,usm_0.66_1.00_0.01/3db22c_11efeb57ed414fa2a8b6e88d5d23daf0~mv2.webp)"
      bgSize="cover"
      bgPos="center"
      overflow="hidden"
      position="relative"
    >
      <video
        style={{ position: "absolute", top: 0, left: 0, width: "100%" }}
        loop
        autoPlay
        muted
      >
        <source src={getStrapiMedia(video)} type="video/mp4" />
        <source src={getStrapiMedia(video)} type="video/ogg" />
        Your browser does not support the video tag.
      </video>
      <Box
        bgGradient={"linear(to-r, blackAlpha.600, rgba(0,0,0,0.8))"}
        pos="relative"
      >
        <BoxContainer>
          <Slider {...settings}>
            <Box h={{ base: "260px", md: "500px" }} bgRepeat="no-repeat">
              <Center
                w="100%"
                h="100%"
                // bg="green.200"
                // bgGradient={"linear(to-r, blackAlpha.600, rgba(0,0,0,0.8))"}
                color="white"
              >
                <Stack spacing="30px" maxW="3xl" textAlign="center">
                  <Heading fontSize={{ base: "3xl", md: "5xl" }}>
                    {title}
                  </Heading>

                  <Box as="span">
                    <MainButton title="Get start" link={link} />
                  </Box>
                </Stack>
              </Center>
            </Box>

            {/* <Box
              h="500px"
              bgRepeat="no-repeat"
            >
              <Center
                w="100%"
                h="100%"
                // bg="green.200"
                // bgGradient={"linear(to-r, blackAlpha.600, rgba(0,0,0,0.8))"}
                color="white"
              >
                <Stack spacing="30px" maxW="3xl" textAlign="center">
                  <Heading fontSize={{ base: "3xl", md: "5xl" }}>
                    Menu Berbuka Puasa Khas Asia Untuk Pelangganmu
                  </Heading>

                  <Box as="span">
                    <MainButton title="Get start" />
                  </Box>
                </Stack>
              </Center>
            </Box> */}
          </Slider>
        </BoxContainer>
      </Box>
    </Box>
  );
}
