import { Checkbox } from "@chakra-ui/checkbox";
import { Link, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

import MainButton from "../../../components/buttons/main.button";
import MainInput from "../../../components/inputs/main.input";
import AuthLayout from "../../../components/layouts/auth.layout";

export default function ForgotPassword({ req, res }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const toast = useToast();

  const fetchApi = async () => {
    setLoading(true);
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
        email: email,
      })
      .then((response) => {
        if (typeof window != "undefined") {
          window.location.href = "/auth/password/reset";
        }
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error.response || error);
        const er = error.response;
        toast({
          title: "Error",
          description:
            er.data.message[0].messages[0].message ||
            "Something went wrong, try again",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <AuthLayout title="Forgot password" heading="Forgot password">
      <Stack spacing={4}>
        <MainInput
          id="email"
          label="Email address"
          isRequired
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Stack spacing={10}>
          <Stack textAlign="center">
            <MainButton loading={loading} title="Continue" onClick={fetchApi} />
          </Stack>
        </Stack>
      </Stack>
    </AuthLayout>
  );
}
