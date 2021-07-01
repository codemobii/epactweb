import { Image } from "@chakra-ui/image";
import {
  Box,
  Center,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/layout";
import React from "react";
import MainButton from "../components/buttons/main.button";
import TitleHelper from "../components/helpers/title.helper";
import BoxContainer from "../components/layouts/container.layout";
import { getStrapiMedia } from "../utils/media.util";

export default function PartnerAddon({
  isHome = false,
  title = "About Us",
  image = "https://images.unsplash.com/photo-1551924769-258e56dae218?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80",
  description = "",
}) {
  return (
    <Box pos="relative" py="80px">
      <BoxContainer>
        <SimpleGrid columns={{ base: "1", md: "2" }} spacing="30px">
          <Stack spacing="30px">
            <TitleHelper>{title}</TitleHelper>
            <Text>{description}</Text>
            {isHome && (
              <Center>
                <MainButton title="Read More" />
              </Center>
            )}
          </Stack>
          <Box>
            <Image
              w="100%"
              h="380px"
              src={getStrapiMedia(image)}
              objectFit="cover"
              objectPosition="center"
            />
          </Box>
        </SimpleGrid>
      </BoxContainer>
    </Box>
  );
}
