import { Avatar } from "@chakra-ui/avatar";
import {
  Box,
  Flex,
  HStack,
  Heading,
  Spacer,
  Text,
  Stack,
} from "@chakra-ui/layout";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Button,
  useBreakpointValue,
  Image,
} from "@chakra-ui/react";
import { signOut } from "next-auth/client";
import React, { useContext } from "react";
import { useCookies } from "react-cookie";
import { GlobalContext } from "../../pages/_app";
import { getStrapiMedia } from "../../utils/media.util";
import BoxContainer from "./container.layout";

export default function TopbarLayout({
  title = "Dashboard",
  // isOpen = false,
  // onToggle = null,
  // loading = false,
  session = {},
}) {
  const global = useContext(GlobalContext);
  const [cookies, setCookie, removeCookie] = useCookies(["session"]);

  return (
    <Box
      w="100%"
      bg={{ base: "green.400", md: "white" }}
      pos="fixed"
      top="0"
      left="0"
      borderBottom="1px"
      borderColor="gray.200"
      zIndex="10"
      pl={{ base: "0", md: "260px" }}
    >
      <BoxContainer>
        <Flex h={{ base: "55px", md: "70px" }} w="100%" align="center">
          {useBreakpointValue({
            base: (
              <Image
                cursor="pointer"
                src={getStrapiMedia(global.logo)}
                w="130px"
              />
            ),
            md: <Heading fontSize="2xl">{title}</Heading>,
          })}
          <Spacer />

          <Popover trigger="hover">
            <PopoverTrigger>
              <HStack cursor="pointer">
                <Avatar
                  size="sm"
                  src={session.user && session.user.image && session.user.image}
                  name={session.user && session.user.username}
                />
                <Text fontWeight="bold" d={{ base: "none", md: "block" }}>
                  {/* {!loading && session.user && session.user.name} */}
                </Text>
              </HStack>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverBody>
                <Stack spacing="20px" align="center" pos="relative" p="20px">
                  <Avatar
                    size="lg"
                    src={
                      session.user && session.user.image && session.user.image
                    }
                    name={session.user && session.user.username}
                  />
                  <Stack spacing="0.5" textAlign="center" align="center">
                    <Text fontWeight="bold">
                      {session.user && session.user.username}
                    </Text>
                    <Text color="gray.400" fontWeight="light">
                      {session.user && session.user.email}
                    </Text>
                  </Stack>

                  <HStack>
                    <Button fontSize="sm">Account</Button>
                    <Button
                      onClick={(e) => {
                        if (removeCookie("session")) {
                          window.location.href = "/auth/signin";
                        }
                      }}
                      fontSize="sm"
                      variant="ghost"
                      colorScheme="red"
                    >
                      Sign out
                    </Button>
                  </HStack>
                </Stack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
      </BoxContainer>
    </Box>
  );
}
