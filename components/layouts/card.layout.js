import { Box } from "@chakra-ui/layout";
import React from "react";

export default function CardLayout({ children }) {
  return (
    <Box
      w="100%"
      bg="white"
      borderRadius="4px"
      rounded="md"
      border="1px"
      overflowX="hidden"
      pos="relative"
      borderColor="gray.200"
    >
      {children}
    </Box>
  );
}
