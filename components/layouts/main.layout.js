import { Box } from "@chakra-ui/layout";

import Head from "next/head";
import Router from "next/router";

import React, { useState } from "react";

import FooterLayout from "./footer.layout";
import MainHeader from "./header.layout";
import Loader from "./loader.layout";
import MainBottombarLayout from "./mainbottom.bar";

export default function MainLayout({ children, title = "Home", fullSeo = {} }) {
  const [loading, setLoading] = useState(false);

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

        {fullSeo.metaTitle && (
          <>
            <meta property="og:title" content={fullSeo.metaTitle} />
            <meta name="twitter:title" content={fullSeo.metaTitle} />
          </>
        )}
        {fullSeo.metaDescription && (
          <>
            <meta name="description" content={fullSeo.metaDescription} />
            <meta property="og:description" content={fullSeo.metaDescription} />
            <meta
              name="twitter:description"
              content={fullSeo.metaDescription}
            />
          </>
        )}
        {fullSeo.shareImage && (
          <>
            <meta property="og:image" content={fullSeo.shareImage} />
            <meta name="twitter:image" content={fullSeo.shareImage} />
            <meta name="image" content={fullSeo.shareImage} />
          </>
        )}
        {fullSeo.article && <meta property="og:type" content="article" />}
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
