import { Heading, Stack, Text } from "@chakra-ui/layout";
import React from "react";
import MainButton from "../components/buttons/main.button";
import BoxContainer from "../components/layouts/container.layout";
import MainLayout from "../components/layouts/main.layout";

export default function Custom404() {
  return (
    <MainLayout>
      <BoxContainer>
        <Stack align="center" textAlign="center" spacing="30px" py="80px">
          <Icon />
          <Stack>
            <Heading fontSize="5xl">Ohh Snap!</Heading>
            <Text>We couldn't find the page you were looking for.</Text>
          </Stack>
          <MainButton title="Go to Home" link="/" />
        </Stack>
      </BoxContainer>
    </MainLayout>
  );
}

const Icon = () => (
  <svg version="1.1" width="230" height="230" x="0" y="0" viewBox="0 0 64 64">
    <g>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="m60 21h-44a3.009 3.009 0 0 0 -3 3v7h50v-7a3.009 3.009 0 0 0 -3-3zm-40 6h-2a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2zm6 0h-2a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2zm6 0h-2a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2z"
        fill="#5fd14f"
        data-original="#c4a2fc"
      />
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="m45 54a3 3 0 0 0 6 0v-.326a33.02 33.02 0 0 0 -6-1.918z"
        fill="#5fd14f"
        data-original="#c4a2fc"
      />
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="m13 60a3.009 3.009 0 0 0 3 3h44a3.009 3.009 0 0 0 3-3v-27h-50zm41.883-5.529a1 1 0 0 1 -1.354.412c-.2-.105-.392-.2-.588-.3a4.987 4.987 0 0 1 -9.941-.583v-2.614a32.974 32.974 0 0 0 -20.529 3.5 1 1 0 0 1 -.942-1.766 35 35 0 0 1 30.854-1.02l.014.006c.687.31 1.378.643 2.074 1.014a1 1 0 0 1 .412 1.351zm-32.883-19.471h32a1 1 0 0 1 0 2h-32a1 1 0 0 1 0-2zm0 8h32a1 1 0 0 1 0 2h-32a1 1 0 0 1 0-2z"
        fill="#5fd14f"
        data-original="#c4a2fc"
      />
      <g xmlns="http://www.w3.org/2000/svg" fill="#151a6a">
        <path
          d="m48 1h-44a3 3 0 0 0 -3 3v36a3 3 0 0 0 3 3h44a3 3 0 0 0 3-3v-36a3 3 0 0 0 -3-3zm-44 2h44a1 1 0 0 1 1 1v5h-46v-5a1 1 0 0 1 1-1zm44 38h-44a1 1 0 0 1 -1-1v-29h46v29a1 1 0 0 1 -1 1z"
          fill="#0d0f3a"
          data-original="#151a6a"
        />
        <path
          d="m6 7h2a1 1 0 0 0 0-2h-2a1 1 0 0 0 0 2z"
          fill="#0d0f3a"
          data-original="#151a6a"
        />
        <path
          d="m12 7h2a1 1 0 0 0 0-2h-2a1 1 0 0 0 0 2z"
          fill="#0d0f3a"
          data-original="#151a6a"
        />
        <path
          d="m18 7h2a1 1 0 0 0 0-2h-2a1 1 0 0 0 0 2z"
          fill="#0d0f3a"
          data-original="#151a6a"
        />
        <path
          d="m13.919 31h.009a1 1 0 0 0 1-.991c0-.4.016-1.737.029-3.436h1.043a1 1 0 0 0 0-2h-1.029c.025-3.736.042-8.076-.007-8.621a2.1 2.1 0 0 0 -1.355-1.869 2.008 2.008 0 0 0 -2.2.786c-.909 1.049-5.729 9.266-6.276 10.2a1 1 0 0 0 .867 1.504h6.957c-.009 1.211-.019 2.382-.029 3.418a1 1 0 0 0 .991 1.009zm-6.17-6.427c2.018-3.416 4.663-7.8 5.176-8.395.016-.02.032-.036.047-.052.037.429.025 4.381 0 8.445z"
          fill="#0d0f3a"
          data-original="#151a6a"
        />
        <path
          d="m46 24.573h-1.029c.024-3.736.042-8.076-.007-8.621a2.094 2.094 0 0 0 -1.355-1.869 2.018 2.018 0 0 0 -2.2.786c-.906 1.049-5.727 9.266-6.274 10.2a1 1 0 0 0 .865 1.504h6.957c-.009 1.212-.019 2.382-.028 3.418a1 1 0 0 0 .991 1.009h.009a1 1 0 0 0 1-.991c0-.4.015-1.737.028-3.436h1.043a1 1 0 0 0 0-2zm-3.029 0h-5.222c2.018-3.416 4.663-7.8 5.175-8.395.016-.02.033-.036.048-.052.037.432.028 4.383-.001 8.447z"
          fill="#0d0f3a"
          data-original="#151a6a"
        />
        <path
          d="m26 31a5.234 5.234 0 0 0 5.286-5.168v-6.664a5.287 5.287 0 0 0 -10.572 0v6.664a5.234 5.234 0 0 0 5.286 5.168zm-3.286-11.832a3.288 3.288 0 0 1 6.572 0v6.664a3.288 3.288 0 0 1 -6.572 0z"
          fill="#0d0f3a"
          data-original="#151a6a"
        />
        <path
          d="m38 37h-24a1 1 0 0 0 0 2h24a1 1 0 0 0 0-2z"
          fill="#0d0f3a"
          data-original="#151a6a"
        />
      </g>
    </g>
  </svg>
);
