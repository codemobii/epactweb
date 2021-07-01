import {
  Flex,
  Box,
  Stack,
  Link,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import BgIllustration from "../helpers/bg_illus.helper";
import MainLayout from "./main.layout";

export default function AuthLayout({ children, title = "", heading = "" }) {
  return (
    <MainLayout title={title}>
      <Box pos="relative">
        <BgIllustration />
        <Flex minH={"100vh"} align={"center"} justify={"center"} pos="relative">
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading textAlign="center" fontSize={"4xl"}>
                {heading}
              </Heading>
              {/* <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text> */}
            </Stack>
            <Box rounded={"lg"} bgColor="white" boxShadow={"lg"} p={8}>
              {children}
            </Box>
          </Stack>
        </Flex>
      </Box>
    </MainLayout>
  );
}

{
  /* <Stack spacing={4}>
  <FormControl id="email">
    <FormLabel>Email address</FormLabel>
    <Input type="email" />
  </FormControl>
  <FormControl id="password">
    <FormLabel>Password</FormLabel>
    <Input type="password" />
  </FormControl>
  <Stack spacing={10}>
    <Stack
      direction={{ base: "column", sm: "row" }}
      align={"start"}
      justify={"space-between"}
    >
      <Checkbox>Remember me</Checkbox>
      <Link color={"blue.400"}>Forgot password?</Link>
    </Stack>
    <Button
      bg={"blue.400"}
      color={"white"}
      _hover={{
        bg: "blue.500",
      }}
    >
      Sign in
    </Button>
  </Stack>
</Stack>; */
}
