import { Box, Stack } from "@chakra-ui/layout";
import Head from "next/head";
import React, { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import BottombarLayout from "./bottombar.layout";
import BoxContainer from "./container.layout";
import SidebarLayout from "./sidebar.layout";
import TopbarLayout from "./topbar.layout";

export default function AccountLayout(props) {
  const { children, title = "Dashboard" } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [cookies, setCookie] = useCookies(["session"]);

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (typeof window !== "undefined" && !cookies.session) {
    window.location.href = "/auth/signin";
  }

  return (
    <Box w="100%" pos="relative" minH="100vh" bg="gray.50">
      <Head>
        <title>ePact :: Account</title>
      </Head>

      <TopbarLayout
        session={cookies.session}
        title={title}
        onToggle={onToggle}
        isOpen={isOpen}
      />

      <SidebarLayout isOpen={isOpen} />

      <Box
        position="relative"
        pl={{ base: "0", md: "260px" }}
        pt="100px"
        pb="120px"
      >
        <BoxContainer>
          {loading ? "Loading . . ." : <Stack spacing="20px">{children}</Stack>}
        </BoxContainer>
      </Box>

      <BottombarLayout />
    </Box>
  );
}
