import { Button } from "@chakra-ui/button";
import React from "react";

export default function OutlineButton({
  title = "Button",
  onClick = () => {},
  loading = false,
  link = false,
  color = "white",
  size = "lg",
}) {
  return (
    <Button
      fontSize={"sm"}
      fontWeight={"bold"}
      color={color}
      bg="transparent"
      border="2px"
      borderColor={"green.400"}
      href={link ? link : undefined}
      _hover={{
        bg: "green.300",
        borderColor: "green.300",
        color: "white",
      }}
      _active={{
        bg: "green.500",
        color: "white",
        transform: "scale(0.8)",
      }}
      px="50px"
      rounded="full"
      size={size}
      as={link ? "a" : "button"}
      onClick={onClick}
      isLoading={loading}
      loadingText="Loading"
    >
      {title}
    </Button>
  );
}
