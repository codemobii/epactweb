import { Box, Stack } from "@chakra-ui/layout";
import React from "react";
import BoxContainer from "../components/layouts/container.layout";

export default function SingleAddon({ desc = "" }) {
  return (
    <Box w="100%" pos="relative" py="80px">
      <BoxContainer>
        <Stack spacing="10px">{desc}</Stack>
      </BoxContainer>
    </Box>
  );
}
