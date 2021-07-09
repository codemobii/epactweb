import { Box } from "@chakra-ui/layout";

import Head from "next/head";
import Router from "next/router";

import React, { useContext, useState } from "react";
import { GlobalContext } from "../../pages/_app";
import { getStrapiMedia } from "../../utils/media.util";

import FooterLayout from "./footer.layout";
import MainHeader from "./header.layout";
import Loader from "./loader.layout";
import MainBottombarLayout from "./mainbottom.bar";

export default function MainLayout({ children, title = "Home" }) {
  const [loading, setLoading] = useState(false);

  const global = useContext(GlobalContext);

  Router.events.on("routeChangeStart", (url) => {
    console.log(`Loading: ${url}`);
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", () => setLoading(false));
  Router.events.on("routeChangeError", () => setLoading(false));

  return (
    <Box w="100%" minH="100vh" pos="relative" bg="white">
      <Head>
        <title>ePact :: {title}</title>

        <meta property="og:title" content={`ePact :: ${title}`} />
        <meta name="twitter:title" content={`ePact :: ${title}`} />
        <meta property="og:image" content={getStrapiMedia(global.seo_image)} />
        <meta name="twitter:image" content={getStrapiMedia(global.seo_image)} />
        <meta name="image" content={getStrapiMedia(global.seo_image)} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Loader loading={loading} />

      <MainHeader />
      {children}

      <FooterLayout />

      <MainBottombarLayout />
    </Box>
  );
}
