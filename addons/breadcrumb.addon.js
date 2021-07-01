import { Box, Center, Heading, HStack, Stack, Text } from "@chakra-ui/layout";
import React from "react";
import { BsChevronRight } from "react-icons/bs";
import { getStrapiMedia } from "../utils/media.util";

export default function BreadcrumbAddon({
  title = "",
  links = [],
  image = null,
}) {
  return (
    <Box
      w="100%"
      pos="relative"
      backgroundImage={
        image
          ? getStrapiMedia(image)
          : "url(https://static.wixstatic.com/media/3db22c_11efeb57ed414fa2a8b6e88d5d23daf0~mv2.jpg/v1/fill/w_1583,h_400,al_c,q_85,usm_0.66_1.00_0.01/3db22c_11efeb57ed414fa2a8b6e88d5d23daf0~mv2.webp)"
      }
      bgSize="cover"
      bgPos="center"
      bgRepeat="no-repeat"
    >
      <Center
        w="100%"
        bgGradient={"linear(to-r, blackAlpha.600, rgba(0,0,0,0.8))"}
        color="white"
        py="80px"
      >
        <Stack textAlign="center" align="center">
          <Heading textTransform="capitalize" fontSize="4xl">
            {title}
          </Heading>
          <HStack>
            {links.map((e, i) => (
              <>
                <Text key={i} fontSize="xs">
                  {e}
                </Text>
                {links[links.length - 1] !== e && <BsChevronRight key={i} />}
              </>
            ))}
          </HStack>
        </Stack>
      </Center>
    </Box>
  );
}
