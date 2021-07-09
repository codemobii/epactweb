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
import TableAddon from "../../addons/table.addon";
import MainButton from "../../components/buttons/main.button";
import MainInput from "../../components/inputs/main.input";
import AccountLayout from "../../components/layouts/account.layout";
import CardLayout from "../../components/layouts/card.layout";
import ListLayout from "../../components/layouts/list.layout";

export default function Account(props) {
  const { session } = props;

  const ses = JSON.parse(session);

  let value;

  if (typeof window !== "undefined") {
    value = `${window.location.origin || "https://www.epact.com.ng"}?ref=${
      ses.user.username
    }`;
  }

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

export async function getServerSideProps({ req, res }) {
  const { cookies: session } = req;

  if (req && session) {
    if (!session.session) {
      return {
        redirect: {
          destination: "/auth/signin",
          permanent: false,
        },
      };
    }
  }

  return {
    props: { session: session.session },
  };
}
