import React from "react";

import BreadcrumbAddon from "../addons/breadcrumb.addon";
import ContactAddon from "../addons/contact.addon";
import MapAddon from "../addons/map.addon";
import MainLayout from "../components/layouts/main.layout";
import { fetchAPI } from "../utils/api.util";

export default function Contact(props) {
  const { contact } = props;

  return (
    <MainLayout title="Contact">
      <BreadcrumbAddon title="Contact Us" links={["Home", "Contact"]} />
      <ContactAddon contact={contact} />
      <MapAddon link={contact.map_link} />
    </MainLayout>
  );
}

export async function getServerSideProps({ req }) {
  // Run API calls in parallel
  const [contact] = await Promise.all([fetchAPI("/contact")]);

  return {
    props: { contact },
  };
}
