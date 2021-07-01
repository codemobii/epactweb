import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Tag,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Moment from "react-moment";
import MainInput from "../components/inputs/main.input";
import TextareaInput from "../components/inputs/textarea.input";

export default function TableAddon({
  tableTitles = ["S/N", "Title", "Description", "Status", "Date"],
  data = [],
}) {
  const [activeContent, setActiveContent] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Table variant="striped">
        {data.length === 0 && <TableCaption>Nothing Found!</TableCaption>}
        <Thead>
          <Tr>
            {tableTitles.map((data, key) => (
              <Th key={key}>{data}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((data, key) => (
            <Tr
              cursor="pointer"
              onClick={() => {
                setActiveContent(data);
                setIsOpen(true);
              }}
              key={key}
            >
              <Td>{key + 1}</Td>
              <Td>{data.title}</Td>
              <Td>{data.description}</Td>
              <Td>
                {data.paid ? (
                  <Tag color="white" bg="green.400">
                    Success
                  </Tag>
                ) : (
                  <Tag color="white" bg="red.400">
                    Failed
                  </Tag>
                )}
              </Td>
              <Td>
                <Moment format="MMM Do YYYY">{data.created_at}</Moment>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} p="20px">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Transaction Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="20px">
              <MainInput
                read
                label="Title"
                value={activeContent.title && activeContent.title}
              />
              <TextareaInput
                read
                label="Description"
                value={activeContent.description && activeContent.description}
              />
              <MainInput
                read
                label="Amount"
                value={activeContent.amount && activeContent.amount}
              />
              <MainInput
                read
                label="Project"
                value={activeContent.project && activeContent.project.title}
              />
            </Stack>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}
