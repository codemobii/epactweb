import { Checkbox } from "@chakra-ui/checkbox";
import { Link, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

import Cookies from "js-cookie";

import MainButton from "../../components/buttons/main.button";
import MainInput from "../../components/inputs/main.input";
import AuthLayout from "../../components/layouts/auth.layout";
import Head from "next/head";

export default function Signin({ req, res }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();
  // const [cookies, setCookie] = useCookies(["session"]);

  const fetchApi = async () => {
    setLoading(true);
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local`, {
        identifier: email,
        password: password,
      })
      .then((response) => {
        var date = new Date();

        // add a day
        date.setDate(date.getDate() + 1);

        if (typeof window != "undefined") {
          if (
            Cookies.set("session", JSON.stringify(response.data), { path: "/" })
          ) {
            console.log("setted");
            setTimeout(() => {
              window.location.href = "/myfarm";
            }, 2000);
          } else {
            console.log("Something went wrong");
          }
        }
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error.response || error);
        const er = error.response;
        toast({
          title: "Error",
          description: er.data.message[0].messages[0].message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <AuthLayout title="Sign In" heading="Sign in to your account">
      <Head>
        <meta
          name="facebook-domain-verification"
          content="g2layh6xwk7r1rcqlokjrgqq15mldh"
        />
      </Head>
      <Stack spacing={4}>
        <MainInput
          id="email"
          label="Email address"
          isRequired
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <MainInput
          id="password"
          label="Password"
          isRequired
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Stack spacing={10}>
          <Stack
            direction={{ base: "column", sm: "row" }}
            align={"start"}
            justify={"space-between"}
          >
            <Checkbox colorScheme="green">Remember me</Checkbox>
            <Link color={"green.400"} href="/auth/password/forgot">
              Forgot password?
            </Link>
          </Stack>
          <Stack textAlign="center">
            <MainButton loading={loading} title="Sign In" onClick={fetchApi} />

            <Text>
              Don't have account?{" "}
              <Link color={"green.400"} href="/auth/signup">
                Start Farming
              </Link>
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </AuthLayout>
  );
}
