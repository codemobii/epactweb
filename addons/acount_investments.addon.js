import { Flex, Spacer, Stack, Text } from "@chakra-ui/layout";
import React from "react";
import OutlineButton from "../components/buttons/outline.button";

export default function AccountInvestmentsAddon() {
  return (
    <Stack spacing="10px">
      {[1, 2, 3, 4, 5].map((e, i) => (
        <>
          <Flex
            key={i}
            px="20px"
            py="10px"
            borderBottom="1px"
            borderColor="gray.100"
            align="center"
          >
            <Text>Some Title word</Text>
            <Spacer />
            <OutlineButton title="Invest" color="green.400" size="sm" />
          </Flex>
        </>
      ))}
    </Stack>
  );
}
