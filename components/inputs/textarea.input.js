import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import React from "react";

export default function TextareaInput({
  id = "message",
  label = "Message",
  isRequired = false,
  read = false,
  value = "",
}) {
  return (
    <FormControl id={id} isReadOnly={read} isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      <Textarea borderColor="green.400" value={value} border="2px" />
      {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
    </FormControl>
  );
}
