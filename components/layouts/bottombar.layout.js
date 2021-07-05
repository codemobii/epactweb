import { Box, SimpleGrid } from "@chakra-ui/layout";
import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import {
  BsAppIndicator,
  BsArrowClockwise,
  BsBarChart,
  BsGrid,
  BsPerson,
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
      <SimpleGrid columns={3} spacing="10px" w="100%" py="10px">
        {NAV_LINKS.map((e, i) => (
          <Stack
            as="a"
            href={e.href}
            alignItems="center"
            textAlign="center"
            key={i}
          >
            {e.icon}
            <Text fontSize="sm">{e.label}</Text>
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
  // {
  //   label: "History",
  //   href: "/profile/history",
  //   icon: <BsArrowClockwise size="20px" />,
  // },
  {
    label: "Account",
    href: "/myfarm/settings",
    icon: <BsPerson size="18px" />,
  },
];
