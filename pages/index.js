import React from "react";
import AboutAddon from "../addons/about.addon";
import BannerAddon from "../addons/banner.addon";
import ProjectsAddon from "../addons/projects.addon";
import ServicesAddon from "../addons/services.addon";
import TestimonialsAddon from "../addons/testimonials.addon";
import MainLayout from "../components/layouts/main.layout";
import { fetchAPI } from "../utils/api.util";

export default function Home(props) {
  console.log(props);

  const { header, about, services, testimonials, projects } = props;

  return (
    <MainLayout>
      <BannerAddon
        title={header.heading}
        video={header.video}
        link={header.link}
      />
      <ServicesAddon data={services} />
      <ProjectsAddon projects={projects} />
      <AboutAddon
        isHome={true}
        title={about.heading}
        image={about.image}
        description={about.description}
      />
      <TestimonialsAddon data={testimonials} />
    </MainLayout>
  );
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [header, about, services, testimonials, projects] = await Promise.all([
    fetchAPI("/home-header"),
    fetchAPI("/about-us-card-one"),
    fetchAPI("/services"),
    fetchAPI("/testimonials"),
    fetchAPI("/projects"),
  ]);

  return {
    props: { header, about, services, testimonials, projects },
    revalidate: 1,
  };
}
