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
} from "@chakra-ui/react";
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
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
              ) : (
                <Stack>
                  <MainInput type={type} value={value} label={label} />
                </Stack>
              )}
              <MainButton title="Update" />
            </Stack>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}
