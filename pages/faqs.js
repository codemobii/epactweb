import React from "react";
import BreadcrumbAddon from "../addons/breadcrumb.addon";
import FaqsAddon from "../addons/faqs.addon";
import MainLayout from "../components/layouts/main.layout";
import { fetchAPI } from "../utils/api.util";

export default function Faqs({ faqs }) {
  return (
    <MainLayout title="FAQs">
      <BreadcrumbAddon
        title="Frequently Asked Questions"
        links={["Home", "FAQs"]}
      />
      <FaqsAddon data={faqs} />
    </MainLayout>
  );
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [faqs] = await Promise.all([fetchAPI("/faqs")]);

  return {
    props: { faqs },
    revalidate: 1,
  };
}
