import { Image } from "@chakra-ui/image";
import { Box, SimpleGrid, Stack, Text } from "@chakra-ui/layout";
import { Flex, Spacer } from "@chakra-ui/react";
import React from "react";
import NumberFormat from "react-number-format";

import MainButton from "../components/buttons/main.button";
import OutlineButton from "../components/buttons/outline.button";
import BgIllustration from "../components/helpers/bg_illus.helper";
import TitleHelper from "../components/helpers/title.helper";
import BoxContainer from "../components/layouts/container.layout";
import { getStrapiMedia } from "../utils/media.util";

export default function ProjectsAddon({
  projects = [1, 2, 3],
  isHome = true,
  isAccount = false,
}) {
  return (
    <Box
      w="100%"
      bgColor={isHome ? "gray.50" : isAccount ? "transparent" : "#fff"}
      py="80px"
      pos="relative"
    >
      {isHome && <BgIllustration />}
      <BoxContainer>
        <Stack align="center" spacing="30px">
          {isHome && (
            <TitleHelper
              color="gray.50"
              desc="From Apple to Zucchini, everything is here! Sign-up for more information!"
            >
              Our Projects
            </TitleHelper>
          )}

          <SimpleGrid w="100%" spacing="20px" columns={{ base: 1, md: 3 }}>
            {projects.map((e, i) => (
              <Box key={i} rounded="4px" overflow="hidden">
                <Image
                  src={e.image && getStrapiMedia(e.image)}
                  h="160px"
                  w="100%"
                  objectFit="cover"
                  borderTopRightRadius="40px"
                />
                <Box
                  w="100%"
                  p="20px"
                  bg="gray.800"
                  color="gray.100"
                  pos="relative"
                >
                  <BgIllustration />
                  <Stack textAlign="center" spacing="20px">
                    <Text fontSize="xl">{e.title}</Text>
                    <Stack>
                      <Flex
                        py="8px"
                        borderTop="2px"
                        borderColor="gray.600"
                        borderStyle="dotted"
                        w="100%"
                      >
                        <Text>Minimum</Text>
                        <Spacer />
                        <Text>
                          <NumberFormat
                            value={e.minimum}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"₦"}
                          />
                        </Text>
                      </Flex>

                      <Flex
                        py="8px"
                        borderTop="2px"
                        borderColor="gray.600"
                        borderStyle="dotted"
                        w="100%"
                      >
                        <Text>Maximum</Text>
                        <Spacer />
                        <Text>
                          <NumberFormat
                            value={e.maximum}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"₦"}
                          />
                        </Text>
                      </Flex>

                      <Flex
                        py="8px"
                        borderTop="2px"
                        borderColor="gray.600"
                        borderStyle="dotted"
                        w="100%"
                      >
                        <Text>Return</Text>
                        <Spacer />
                        <Text>{e.interest}%</Text>
                      </Flex>

                      <Flex
                        py="8px"
                        borderTop="2px"
                        borderBottom="2px"
                        borderColor="gray.600"
                        borderStyle="dotted"
                        w="100%"
                      >
                        <Text>Maturity date</Text>
                        <Spacer />
                        <Text>{e.maturity}</Text>
                      </Flex>
                    </Stack>
                    <Box as="span">
                      <OutlineButton
                        title="Invest"
                        link={`/profile/invest/${e._id}`}
                      />
                    </Box>
                  </Stack>
                </Box>
              </Box>
            ))}
          </SimpleGrid>

          {isHome && <MainButton title="Show All" />}
        </Stack>
      </BoxContainer>
    </Box>
  );
}
