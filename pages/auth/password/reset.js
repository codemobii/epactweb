import { Checkbox } from "@chakra-ui/checkbox";
import { Link, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

import MainButton from "../../../components/buttons/main.button";
import MainInput from "../../../components/inputs/main.input";
import AuthLayout from "../../../components/layouts/auth.layout";

export default function ResetPassword({ req, res }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const [NewPassword, setNewPassword] = useState("");
  const [VerifyPassword, setVerifyPassword] = useState("");

  const toast = useToast();

  const code = useRouter().query.code;

  const fetchApi = async () => {
    setLoading(true);
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
        code: code, // code contained in the reset link of step 3.
        password: NewPassword,
        passwordConfirmation: VerifyPassword,
      })
      .then((response) => {
        if (typeof window != "undefined") {
          window.location.href = "/auth/signin";
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
    <AuthLayout title="Reset password" heading="Reset password">
      <Stack spacing={4}>
        <MainInput
          id="password"
          label="New Password"
          isRequired
          type="password"
          value={NewPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <MainInput
          id="password"
          label="Retype Password"
          isRequired
          type="password"
          value={VerifyPassword}
          onChange={(e) => setVerifyPassword(e.target.value)}
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
