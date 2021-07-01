import { Box } from "@chakra-ui/layout";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/client";
import AdAddon from "../../../addons/ad.addon";
import BalanceAddon from "../../../addons/balance.addon";
import TableAddon from "../../../addons/table.addon";
import OutlineButton from "../../../components/buttons/outline.button";
import AccountLayout from "../../../components/layouts/account.layout";
import CardLayout from "../../../components/layouts/card.layout";
import ContentLoaderLayout from "../../../components/layouts/contentloader.layout";
import ListLayout from "../../../components/layouts/list.layout";
import { fetchAPI } from "../../../utils/api.util";
import { useCookies } from "react-cookie";

export default function Account(props) {
  const { ad } = props;

  const [wallet, setWallet] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cookies, setCookie] = useCookies(["session"]);

  const ses = cookies.session;

  const transactionReq = axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/transactions?users_permissions_user=${
      ses && ses.user.id
    }`,
    {
      headers: {
        Authorization: `Bearer ${ses && ses.jwt}`,
      },
    }
  );

  const getItems = async () => {
    axios
      .all([transactionReq])
      .then(
        axios.spread((...responses) => {
          const resOne = responses[0];

          setTransactions(resOne.data);
        })
      )
      .catch((errors) => {
        console.log(errors);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    console.log(ses);
    if (cookies) {
      getItems();
    }
  }, [cookies]);

  return (
    <AccountLayout title="My Projects">
      <AdAddon data={ad} />

      {loading ? (
        <ContentLoaderLayout loading={loading} />
      ) : (
        <>
          <Box w="100%">
            <CardLayout>
              <ListLayout title="My transactions">
                <TableAddon data={transactions} />
              </ListLayout>
            </CardLayout>
          </Box>
        </>
      )}
    </AccountLayout>
  );
}

export async function getServerSideProps({ req }) {
  // Run API calls in parallel
  const [ad] = await Promise.all([fetchAPI("/account-ad")]);

  return {
    props: { ad },
  };
}
