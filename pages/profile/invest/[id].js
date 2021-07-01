import {
  Box,
  Flex,
  HStack,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/layout";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { getSession, useSession } from "next-auth/client";
import { BsInfoCircleFill } from "react-icons/bs";
import MainButton from "../../../components/buttons/main.button";
import MainInput from "../../../components/inputs/main.input";
import AccountLayout from "../../../components/layouts/account.layout";
import CardLayout from "../../../components/layouts/card.layout";
import { fetchAPI } from "../../../utils/api.util";
import { getStrapiMedia } from "../../../utils/media.util";
import { GlobalContext } from "../../_app";
import { useCookies } from "react-cookie";

export default function Account(props) {
  const { project } = props;

  const [cookies, setCookie] = useCookies(["session"]);

  const session = cookies.session;

  const global = useContext(GlobalContext);

  const [amount, setAmount] = useState(project.minimum);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function makeRef(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  useEffect(async () => {
    setEmail(session.user.email);
    setName(session.user.name);
  }, []);

  async function MakePayment(e) {
    e.preventDefault();
    const formRef = makeRef(20);
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/wallets/${
          cookies.session &&
          cookies.session.user &&
          cookies.session.user.wallet.id
        }`,
        {
          headers: {
            Authorization: `Bearer ${cookies.session && cookies.session.jwt}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        const numI = res.data.total_investment || 0;

        FlutterwaveCheckout({
          public_key: "FLWPUBK_TEST-c4c676322706278c4e45b09eb8ac0e4b-X",
          tx_ref: formRef,
          amount: amount,
          currency: "NGN",
          country: "NG",
          payment_options: "card",
          customer: {
            email: email,
            name: name,
          },
          callback: async (d) => {
            console.log(d);
            await axios
              .post(
                `${process.env.NEXT_PUBLIC_API_URL}/transactions`,
                {
                  title: `Invested in ${project.title}`,
                  description: `You invested in ${project.title} with the total sum of ${amount}`,
                  amount: amount,
                  project: project._id,
                  users_permissions_user: session.user._id,
                  type: "project",
                  paid: d.status === "successful",
                  transaction_id: d.transaction_id,
                },
                {
                  headers: {
                    Authorization: `Bearer ${session.jwt}`,
                  },
                }
              )
              .then(async (res) => {
                await axios.put(
                  `${process.env.NEXT_PUBLIC_API_URL}/wallets/${
                    cookies.session &&
                    cookies.session.user &&
                    cookies.session.user.wallet.id
                  }`,
                  {
                    total_investment: numI + 1,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${
                        cookies.session && cookies.session.jwt
                      }`,
                    },
                  }
                );
              })
              .then((res) => {
                alert("Investment processed!");
                window.location.href = "/profile/projects";
              })
              .catch((er) => console.log(er));
          },
          customizations: {
            title: global.website_title,
            description: `Invest in ${project.title}`,
            logo: getStrapiMedia(global.favIcon),
          },
        });
      })
      .catch((er) => console.log(er));
  }

  return (
    <AccountLayout title={`Invest in ${project.title}`}>
      <Stack spacing="30px">
        <CardLayout>
          <Stack p="20px" spacing="20px">
            <HStack>
              <Box color="green.400">
                <BsInfoCircleFill />
              </Box>
              <Text color="gray.500">Project details</Text>
            </HStack>
            <Text>{project.description}</Text>
          </Stack>
        </CardLayout>
        <CardLayout>
          <Stack spacing="30px" p="20px">
            <HStack>
              <MainInput
                type="name"
                isRequired
                label="Your fullname"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <MainInput
                type="email"
                isRequired
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </HStack>
            <MainInput
              type="number"
              isRequired
              label="Amount to invest"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <Box>
              <MainButton title="Invest" onClick={MakePayment} />
            </Box>
          </Stack>
        </CardLayout>
      </Stack>
    </AccountLayout>
  );
}

export async function getStaticPaths() {
  const projects = await fetchAPI("/projects");

  return {
    paths: projects.map((e) => ({
      params: {
        id: e._id.toString(),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps(req, res) {
  const project = await fetchAPI(`/projects/${req.params.id}`);

  return {
    props: { project },
    revalidate: 1,
  };
}
