import { Box, Heading, Stack, Text } from "@chakra-ui/layout";
import { SimpleGrid, Tag } from "@chakra-ui/react";
import React from "react";
import NumberFormat from "react-number-format";

import CardLayout from "../components/layouts/card.layout";

export default function BalanceAddon({ data = {} }) {
  const DATA = [
    {
      label: "Balance",
      value: (
        <NumberFormat
          value={data.balance ?? 0}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₦"}
        />
      ),
    },
    { label: "Total investment", value: data.total_investment ?? 0 },
    {
      label: "Total ROI",
      value: (
        <NumberFormat
          value={data.ROI ?? 0}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₦"}
        />
      ),
      isHidden: true,
    },
    { label: "Hold Tokens", value: data.total_tokens ?? 0, isHidden: true },
  ];

  return (
    <SimpleGrid columns={{ base: 1, md: 4 }} spacing="10px">
      {DATA.map((data, key) => (
        <CardLayout>
          {data.isHidden && (
            <Tag
              pos="absolute"
              top="5px"
              right="5px"
              color="white"
              bg="red.400"
              size="sm"
            >
              Coming Soon
            </Tag>
          )}
          <Stack py="20px" pt="30px" px="10px" key={key} textAlign="center">
            <Text color="gray.400" fontSize="sm">
              {data.label}
            </Text>
            <Heading fontSize="2xl" fontWeight="medium">
              {data.value}
            </Heading>
          </Stack>
        </CardLayout>
      ))}
    </SimpleGrid>
  );
}
