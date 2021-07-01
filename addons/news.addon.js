import { Image } from "@chakra-ui/image";
import { Box, SimpleGrid, Stack, Text } from "@chakra-ui/layout";
import React from "react";
import MainButton from "../components/buttons/main.button";
import OutlineButton from "../components/buttons/outline.button";
import BgIllustration from "../components/helpers/bg_illus.helper";
import TitleHelper from "../components/helpers/title.helper";
import BoxContainer from "../components/layouts/container.layout";
import { getStrapiMedia } from "../utils/media.util";

export default function NewsAddon({ data = [1, 2, 3], isHome = true }) {
  return (
    <Box
      w="100%"
      bgColor={isHome ? "gray.50" : "#fff"}
      py="80px"
      pos="relative"
    >
      {isHome && <BgIllustration />}
      <BoxContainer>
        <Stack align="center" spacing="30px">
          <SimpleGrid w="100%" spacing="20px" columns={{ base: 1, md: 3 }}>
            {data.map((e, i) => (
              <Box key={i} rounded="4px" overflow="hidden">
                <Image
                  src={getStrapiMedia(e.image)}
                  h="160px"
                  w="100%"
                  objectFit="cover"
                  borderTopRightRadius="40px"
                />
                <Box
                  w="100%"
                  p="20px"
                  bg="gray.800"
                  color="gray.100"
                  pos="relative"
                >
                  <BgIllustration />
                  <Stack spacing="20px">
                    <Text>{e.title}</Text>
                    <Box as="span">
                      <OutlineButton
                        title="Discover"
                        link={`/news/${e.slug}`}
                      />
                    </Box>
                  </Stack>
                </Box>
              </Box>
            ))}
          </SimpleGrid>

          {isHome && <MainButton title="Show All" link="/news" />}
        </Stack>
      </BoxContainer>
    </Box>
  );
}
