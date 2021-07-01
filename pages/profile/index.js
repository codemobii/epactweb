import { Box } from "@chakra-ui/layout";
import axios from "axios";
import React, { useState } from "react";
import AdAddon from "../../addons/ad.addon";
import BalanceAddon from "../../addons/balance.addon";
import TableAddon from "../../addons/table.addon";
import AccountLayout from "../../components/layouts/account.layout";
import CardLayout from "../../components/layouts/card.layout";
import ListLayout from "../../components/layouts/list.layout";
import ContentLoaderLayout from "../../components/layouts/contentloader.layout";
import { fetchAPI } from "../../utils/api.util";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useCookies } from "react-cookie";

export default function Account(props) {
  const { ad } = props;

  const [ses, setSes] = useState({});
  const [cookies, setCookie] = useCookies(["session"]);

  const [wallet, setWallet] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const walletReq = axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/wallets/${
      cookies.session && cookies.session.user && cookies.session.user.wallet.id
    }`,
    {
      headers: {
        Authorization: `Bearer ${cookies.session && cookies.session.jwt}`,
      },
    }
  );

  const transactionReq = axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/transactions?users_permissions_user=${
      cookies.session && cookies.session.user && cookies.session.user.id
    }`,
    {
      headers: {
        Authorization: `Bearer ${cookies.session && cookies.session.jwt}`,
      },
    }
  );

  const getItems = async () => {
    axios
      .all([walletReq, transactionReq])
      .then(
        axios.spread((...responses) => {
          const resOne = responses[0];
          const resTwo = responses[1];

          setWallet(resOne.data);
          setTransactions(resTwo.data);
        })
      )
      .catch((errors) => {
        console.log(errors);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    console.log(cookies);
    getItems();
  }, []);

  return (
    <AccountLayout>
      <AdAddon data={ad} />
      {loading ? (
        <ContentLoaderLayout loading={loading} />
      ) : (
        <>
          <BalanceAddon data={wallet} />

          <Box w="100%">
            <CardLayout>
              <ListLayout title="Recent Activities">
                <TableAddon data={transactions} />
              </ListLayout>
            </CardLayout>
          </Box>
        </>
      )}
    </AccountLayout>
  );
}

export async function getServerSideProps({ req, res }) {
  // Run API calls in parallel
  const [ad] = await Promise.all([fetchAPI("/account-ad")]);

  return {
    props: { ad },
  };
}
