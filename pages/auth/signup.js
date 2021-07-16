import { Link, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import MainButton from "../../components/buttons/main.button";
import MainInput from "../../components/inputs/main.input";
import AuthLayout from "../../components/layouts/auth.layout";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const toast = useToast();

  const router = useRouter();

  const ref = Cookies.get("ref");

  const fetchApi = async () => {
    setLoading(true);
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`, {
        username: username,
        email: email,
        password: password,
      })
      .then(async (user) => {
        if (ref) {
          await axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/users?username=${ref}`, {
              headers: {
                Authorization: `Bearer ${user.data.jwt}`,
              },
            })
            .then((ref) => {
              if (ref.data.length === 0) {
                axios
                  .post(
                    `${process.env.NEXT_PUBLIC_API_URL}/wallets`,
                    {
                      users_permissions_user: user.data.user.id,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${user.data.jwt}`,
                      },
                    }
                  )
                  .then((res) => {
                    setLoading(false);
                    axios
                      .post(`${process.env.NEXT_PUBLIC_API_URL}/emails`, {
                        email: user.data.user.email,
                        message:
                          "Welcome to ePact, your journey through agritech that pays has just started",
                        subject: "Welcome Note from ePact",
                      })
                      .then(() => {
                        if (typeof window != "undefined") {
                          window.location.href = "/auth/signin";
                        }
                      });
                  })
                  .catch((er) => {
                    setLoading(false);
                    console.log(er);
                  });
              } else {
                axios
                  .put(
                    `${process.env.NEXT_PUBLIC_API_URL}/users/${user.data.user.id}`,
                    {
                      referral: ref.data[0].id,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${user.data.jwt}`,
                      },
                    }
                  )
                  .then(() => {
                    axios
                      .post(
                        `${process.env.NEXT_PUBLIC_API_URL}/wallets`,
                        {
                          users_permissions_user: user.data.user.id,
                        },
                        {
                          headers: {
                            Authorization: `Bearer ${user.data.jwt}`,
                          },
                        }
                      )
                      .then((res) => {
                        setLoading(false);

                        axios
                          .post(`${process.env.NEXT_PUBLIC_API_URL}/emails`, {
                            email: user.data.user.email,
                            message:
                              "Welcome to ePact, your journey through agritech that pays has just started",
                            subject: "Welcome Note from ePact",
                          })
                          .then(() => {
                            axios
                              .post(
                                `${process.env.NEXT_PUBLIC_API_URL}/emails`,
                                {
                                  email: ref.data[0].email,
                                  message: `${ref.data[0].username} you have a new referral signup on epact. Keep up the good work!`,
                                  subject: "Referral Signup",
                                }
                              )
                              .then(() => {
                                if (typeof window != "undefined") {
                                  window.location.href = "/auth/signin";
                                }
                              });
                          });
                      })
                      .catch((er) => {
                        setLoading(false);
                        console.log(er);
                      });
                  })
                  .catch((er) => {
                    setLoading(false);
                    console.log(er);
                  });
              }
            })
            .catch((er) => {
              setLoading(false);
              console.log(er);
            });
        } else {
          axios
            .post(
              `${process.env.NEXT_PUBLIC_API_URL}/wallets`,
              {
                users_permissions_user: user.data.user.id,
              },
              {
                headers: {
                  Authorization: `Bearer ${user.data.jwt}`,
                },
              }
            )
            .then((res) => {
              setLoading(false);
              axios
                .post(`${process.env.NEXT_PUBLIC_API_URL}/emails`, {
                  email: user.data.user.email,
                  message:
                    "Welcome to ePact, your journey through agritech that pays has just started",
                  subject: "Welcome Note from ePact",
                })
                .then(() => {
                  if (typeof window != "undefined") {
                    window.location.href = "/auth/signin";
                  }
                });
            })
            .catch((er) => {
              setLoading(false);
              console.log(er);
            });
        }
      })
      .catch((error) => {
        // Handle error.
        const er = error.response;
        setLoading(false);
        toast({
          title: "Error",
          description: er.data.message[0].messages[0].message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    if (router.query.ref && Cookies.set("ref", router.query.ref)) {
      console.log("ref involved");
    }
  }, []);

  return (
    <AuthLayout title="Sign Up" heading="Create your ePact account">
      <Stack spacing={4}>
        <MainInput
          id="username"
          label="Username"
          isRequired
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
          <Stack textAlign="center">
            <MainButton loading={loading} onClick={fetchApi} title="Sign Up" />

            <Text>
              Already have account?{" "}
              <Link color={"green.400"} href="/auth/signin">
                Sign In
              </Link>
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </AuthLayout>
  );
}
