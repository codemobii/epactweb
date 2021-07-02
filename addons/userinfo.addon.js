import {
  Box,
  Flex,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import MainButton from "../components/buttons/main.button";
import MainInput from "../components/inputs/main.input";
import CardLayout from "../components/layouts/card.layout";

export default function UserinfoAddon({
  label = null,
  value = null,
  icon = null,
  isEdit = false,
  type = "",
  id = "",
  jwt = "",
  update = false,

  onEnd = () => {
    //
  },
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [text, setText] = useState(value);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const handleEdit = async () => {
    setLoading(true);
    await axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
        {
          phone: type === "phone" ? text : value,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((res) => {
        toast({
          title: "Success",
          description: "Update successful!",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        onEnd();
      })
      .catch((er) => {
        console.log(er);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <CardLayout>
        <Flex
          onClick={onOpen}
          cursor="pointer"
          pointerEvents={!isEdit && "none"}
          align="center"
          p="20px"
          justify="space-between"
        >
          <HStack>
            {icon && (
              <Box fontSize="20" color="gray.600">
                {icon}
              </Box>
            )}
            <Stack>
              {label && <Text color="gray.500">{label}</Text>}
              {value && <Text fontSize="lg">{value}</Text>}
            </Stack>
          </HStack>
          <BsChevronRight />
        </Flex>
      </CardLayout>

      <Modal isOpen={isOpen} onClose={onClose} p="20px">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{label}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="20px">
              {type === "password" ? (
                <Stack>
                  <MainInput type={type} value={value} label="Old password" />
                  <MainInput type={type} value={value} label="New password" />
                  <MainInput
                    type={type}
                    value={value}
                    label="Confirm password"
                  />
                </Stack>
              ) : type === "phone" ? (
                <Stack>
                  <MainInput
                    type={type}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    label={label}
                    read={update}
                  />
                </Stack>
              ) : (
                <Stack>
                  <MainInput
                    type={type}
                    value={value}
                    label={label}
                    read={update}
                  />
                </Stack>
              )}
              {update && (
                <MainButton
                  loading={loading}
                  onClick={handleEdit}
                  title="Update"
                />
              )}
            </Stack>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}
