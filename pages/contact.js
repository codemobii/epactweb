import React from "react";

import BreadcrumbAddon from "../addons/breadcrumb.addon";
import ContactAddon from "../addons/contact.addon";
import MapAddon from "../addons/map.addon";
import MainLayout from "../components/layouts/main.layout";

export default function Contact() {
  return (
    <MainLayout title="Contact">
      <BreadcrumbAddon title="Contact Us" links={["Home", "Contact"]} />
      <ContactAddon />
      <MapAddon />
    </MainLayout>
  );
}
