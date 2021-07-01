import React from "react";
import BreadcrumbAddon from "../addons/breadcrumb.addon";
import ProjectsAddon from "../addons/projects.addon";
import TestimonialsAddon from "../addons/testimonials.addon";
import MainLayout from "../components/layouts/main.layout";
import { fetchAPI } from "../utils/api.util";

export default function Projects(props) {
  const { projects, testimonials } = props;

  return (
    <MainLayout title="Projects">
      <BreadcrumbAddon title="Our Projects" links={["Home", "Projects"]} />
      <ProjectsAddon isHome={false} projects={projects} />
      <TestimonialsAddon data={testimonials} />
    </MainLayout>
  );
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [projects, testimonials] = await Promise.all([
    fetchAPI("/projects"),
    fetchAPI("/testimonials"),
  ]);

  return {
    props: { projects, testimonials },
    revalidate: 1,
  };
}
