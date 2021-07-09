import {
  Box,
  Flex,
  HStack,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/layout";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useClipboard,
} from "@chakra-ui/react";
import React, { useState } from "react";
import AccountInvestmentsAddon from "../../addons/acount_investments.addon";
import AdAddon from "../../addons/ad.addon";
import BalanceAddon from "../../addons/balance.addon";
import TableAddon from "../../addons/table.addon";
import MainButton from "../../components/buttons/main.button";
import OutlineButton from "../../components/buttons/outline.button";
import MainInput from "../../components/inputs/main.input";
import AccountLayout from "../../components/layouts/account.layout";
import CardLayout from "../../components/layouts/card.layout";
import ListLayout from "../../components/layouts/list.layout";

export default function Account() {
  let value = `${window.location.origin}?ref=ijele`;
  const { hasCopied, onCopy } = useClipboard(value);

  return (
    <AccountLayout title="History">
      <Stack spacing="20px" w="100%">
        <CardLayout>
          <Box p="20px">
            <Stack
              align="center"
              direction={{ base: "column", md: "row" }}
              spacing="10px"
              mb={2}
            >
              <MainInput value={value} read />
              <MainButton
                title={hasCopied ? "Copied" : "Copy"}
                onClick={onCopy}
              />
            </Stack>
          </Box>
        </CardLayout>

        <CardLayout>
          <ListLayout title="My Referrals">
            <TableAddon />
          </ListLayout>
        </CardLayout>
      </Stack>
    </AccountLayout>
  );
}
