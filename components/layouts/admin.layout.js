import { Box, Stack } from "@chakra-ui/layout";
import Head from "next/head";
import React, { useState } from "react";
import BottombarLayout from "./bottombar.layout";
import BoxContainer from "./container.layout";
import SidebarLayout from "./sidebar.layout";
import TopbarLayout from "./topbar.layout";

export default function AdminAccountLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box w="100%" pos="relative" minH="100vh" bg="gray.50">
      <Head>
        <title>ePact :: Best Agrotech Company</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TopbarLayout onToggle={onToggle} isOpen={isOpen} />

      <SidebarLayout isOpen={isOpen} />

      <Box position="relative" pl={{ base: "0", md: "260px" }} pt="100px">
        <BoxContainer>
          <Stack spacing="20px">{children}</Stack>
        </BoxContainer>
      </Box>

      <BottombarLayout />
    </Box>
  );
}
