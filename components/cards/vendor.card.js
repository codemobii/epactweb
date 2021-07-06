import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { useContext } from "react";
import { GlobalContext } from "../../pages/_app";
import { getStrapiMedia } from "../../utils/media.util";
import MainButton from "../buttons/main.button";

export default function VendorCard({ data }) {
  const global = useContext(GlobalContext);
  return (
    <Box
      maxW={"100%"}
      w={"full"}
      bg={useColorModeValue("white", "gray.800")}
      border="1px"
      borderColor="gray.200"
      rounded={"md"}
      overflow={"hidden"}
    >
      <Image
        h={"120px"}
        w={"full"}
        src={getStrapiMedia(global.vendor_card_banner)}
        objectFit={"cover"}
      />
      <Flex justify={"center"} mt={-12}>
        <Avatar
          size={"xl"}
          src={getStrapiMedia(data.image)}
          alt={data.name}
          css={{
            border: "4px solid white",
          }}
          name={data.name}
        />
      </Flex>

      <Box p={6}>
        <Stack spacing={0} align={"center"} mb={5}>
          <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
            {data.name}
          </Heading>
          <Text color={"gray.500"}>{data.phone}</Text>
        </Stack>

        <Center>
          <MainButton link={data.chat_link} title="Contact" />
        </Center>
      </Box>
    </Box>
  );
}
