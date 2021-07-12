import { Box, SimpleGrid } from "@chakra-ui/layout";
import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import {
  BsAppIndicator,
  BsArrowClockwise,
  BsBarChart,
  BsGrid,
  BsPeople,
  BsPeopleCircle,
  BsPerson,
  BsWallet,
} from "react-icons/bs";

export default function BottombarLayout() {
  return (
    <Box
      bg="white"
      borderTop="1px"
      borderColor="gray.200"
      w="100%"
      pos="fixed"
      bottom="0"
      left="0"
      d={{ base: "block", md: "none" }}
    >
      <SimpleGrid columns={5} spacing="10px" w="100%" py="20px">
        {NAV_LINKS.map((e, i) => (
          <Stack
            as="a"
            href={e.href}
            alignItems="center"
            textAlign="center"
            key={i}
          >
            {e.icon}
            {/* <Text fontSize="sm">{e.label}</Text> */}
          </Stack>
        ))}
      </SimpleGrid>
    </Box>
  );
}

const NAV_LINKS = [
  {
    label: "Dashboard",
    href: "/myfarm",
    icon: <BsGrid size="20px" />,
  },
  {
    label: "Projects",
    href: "/myfarm/projects",
    icon: <BsBarChart size="20px" />,
  },
  {
    label: "Withdrawals",
    href: "/myfarm/withdrawals",
    icon: <BsWallet size="18px" />,
  },
  {
    label: "Referrals",
    href: "/myfarm/referrals",
    icon: <BsPeople size="20px" />,
  },
  {
    label: "Account",
    href: "/myfarm/settings",
    icon: <BsPerson size="18px" />,
  },
];
