import { Box } from "@chakra-ui/layout";
import axios from "axios";
import emailjs from "emailjs-com";
import React, { useState, useEffect } from "react";
import AdAddon from "../../addons/ad.addon";
import TableAddon from "../../addons/table.addon";
import AccountLayout from "../../components/layouts/account.layout";
import CardLayout from "../../components/layouts/card.layout";
import ContentLoaderLayout from "../../components/layouts/contentloader.layout";
import ListLayout from "../../components/layouts/list.layout";
import { fetchAPI } from "../../utils/api.util";
import { useCookies } from "react-cookie";
import MainButton from "../../components/buttons/main.button";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Tag,
  useToast,
} from "@chakra-ui/react";
import MainInput from "../../components/inputs/main.input";
import TextareaInput from "../../components/inputs/textarea.input";
import Moment from "react-moment";
import OutlineButton from "../../components/buttons/outline.button";
import NumberFormat from "react-number-format";

import { init } from "emailjs-com";
init("user_sJgssHn8SRJeDv2X4BUaE");

export default function Account(props) {
  const { session, contact } = props;

  //   console.log(contact);

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);
  const [amount, setAmount] = useState("");
  const [detail, setDetail] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const ses = JSON.parse(session);

  const toast = useToast();

  const transactionReq = axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/withdrawals?user=${ses && ses.user.id}`,
    {
      headers: {
        Authorization: `Bearer ${ses && ses.jwt}`,
      },
    }
  );

  const getItems = async () => {
    setLoading(true);
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
    getItems();
  }, []);

  const runRequest = async () => {
    setRequesting(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/wallets/${ses.user.wallet.id}`, {
        headers: {
          Authorization: `Bearer ${ses.jwt}`,
        },
      })
      .then((res) => {
        let wallet = res.data;
        if (parseFloat(amount) > wallet.balance) {
          setRequesting(false);
          setIsOpen(false);
          toast({
            title: "Error",
            description: "You don't have enough funds to withdrawal",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else {
          axios
            .post(
              `${process.env.NEXT_PUBLIC_API_URL}/withdrawals`,
              {
                amount: parseFloat(amount),
                account_details: detail,
                user: ses && ses.user.id,
              },
              {
                headers: {
                  Authorization: `Bearer ${ses.jwt}`,
                },
              }
            )
            .then((res) => {
              console.log(res);
              axios
                .put(
                  `${process.env.NEXT_PUBLIC_API_URL}/wallets/${ses.user.wallet.id}`,
                  {
                    balance: wallet.balance - parseFloat(amount),
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${ses.jwt}`,
                    },
                  }
                )
                .then((res) => {
                  console.log(res);
                  setRequesting(false);
                  setIsOpen(false);

                  getItems();

                  toast({
                    title: "Successful",
                    description: `Withdrawal request of ₦${amount} has been submitted for approval, thank you.`,
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });

                  var templateParams = {
                    all_title: "New Withdrawal Request",
                    to_name: "Epact",
                    title: "New Withdrawal Request",
                    message: `${ses.user.username} is requesting for the withdrawal of ₦${amount}. Please review in admin`,
                    to_email: contact.email,
                    from_name: "Epact",
                    from_email: contact.email,
                  };

                  emailjs
                    .send("service_46t5h6g", "template_cagmljv", templateParams)
                    .then(
                      function (response) {
                        console.log("SUCCESS!", response.status, response.text);
                      },
                      function (err) {
                        console.log("FAILED...", err);
                      }
                    );

                  axios.post(`${process.env.NEXT_PUBLIC_API_URL}/emails`, {
                    email: ses.user.email,
                    message: `You have requested withdrawal of ₦${amount}. We just want to acknowledge the request and we will get back to you soon.`,
                    subject: "Withdrawal Request",
                  });
                })
                .catch((er) => {
                  console.log(er);
                  toast({
                    title: "Error",
                    description: "an error occured",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                  });
                });
            })
            .catch((er) => {
              console.log(er);
              setRequesting(false);
              setIsOpen(false);
              if (er.response && er.response.status === 400) {
                toast({
                  title: "Error",
                  description: "amount must be greater than or equal to ₦2500",
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
              } else {
                toast({
                  title: "Error",
                  description: "Something went wrong, try again",
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
              }
            });
        }
      })
      .catch((er) => {
        setRequesting(false);
        console.log(er);
      })
      .finally(() => {
        setAmount("");
        setDetail("");
        getItems();
      });
  };

  const DeleteRequest = async ({ id, amount }) => {
    var answer = window.confirm("Cancel Request?");
    if (answer) {
      setRequesting(true);
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/wallets/${ses.user.wallet.id}`,
          {
            headers: {
              Authorization: `Bearer ${ses.jwt}`,
            },
          }
        )
        .then((res) => {
          let wallet = res.data;
          axios
            .delete(`${process.env.NEXT_PUBLIC_API_URL}/withdrawals/${id}`, {
              headers: {
                Authorization: `Bearer ${ses.jwt}`,
              },
            })
            .then(() => {
              axios
                .put(
                  `${process.env.NEXT_PUBLIC_API_URL}/wallets/${ses.user.wallet.id}`,
                  {
                    balance: wallet.balance + parseFloat(amount),
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${ses.jwt}`,
                    },
                  }
                )
                .then(() => {
                  setRequesting(false);
                  getItems();
                  toast({
                    title: "Success",
                    description: "Request cancelled!",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                })
                .catch((er) => {
                  setRequesting(false);
                  console.log(er);
                });
            })
            .catch((er) => {
              setRequesting(false);
              console.log(er);
              toast({
                title: "Error",
                description: "an error occured",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            });
        })
        .catch((er) => {
          console.log(er);
          setRequesting(false);
          toast({
            title: "Error",
            description: "an error occured",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        })
        .finally(() => {
          getItems();
        });
    }
  };

  return (
    <AccountLayout title="My Withdrawals">
      <CardLayout>
        <Box p="20px">
          <MainButton
            title="Request a withdrawal"
            onClick={() => setIsOpen(true)}
          />
        </Box>
      </CardLayout>

      {loading ? (
        <ContentLoaderLayout loading={loading} />
      ) : (
        <>
          <Box w="100%">
            <CardLayout>
              <ListLayout title="My withdrawals">
                <Table variant="striped">
                  {transactions.length === 0 && (
                    <TableCaption>Nothing Found!</TableCaption>
                  )}
                  <Thead>
                    <Tr>
                      <Th>S/N</Th>
                      <Th>Amount</Th>
                      <Th>Status</Th>
                      <Th>Date</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {transactions.map((data, key) => (
                      <Tr key={key}>
                        <Td>{key + 1}</Td>
                        <Td>
                          <NumberFormat
                            value={data.amount}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"₦"}
                          />
                        </Td>
                        <Td>
                          {data.paid ? (
                            <Tag color="white" bg="green.400">
                              Success
                            </Tag>
                          ) : (
                            <Tag color="white" bg="yellow.400">
                              Pending
                            </Tag>
                          )}
                        </Td>
                        <Td>
                          <Moment format="MMM Do YYYY">
                            {data.created_at}
                          </Moment>
                        </Td>
                        <Td>
                          {data.paid ? (
                            "-"
                          ) : (
                            <OutlineButton
                              onClick={() =>
                                DeleteRequest({
                                  id: data.id,
                                  amount: data.amount,
                                })
                              }
                              title="Cancel"
                              color="green.400"
                              loading={requesting}
                            />
                          )}
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

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} p="20px">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Withdrawal Request</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="20px">
              <MainInput
                type="number"
                label="Amount"
                helper="You cannot withdraw less than ₦2,500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                isRequired
              />
              <TextareaInput
                label="You account details"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                isRequired
              />
              <MainButton
                title="Request"
                loading={requesting}
                onClick={runRequest}
              />
            </Stack>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </AccountLayout>
  );
}

export async function getServerSideProps({ req }) {
  // Run API calls in parallel
  const [contact] = await Promise.all([fetchAPI("/contact")]);

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
    props: { session: session.session, contact },
  };
}
