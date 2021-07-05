import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";

export default function MainInput({
  id = "",
  label = "",
  isRequired = false,
  type = "email",
  read = false,
  value = "",
  onChange = () => {
    //
  },
}) {
  return (
    <FormControl id={id} isReadOnly={read} isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      <Input
        borderColor="green.400"
        onChange={onChange}
        value={value}
        border="2px"
        type={type}
      />
      {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
    </FormControl>
  );
}
