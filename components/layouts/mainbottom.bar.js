import { IconButton } from "@chakra-ui/button";
import { Box, SimpleGrid } from "@chakra-ui/layout";
import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import {
  BsAppIndicator,
  BsArrowClockwise,
  BsBarChart,
  BsGrid,
} from "react-icons/bs";

export default function MainBottombarLayout() {
  return (
    <Box
      bg="white"
      borderTop="1"
      borderColor="gray.200"
      w="100%"
      pos="fixed"
      bottom="0"
      left="0"
      d={{ base: "block", md: "none" }}
    >
      <SimpleGrid columns={4} spacing="10px" w="100%" py="10px">
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
    label: "Home",
    href: "/",
    icon: <BsGrid size="20px" />,
  },
  {
    label: "My Farm",
    href: "/account",
    icon: <BsBarChart size="20px" />,
  },
  {
    label: "News",
    href: "/news",
    icon: <BsArrowClockwise size="20px" />,
  },
  {
    label: "Feedback",
    href: "/contact",
    icon: <BsAppIndicator size="18px" />,
  },
];
