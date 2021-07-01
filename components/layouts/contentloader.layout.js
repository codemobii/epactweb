import { Center } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import React from "react";

export default function ContentLoaderLayout() {
  return (
    <Center w="100%" h="100px">
      <Spinner size="md" />
    </Center>
  );
}
