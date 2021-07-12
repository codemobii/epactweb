import { Image } from "@chakra-ui/image";
import {
  Box,
  Center,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/layout";
import React from "react";
import { useState } from "react";
import MainButton from "../components/buttons/main.button";
import TitleHelper from "../components/helpers/title.helper";
import MainInput from "../components/inputs/main.input";
import TextareaInput from "../components/inputs/textarea.input";
import BoxContainer from "../components/layouts/container.layout";
import { getStrapiMedia } from "../utils/media.util";
import emailjs from "emailjs-com";

import { init } from "emailjs-com";
import { useToast } from "@chakra-ui/react";
init("user_sJgssHn8SRJeDv2X4BUaE");

export default function ContactAddon({ contact = {} }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const sendMessage = (e) => {
    e.preventDefault();
    setLoading(true);
    var templateParams = {
      all_title: "Hello Epact",
      to_name: "Epact",
      title: "Contact Message",
      message: `${message}; my name is ${name}, you can reach me on ${phone} or ${email}`,
      to_email: contact.email,
      from_name: name,
      from_email: email,
    };

    emailjs.send("service_46t5h6g", "template_cagmljv", templateParams).then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        toast({
          title: "Successful",
          description: `Your message was recieved, thanks for contacting us.`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setLoading(false);
      },
      function (err) {
        console.log("FAILED...", err);
        setLoading(false);
      }
    );
  };

  return (
    <Box pos="relative" py="80px">
      <BoxContainer>
        <SimpleGrid columns={{ base: "1", md: "2" }} spacing="30px">
          <Box>
            <Image
              w="100%"
              h="380px"
              src={getStrapiMedia(contact.image)}
              objectFit="cover"
              objectPosition="center"
            />
          </Box>
          <form onSubmit={sendMessage}>
            <Stack spacing="30px">
              <TitleHelper>Send us a feedback</TitleHelper>

              <Stack>
                <MainInput
                  id="name"
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  isRequired
                  type="text"
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
                  id="phone"
                  label="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="phone"
                />
                <TextareaInput
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  label="Message"
                  isRequired
                />
              </Stack>

              <Box mt="20px">
                <MainButton title="Submit" isSubmit loading={loading} />
              </Box>
            </Stack>
          </form>
        </SimpleGrid>
      </BoxContainer>
    </Box>
  );
}
