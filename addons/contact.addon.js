import { Image } from "@chakra-ui/image";
import {
  Box,
  Center,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/layout";
import React from "react";
import MainButton from "../components/buttons/main.button";
import TitleHelper from "../components/helpers/title.helper";
import MainInput from "../components/inputs/main.input";
import TextareaInput from "../components/inputs/textarea.input";
import BoxContainer from "../components/layouts/container.layout";

export default function ContactAddon() {
  return (
    <Box pos="relative" py="80px">
      <BoxContainer>
        <SimpleGrid columns={{ base: "1", md: "2" }} spacing="30px">
          <Box>
            <Image
              w="100%"
              h="380px"
              src="https://images.unsplash.com/photo-1551924769-258e56dae218?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80"
              objectFit="cover"
              objectPosition="center"
            />
          </Box>
          <Stack spacing="30px">
            <TitleHelper>Send us a feedback</TitleHelper>

            <Stack>
              <MainInput id="name" label="Name" isRequired type="text" />
              <MainInput
                id="email"
                label="Email address"
                isRequired
                type="email"
              />
              <MainInput
                id="phone"
                label="Phone number"
                isRequired
                type="phone"
              />
              <TextareaInput id="message" label="Message" isRequired />
            </Stack>

            <Box mt="20px">
              <MainButton title="Submit" />
            </Box>
          </Stack>
        </SimpleGrid>
      </BoxContainer>
    </Box>
  );
}
