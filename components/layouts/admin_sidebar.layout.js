import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Center, Flex, Stack } from "@chakra-ui/layout";
import Link from "next/link";
import React from "react";
import {
  BsAppIndicator,
  BsArrowClockwise,
  BsBarChart,
  BsGrid,
  BsPeopleCircle,
} from "react-icons/bs";

export default function AdminSidebarLayout({ isOpen = false }) {
  return (
    <Box
      w="260px"
      h="100vh"
      pos="fixed"
      top="0"
      left="0"
      bg="green.400"
      zIndex="11"
      d={{ base: isOpen ? "block" : "none", md: "block" }}
    >
      <Flex px="20px" align="center" w="100%" h="70px">
        <Link href="/account">
          <Image
            cursor="pointer"
            src="https://www.okulistik.com/anasayfa/images/okulistik-logo.svg"
            w="130px"
          />
        </Link>
      </Flex>

      <Stack spacing="20px" p="20px" px="5px">
        {NAV_LINKS.map((e, i) => (
          <Button
            key={i}
            leftIcon={
              <Center w="32px" h="32px" bg="whiteAlpha.400" rounded="full">
                {e.icon}
              </Center>
            }
            fontSize="sm"
            justifyContent="flex-start"
            variant="ghost"
            colorScheme="whiteAlpha"
            color="white"
            transition="all 0.3s ease"
            _hover={{
              bgGradient: "linear(to-l, whiteAlpha.400, whiteAlpha.50)",
            }}
          >
            {e.label}
          </Button>
        ))}
      </Stack>
    </Box>
  );
}

const NAV_LINKS = [
  {
    label: "Dashboard",
    href: "/account",
    icon: <BsGrid size="18px" />,
  },
  {
    label: "Investments",
    href: "/account",
    icon: <BsBarChart size="18px" />,
  },
  {
    label: "History",
    href: "/account",
    icon: <BsArrowClockwise size="18px" />,
  },
  {
    label: "Notifications",
    href: "/account/notifications",
    icon: <BsAppIndicator size="18px" />,
  },
  {
    label: "Account",
    href: "/account",
    icon: <BsPeopleCircle size="18px" />,
  },
];
