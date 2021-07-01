import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import React from "react";
import BoxContainer from "../components/layouts/container.layout";

export default function FaqsAddon({ data = [] }) {
  return (
    <Box py="80px">
      <BoxContainer>
        <Accordion defaultIndex={[0]} allowMultiple>
          {data.map((e, i) => (
            <AccordionItem key={i}>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontSize="xl">
                    {e.question}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>{e.answer}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </BoxContainer>
    </Box>
  );
}
