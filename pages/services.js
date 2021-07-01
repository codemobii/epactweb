import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import AboutAddon from "../addons/about.addon";
import BreadcrumbAddon from "../addons/breadcrumb.addon";
import TestimonialsAddon from "../addons/testimonials.addon";
import ServiceCard from "../components/cards/service.card";
import BoxContainer from "../components/layouts/container.layout";
import MainLayout from "../components/layouts/main.layout";
import { fetchAPI } from "../utils/api.util";

export default function Services(props) {
  console.log(props);
  const { services, testimonials } = props;

  return (
    <MainLayout title="Services">
      <BreadcrumbAddon title="Services" links={["Home", "Services"]} />

      <BoxContainer>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing="30px" py="80px">
          {services.map((e, i) => (
            <ServiceCard key={i} data={e} />
          ))}
        </SimpleGrid>
      </BoxContainer>
      <TestimonialsAddon data={testimonials} />
    </MainLayout>
  );
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [services, testimonials] = await Promise.all([
    fetchAPI("/services"),
    fetchAPI("/testimonials"),
  ]);

  return {
    props: { services, testimonials },
    revalidate: 1,
  };
}
