import React from "react";
import AboutAddon from "../addons/about.addon";
import BreadcrumbAddon from "../addons/breadcrumb.addon";
import PartnerAddon from "../addons/partners.addon";
import ServicesAddon from "../addons/services.addon";
import TeamAddon from "../addons/team.addon";
import TestimonialsAddon from "../addons/testimonials.addon";
import MainLayout from "../components/layouts/main.layout";
import { fetchAPI } from "../utils/api.util";

export default function About(props) {
  console.log(props);

  const { about, aboutTwo, services, testimonials, team } = props;

  return (
    <MainLayout title="About">
      <BreadcrumbAddon title="About Us" links={["Home", "About"]} />
      <AboutAddon
        title={about.heading}
        image={about.image}
        description={about.description}
      />
      <ServicesAddon isBg data={services} />
      <PartnerAddon
        title={aboutTwo.heading}
        image={aboutTwo.image}
        description={aboutTwo.description}
      />
      <TeamAddon data={team} />
      <TestimonialsAddon data={testimonials} isWhiteBg />
    </MainLayout>
  );
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [header, about, aboutTwo, services, testimonials, team] =
    await Promise.all([
      fetchAPI("/home-header"),
      fetchAPI("/about-us-card-one"),
      fetchAPI("/about-us-card-two"),
      fetchAPI("/services"),
      fetchAPI("/testimonials"),
      fetchAPI("/epact-teams"),
    ]);

  return {
    props: { header, about, aboutTwo, services, testimonials, team },
    revalidate: 1,
  };
}
