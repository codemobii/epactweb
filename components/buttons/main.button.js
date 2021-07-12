import { Button } from "@chakra-ui/button";
import React from "react";

export default function MainButton({
  title = "Button",
  onClick = () => {},
  loading = false,
  link = false,
  isSubmit = false,
}) {
  return (
    <Button
      fontSize={"sm"}
      fontWeight={"bold"}
      color={"white"}
      bg={"green.400"}
      href={link ? link : undefined}
      _hover={{
        bg: "green.300",
      }}
      _active={{
        bg: "green.500",
        transform: "scale(0.8)",
      }}
      px="50px"
      rounded="full"
      size="lg"
      as={link ? "a" : "button"}
      onClick={onClick}
      isLoading={loading}
      loadingText="Loading"
      type={isSubmit ? "submit" : "button"}
    >
      {title}
    </Button>
  );
}
