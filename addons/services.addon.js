import { Image } from "@chakra-ui/image";
import { Box, SimpleGrid, Stack, Text } from "@chakra-ui/layout";
import { useBreakpoint, useBreakpointValue } from "@chakra-ui/media-query";
import { Center } from "@chakra-ui/react";
import React from "react";
import MainButton from "../components/buttons/main.button";
import BgIllustration from "../components/helpers/bg_illus.helper";
import TitleHelper from "../components/helpers/title.helper";
import BoxContainer from "../components/layouts/container.layout";
import { getStrapiMedia } from "../utils/media.util";

export default function ServicesAddon({ isBg = false, data = [] }) {
  return (
    <Box py="80px" pos="relative" bgColor={isBg && "gray.50"}>
      {isBg && <BgIllustration />}
      <BoxContainer>
        <Stack spacing="30px">
          <TitleHelper color={isBg && "gray.50"}>Our Services</TitleHelper>

          <SimpleGrid w="100%" spacing="20px" columns={{ base: 1, md: 3 }}>
            {data.map((e, i) => (
              <Stack
                pos="relative"
                _before={{
                  content: "''",
                  pos: "absolute",
                  left: "-40px",
                  borderLeft:
                    (i === 1 || i === 3 || i === 5) &&
                    useBreakpointValue({ base: "1px", md: "0" }),
                  h: (i === 1 || i === 3 || i === 5) && "100px",
                  borderStyle: "dashed",
                  borderColor: "gray.400",
                  d: useBreakpoint({ base: "block", md: "none" }),
                }}
                margin="auto"
                align="center"
                textAlign="center"
                key={i}
              >
                <Image
                  w="120px"
                  objectFit="contain"
                  src={getStrapiMedia(e.icon)}
                />
                <Text fontWeight="bold" w="200px">
                  {e.title}
                </Text>
              </Stack>
            ))}
          </SimpleGrid>

          <Center>
            <MainButton title="Show All" link="/services" />
          </Center>
        </Stack>
      </BoxContainer>
    </Box>
  );
}
