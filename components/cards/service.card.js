import { Image } from "@chakra-ui/image";
import { Box, Stack, Text } from "@chakra-ui/layout";
import React from "react";
import { getStrapiMedia } from "../../utils/media.util";
import TitleHelper from "../helpers/title.helper";

export default function ServiceCard({
  title = "One service title",
  data = {},
}) {
  return (
    <Box pos="relative">
      <Stack alignItems="center" textAlign="center" spacing="30px">
        <Box>
          <Image
            w="120px"
            objectFit="contain"
            src={getStrapiMedia(data.icon)}
          />
        </Box>
        <Stack spacing="30px">
          <TitleHelper>{data.title}</TitleHelper>
          <Text>{data.description}</Text>
        </Stack>
      </Stack>
    </Box>
  );
}
