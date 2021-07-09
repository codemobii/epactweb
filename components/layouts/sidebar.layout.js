import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Center, Flex, Stack } from "@chakra-ui/layout";
import Link from "next/link";
import React, { useContext } from "react";
import { BsBarChart, BsGrid, BsPeople, BsPeopleCircle } from "react-icons/bs";
import { GlobalContext } from "../../pages/_app";
import { getStrapiMedia } from "../../utils/media.util";
import BgIllustration from "../helpers/bg_illus.helper";

export default function SidebarLayout({ isOpen = false }) {
  const global = useContext(GlobalContext);

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
      <BgIllustration isOpac={false} />
      <Flex px="20px" align="center" w="100%" h="70px">
        <Link href="/account">
          <Image
            cursor="pointer"
            src={getStrapiMedia(global.logoTwo)}
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
            as="a"
            href={e.href}
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
    href: "/myfarm",
    icon: <BsGrid size="18px" />,
  },
  {
    label: "Projects",
    href: "/myfarm/projects",
    icon: <BsBarChart size="18px" />,
  },
  {
    label: "Referrals",
    href: "/myfarm/referrals",
    icon: <BsPeople size="20px" />,
  },
  {
    label: "Account",
    href: "/myfarm/settings",
    icon: <BsPeopleCircle size="18px" />,
  },
];
