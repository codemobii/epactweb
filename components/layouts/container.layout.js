import { Container } from "@chakra-ui/layout";
import React from "react";

export default function BoxContainer({ children }) {
  return (
    <Container pos="relative" maxW="container.lg">
      {children}
    </Container>
  );
}
