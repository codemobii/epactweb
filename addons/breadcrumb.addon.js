import { Box, Center, Heading, HStack, Stack, Text } from "@chakra-ui/layout";
import React, { useContext } from "react";
import { BsChevronRight } from "react-icons/bs";
import { GlobalContext } from "../pages/_app";
import { getStrapiMedia } from "../utils/media.util";

export default function BreadcrumbAddon({
  title = "",
  links = [],
  image = null,
}) {
  const global = useContext(GlobalContext);

  return (
    <Box
      w="100%"
      pos="relative"
      backgroundImage={
        image ? getStrapiMedia(image) : getStrapiMedia(global.breadcrumb_bg)
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
              <React.Fragment key={i}>
                <Text key={i} fontSize="xs">
                  {e}
                </Text>
                {links[links.length - 1] !== e && <BsChevronRight key={i} />}
              </React.Fragment>
            ))}
          </HStack>
        </Stack>
      </Center>
    </Box>
  );
}
