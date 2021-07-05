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
  Link,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
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
  const [user, setUser] = useState({});

  const getItem = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${cookies.session && cookies.session.jwt}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((er) => console.log(er));
  };

  useEffect(() => {
    getItem();
  }, []);

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
                src={getStrapiMedia(global.logoTwo)}
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
                  src={
                    session.user &&
                    user.profileImage &&
                    getStrapiMedia(user.profileImage)
                  }
                  name={session.user && user.username}
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
                      session.user &&
                      user.profileImage &&
                      getStrapiMedia(user.profileImage)
                    }
                    name={session.user && user.username}
                  />
                  <Stack spacing="0.5" textAlign="center" align="center">
                    <Text fontWeight="bold">
                      {session.user && user.username}
                    </Text>
                    <Text color="gray.400" fontWeight="light">
                      {session.user && session.user.email}
                    </Text>
                  </Stack>

                  <HStack>
                    <Link href="/myfarm/settings">
                      <Button fontSize="sm">Account</Button>
                    </Link>
                    <Button
                      onClick={(e) => {
                        try {
                          window.localStorage.removeItem("session");
                          setTimeout(() => {
                            window.location.href = "/auth/signin";
                          }, 2000);
                        } catch (error) {
                          console.log(error);
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
