import { Box, Center, Divider, Heading, Stack, Text } from "@chakra-ui/layout";
import React from "react";

export default function TitleHelper({ children, color = false, desc = false }) {
  return (
    <Stack align="center" textAlign="center">
      <Heading fontSize="4xl">{children}</Heading>
      <Center pos="relative">
        <Divider
          borderStyle="dashed"
          borderWidth="1px"
          w="300px"
          pos="absolute"
          borderColor="green.400"
        />
        <Box pos="relative" bg={color ? color : "white"} px="8px">
          <Flower />
        </Box>
      </Center>
      {desc && <Text>{desc}</Text>}
    </Stack>
  );
}

const Flower = () => (
  <svg
    preserveAspectRatio="xMidYMid meet"
    data-bbox="20.943 37.5 158.072 125.2"
    viewBox="20.943 37.5 158.072 125.2"
    xmlns="http://www.w3.org/2000/svg"
    data-type="color"
    role="img"
    width="44px"
    height="44px"
  >
    <g>
      <path
        d="M178 42.9v-.5l-.5-.2c-.5-.2-10.6-4.7-23.9-4.7-12.9 0-24.2 4-34 11.7-13.6 11-18.3 25.3-19.5 36.5h-.7c-1.2-11.2-5.6-25.5-19.2-36.5-9.6-7.7-21.1-11.7-34-11.7-13.4 0-23.4 4.4-23.7 4.4l-.7.5v.5c0 .2-7 33.7 19 54.8 9.6 7.7 21.1 11.7 34 11.7 13.4 0 23.4-4.4 23.7-4.4l.5-.2v-.2 58.1h2.3v-57.6c1.4.5 11 4.4 23.7 4.4 12.9 0 24.2-4 34-11.7 26.1-21.2 19.3-54.7 19-54.9zM74.9 107c-12.2 0-23.2-3.7-32.4-11.2C19.3 77.3 23.3 48.5 24 44.1c2.3-.9 11-4.2 22.3-4.2 12.2 0 23.2 3.7 32.4 11.2 20.2 16.2 19.7 40.3 18.8 49.2L43.9 56.9l-1.6 1.9 54.6 44c-2.1.9-11 4.2-22 4.2zm82.7-11.2c-9.1 7.5-20.2 11.2-32.4 11.2-11 0-19.9-3.3-22.3-4.2l54.6-44-1.4-1.9-53.7 43.3c-.9-8.7-1.4-32.8 18.8-49.2 9.1-7.5 20.2-11.2 32.4-11.2 11.3 0 19.9 3.3 22.3 4.2.7 4.5 4.7 33.3-18.3 51.8z"
        fill="#8cc63f"
        data-color="1"
      ></path>
    </g>
  </svg>
);
