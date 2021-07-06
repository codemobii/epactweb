import { SimpleGrid } from "@chakra-ui/react";
import React from "react";

import BreadcrumbAddon from "../../addons/breadcrumb.addon";
import BoxContainer from "../../components/layouts//container.layout";
import VendorCard from "../../components/cards/vendor.card";
import MainLayout from "../../components/layouts/main.layout";
import { fetchAPI } from "../../utils/api.util";

export default function Vendors({ vendors }) {
  return (
    <MainLayout title="Credit Code Vendors">
      <BreadcrumbAddon
        title="Credit Code Vendors"
        links={["Home", "Vendors"]}
      />

      <BoxContainer>
        <SimpleGrid py="50px" spacing="20px" columns={{ base: 1, md: 3 }}>
          {vendors.map((data, key) => (
            <VendorCard data={data} key={key} />
          ))}
        </SimpleGrid>
      </BoxContainer>
    </MainLayout>
  );
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [vendors] = await Promise.all([fetchAPI("/vendors")]);

  return {
    props: { vendors },
    revalidate: 1,
  };
}
