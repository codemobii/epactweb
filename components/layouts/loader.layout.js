import { Center } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import React from "react";
import BgIllustration from "../helpers/bg_illus.helper";

export default function LoaderLayout({ loading = false }) {
  return (
    loading && (
      <Center
        pos="fixed"
        zIndex="100"
        top="0"
        left="0"
        w="100%"
        h="100%"
        bg="gray.700"
        transition="all 0.3s ease"
        opacity={loading ? "1" : "0"}
      >
        <BgIllustration />
        <Spinner size="lg" color="white" />
      </Center>
    )
  );
}
