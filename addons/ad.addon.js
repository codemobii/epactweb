import { Image } from "@chakra-ui/image";
import { Box, Flex, Heading, Spacer, Stack, Text } from "@chakra-ui/layout";
import React from "react";
import MainButton from "../components/buttons/main.button";
import CardLayout from "../components/layouts/card.layout";
import { getStrapiMedia } from "../utils/media.util";

export default function AdAddon({ data }) {
  return (
    <CardLayout>
      <Flex pos="relative">
        <Stack spacing="30px" p="20px">
          <Stack>
            <Heading fontSize="xl" fontWeight="medium">
              {data.heading}
            </Heading>
            <Text color="gray.400" fontSize="sm">
              {data.description}
            </Text>
          </Stack>
          <Box as="span">
            <MainButton title={data.button_title} link={data.button_link} />
          </Box>
        </Stack>

        <Spacer />

        <Image
          pos="absolute"
          right="0"
          w="300px"
          objectFit="cover"
          h="100%"
          src={getStrapiMedia(data.image)}
          d={{ base: "none", md: "block" }}
        />
      </Flex>
    </CardLayout>
  );
}
