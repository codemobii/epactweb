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
  FormControl,
  FormLabel,
  FormHelperText,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
  Link,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import MainButton from "../../../components/buttons/main.button";
import MainInput from "../../../components/inputs/main.input";
import AccountLayout from "../../../components/layouts/account.layout";
import CardLayout from "../../../components/layouts/card.layout";
import { fetchAPI } from "../../../utils/api.util";
import { getStrapiMedia } from "../../../utils/media.util";
import { GlobalContext } from "../../_app";
import { useCookies } from "react-cookie";
import ReactMarkdown from "react-markdown";
import NumberFormat from "react-number-format";

export default function Account(props) {
  const { project } = props;

  const [cookies, setCookie] = useCookies(["session"]);

  const session = cookies.session;

  const global = useContext(GlobalContext);

  const [amount, setAmount] = useState(project.minimum);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(false);

  const [investmentCount, setInvestmentCount] = useState(0);

  const countInvestments = () => {
    axios
      .get(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/transactions/count?users_permissions_user=${
          session && session.user.id
        }`,
        {
          headers: {
            Authorization: `Bearer ${session && session.jwt}`,
          },
        }
      )
      .then((res) => {
        setInvestmentCount(res.data);
        console.log(res.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const toast = useToast();

  const format = (val) => `₦` + val;
  const parse = (val) => val.replace(/^\₦/, "");

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
    setName(session.user.username);

    countInvestments();
  }, []);

  async function MakePayment(e) {
    e.preventDefault();
    const formRef = makeRef(20);
    setLoading(true);
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
        const numI = res.data.total_investment || 0;

        const ROI = res.data.ROI || 0;

        if (coupon !== "") {
          axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/credit-codes/${coupon}`, {
              headers: {
                Authorization: `Bearer ${
                  cookies.session && cookies.session.jwt
                }`,
              },
            })
            .then((res) => {
              let codeId;

              if (res.data.Expired) {
                setLoading(false);
                console.log("error 1");
                toast({
                  title: "Error",
                  description: "Credit code has been used!",
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
              } else if (res.data.amount < parseFloat(amount)) {
                setLoading(false);
                console.log("error 2");
                toast({
                  title: "Error",
                  description:
                    "Credit code amoucnt is less than your investment amount!",
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
              } else {
                console.log("started");
                if (res.data.amount >= parseFloat(amount)) {
                  console.log("error 3");
                  codeId = res.data._id;
                  axios
                    .post(
                      `${process.env.NEXT_PUBLIC_API_URL}/transactions`,
                      {
                        title: `Invested in ${project.title}`,
                        description: `You invested in ${project.title} with the total sum of ₦${amount} using the coupon code ${coupon}`,
                        amount: amount,
                        project: project._id,
                        users_permissions_user: session.user._id,
                        type: "project",
                        paid: true,
                        // transaction_id: coupon,
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${session.jwt}`,
                        },
                      }
                    )
                    .then(async (res) => {
                      console.log("transact");
                      await axios
                        .put(
                          `${process.env.NEXT_PUBLIC_API_URL}/wallets/${
                            cookies.session &&
                            cookies.session.user &&
                            cookies.session.user.wallet.id
                          }`,
                          {
                            total_investment: numI + parseFloat(amount),
                            ROI:
                              ROI +
                              (project.interest / 100) *
                                amount *
                                project.how_many_months_for_income,
                          },
                          {
                            headers: {
                              Authorization: `Bearer ${
                                cookies.session && cookies.session.jwt
                              }`,
                            },
                          }
                        )
                        .then(async (res) => {
                          await axios
                            .put(
                              `${process.env.NEXT_PUBLIC_API_URL}/credit-codes/${codeId}`,
                              {
                                Expired: true,
                                use_date: new Date(),
                                user: cookies.session.user.id,
                              },
                              {
                                headers: {
                                  Authorization: `Bearer ${
                                    cookies.session && cookies.session.jwt
                                  }`,
                                },
                              }
                            )
                            .then((res) => {
                              if (
                                session.user.referral &&
                                investmentCount === 0
                              ) {
                                axios
                                  .get(
                                    `${process.env.NEXT_PUBLIC_API_URL}/users/${session.user.referral}`,
                                    {
                                      headers: {
                                        Authorization: `Bearer ${
                                          cookies.session && cookies.session.jwt
                                        }`,
                                      },
                                    }
                                  )
                                  .then((res) => {
                                    console.log(res);
                                    const refW = res.data.wallet.id;
                                    const refB = res.data.wallet.balance;
                                    let refE = res.data.email;
                                    axios
                                      .put(
                                        `${process.env.NEXT_PUBLIC_API_URL}/wallets/${refW}`,
                                        {
                                          balance:
                                            refB +
                                            (project.referral_bonus / 100) *
                                              amount,
                                        },
                                        {
                                          headers: {
                                            Authorization: `Bearer ${
                                              cookies.session &&
                                              cookies.session.jwt
                                            }`,
                                          },
                                        }
                                      )
                                      .then((res) => {
                                        axios
                                          .post(
                                            `${process.env.NEXT_PUBLIC_API_URL}/transactions`,
                                            {
                                              title: `Referral Bonus!`,
                                              description: `You recieved referral bonus of ₦${
                                                (project.referral_bonus / 100) *
                                                amount
                                              } from ${session.user.username}`,
                                              amount:
                                                (project.referral_bonus / 100) *
                                                amount,
                                              project: project._id,
                                              users_permissions_user:
                                                session.user.referral,
                                              type: "bonus",
                                              paid: true,
                                              // transaction_id: coupon,
                                            },
                                            {
                                              headers: {
                                                Authorization: `Bearer ${session.jwt}`,
                                              },
                                            }
                                          )
                                          .then((res) => {
                                            console.log("Done", res);

                                            axios
                                              .post(
                                                `${process.env.NEXT_PUBLIC_API_URL}/emails`,
                                                {
                                                  email: refE,
                                                  message: `You recieved referral bonus of ₦${
                                                    (project.referral_bonus /
                                                      100) *
                                                    amount
                                                  }! Continue using ePact.`,
                                                  subject: "Refferal Bonus",
                                                }
                                              )
                                              .then(() => {
                                                axios
                                                  .post(
                                                    `${process.env.NEXT_PUBLIC_API_URL}/emails`,
                                                    {
                                                      email:
                                                        cookies.session.user
                                                          .email,
                                                      message: `Your investment in the project ${
                                                        project.title
                                                      } was successful.<br />
                                              Amount invested: ₦${amount}<br />
                                              Total ROI: ₦${
                                                (project.interest / 100) *
                                                amount *
                                                project.how_many_months_for_income
                                              }<br />
                                              Project Details<br />
                                              ${project.description}`,
                                                      subject: `Invested in ${project.title}`,
                                                    }
                                                  )
                                                  .then(() => {
                                                    setLoading(false);
                                                    alert(
                                                      "Investment processed!"
                                                    );
                                                    window.location.href =
                                                      "/myfarm/projects";
                                                  });
                                              });
                                          });
                                      });
                                  });
                              } else {
                                axios
                                  .post(
                                    `${process.env.NEXT_PUBLIC_API_URL}/emails`,
                                    {
                                      email: cookies.session.user.email,
                                      message: `Your investment in the project ${
                                        project.title
                                      } was successful.<br />
                                              Amount invested: ₦${amount}<br />
                                              Total ROI: ₦${
                                                (project.interest / 100) *
                                                amount *
                                                project.how_many_months_for_income
                                              }<br />
                                              Project Details<br />
                                              ${project.description}`,
                                      subject: `Invested in ${project.title}`,
                                    }
                                  )
                                  .then(() => {
                                    setLoading(false);
                                    alert("Investment processed!");
                                    window.location.href = "/myfarm/projects";
                                  });
                              }
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
              }
            })
            .catch((er) => {
              console.log(er);
              setLoading(false);
              if (er.response && er.response.status === 500) {
                toast({
                  title: "Error",
                  description: "Credit code not found!",
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
              }
            });
        } else {
          setLoading(false);
          toast({
            title: "Error",
            description: "Please enter a credit code.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
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
                  axios
                    .post(
                      `${process.env.NEXT_PUBLIC_API_URL}/transactions`,
                      {
                        title: `Invested in ${project.title}`,
                        description: `You invested in ${project.title} with the total sum of ₦${amount} using the coupon code ${coupon}`,
                        amount: amount,
                        project: project._id,
                        users_permissions_user: session.user._id,
                        type: "project",
                        paid: true,
                        // transaction_id: coupon,
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${session.jwt}`,
                        },
                      }
                    )
                    .then(async (res) => {
                      console.log("transact");
                      await axios
                        .put(
                          `${process.env.NEXT_PUBLIC_API_URL}/wallets/${
                            cookies.session &&
                            cookies.session.user &&
                            cookies.session.user.wallet.id
                          }`,
                          {
                            total_investment: numI + parseFloat(amount),
                            ROI:
                              ROI +
                              (project.interest / 100) *
                                amount *
                                project.how_many_months_for_income,
                          },
                          {
                            headers: {
                              Authorization: `Bearer ${
                                cookies.session && cookies.session.jwt
                              }`,
                            },
                          }
                        )
                        .then(async (res) => {
                          if (session.user.referral && investmentCount === 0) {
                            axios
                              .get(
                                `${process.env.NEXT_PUBLIC_API_URL}/users/${session.user.referral}`,
                                {
                                  headers: {
                                    Authorization: `Bearer ${
                                      cookies.session && cookies.session.jwt
                                    }`,
                                  },
                                }
                              )
                              .then((res) => {
                                console.log(res);
                                const refW = res.data.wallet.id;
                                const refB = res.data.wallet.balance;
                                let refE = res.data.email;
                                axios
                                  .put(
                                    `${process.env.NEXT_PUBLIC_API_URL}/wallets/${refW}`,
                                    {
                                      balance:
                                        refB +
                                        (project.referral_bonus / 100) * amount,
                                    },
                                    {
                                      headers: {
                                        Authorization: `Bearer ${
                                          cookies.session && cookies.session.jwt
                                        }`,
                                      },
                                    }
                                  )
                                  .then((res) => {
                                    axios
                                      .post(
                                        `${process.env.NEXT_PUBLIC_API_URL}/transactions`,
                                        {
                                          title: `Referral Bonus!`,
                                          description: `You recieved referral bonus of ₦${
                                            (project.referral_bonus / 100) *
                                            amount
                                          } from ${session.user.username}`,
                                          amount:
                                            (project.referral_bonus / 100) *
                                            amount,
                                          project: project._id,
                                          users_permissions_user:
                                            session.user.referral,
                                          type: "bonus",
                                          paid: true,
                                          // transaction_id: coupon,
                                        },
                                        {
                                          headers: {
                                            Authorization: `Bearer ${session.jwt}`,
                                          },
                                        }
                                      )
                                      .then((res) => {
                                        console.log("Done", res);

                                        axios
                                          .post(
                                            `${process.env.NEXT_PUBLIC_API_URL}/emails`,
                                            {
                                              email: refE,
                                              message: `You recieved referral bonus of ₦${
                                                (project.referral_bonus / 100) *
                                                amount
                                              }! Continue using ePact.`,
                                              subject: "Refferal Bonus",
                                            }
                                          )
                                          .then(() => {
                                            axios
                                              .post(
                                                `${process.env.NEXT_PUBLIC_API_URL}/emails`,
                                                {
                                                  email:
                                                    cookies.session.user.email,
                                                  message: `Your investment in the project ${
                                                    project.title
                                                  } was successful.<br />
                                              Amount invested: ₦${amount}<br />
                                              Total ROI: ₦${
                                                (project.interest / 100) *
                                                amount *
                                                project.how_many_months_for_income
                                              }<br />
                                              Project Details<br />
                                              ${project.description}`,
                                                  subject: `Invested in ${project.title}`,
                                                }
                                              )
                                              .then(() => {
                                                setLoading(false);
                                                alert("Investment processed!");
                                                window.location.href =
                                                  "/myfarm/projects";
                                              });
                                          });
                                      });
                                  });
                              });
                          } else {
                            axios
                              .post(
                                `${process.env.NEXT_PUBLIC_API_URL}/emails`,
                                {
                                  email: cookies.session.user.email,
                                  message: `Your investment in the project ${
                                    project.title
                                  } was successful.<br />
                                              Amount invested: ₦${amount}<br />
                                              Total ROI: ₦${
                                                (project.interest / 100) *
                                                amount *
                                                project.how_many_months_for_income
                                              }<br />
                                              Project Details<br />
                                              ${project.description}`,
                                  subject: `Invested in ${project.title}`,
                                }
                              )
                              .then(() => {
                                setLoading(false);
                                alert("Investment processed!");
                                window.location.href = "/myfarm/projects";
                              });
                          }
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
                })
                .catch((er) => console.log(er));
            },
            customizations: {
              title: global.website_title,
              description: `Invest in ${project.title}`,
              logo: getStrapiMedia(global.favIcon),
            },
          });
        }
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

            <ReactMarkdown children={project.description} />
          </Stack>
        </CardLayout>
        <CardLayout>
          <Stack spacing="30px" p="20px">
            <HStack>
              <MainInput
                type="name"
                isRequired
                label="Username"
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

            <FormControl>
              <FormLabel>Amount to invest</FormLabel>
              <NumberInput
                step={project.minimum}
                min={project.minimum}
                max={project.maximum}
                onChange={(valueString) => setAmount(parse(valueString))}
                value={format(amount)}
              >
                <NumberInputField readOnly />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormHelperText>
                You can only invest from{" "}
                <NumberFormat
                  value={project.minimum}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₦"}
                />{" "}
                to{" "}
                <NumberFormat
                  value={project.maximum}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₦"}
                />
                , use the stepper buttons to increase/decrease amount.
              </FormHelperText>
            </FormControl>
            {/* <MainInput
              type="number"
              isRequired
              label="Amount to invest"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            /> */}

            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              alignItems="flex-end"
              maxW="600px"
              spacing="20px"
            >
              <MainInput
                type="text"
                label={
                  <Text>
                    Have a credit code? (or{" "}
                    <Link color="green.500" href="/pages/vendors">
                      Buy now
                    </Link>
                    )
                  </Text>
                }
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <MainButton
                title="Invest"
                onClick={MakePayment}
                loading={loading}
              />
            </SimpleGrid>
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
