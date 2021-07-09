import { Box, Stack } from "@chakra-ui/layout";
import {
  useClipboard,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import TableAddon from "../../addons/table.addon";
import MainButton from "../../components/buttons/main.button";
import MainInput from "../../components/inputs/main.input";
import AccountLayout from "../../components/layouts/account.layout";
import CardLayout from "../../components/layouts/card.layout";
import ContentLoaderLayout from "../../components/layouts/contentloader.layout";
import ListLayout from "../../components/layouts/list.layout";

export default function Account(props) {
  const { session } = props;

  const ses = JSON.parse(session);

  let value;

  if (typeof window !== "undefined") {
    value = `${
      window.location.origin || "https://www.epact.com.ng"
    }/auth/signup?ref=${ses.user.username}`;
  }

  const { hasCopied, onCopy } = useClipboard(value);

  const [loading, setLoading] = useState(true);
  const [referrals, setReferrals] = useState([]);

  const refferalsReq = axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/users?referral=${ses && ses.user.id}`,
    {
      headers: {
        Authorization: `Bearer ${ses && ses.jwt}`,
      },
    }
  );

  const getItems = async () => {
    axios
      .all([refferalsReq])
      .then(
        axios.spread((...responses) => {
          const resOne = responses[0];

          setReferrals(resOne.data);
        })
      )
      .catch((errors) => {
        console.log(errors);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getItems();
  }, []);

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

        {loading ? (
          <ContentLoaderLayout loading={loading} />
        ) : (
          <>
            <Box w="100%">
              <CardLayout>
                <ListLayout title="My Referrals">
                  <Table variant="striped">
                    {referrals.length === 0 && (
                      <TableCaption>Nothing Found!</TableCaption>
                    )}
                    <Thead>
                      <Tr>
                        <Th>S/N</Th>
                        <Th>Name</Th>
                        <Th>Registered on</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {referrals.map((data, key) => (
                        <Tr key={key}>
                          <Td>{key + 1}</Td>
                          <Td>{data.username}</Td>
                          <Td>
                            <Moment format="MMM Do YYYY">
                              {data.created_at}
                            </Moment>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </ListLayout>
              </CardLayout>
            </Box>
          </>
        )}
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
