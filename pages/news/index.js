import React from "react";
import BreadcrumbAddon from "../../addons/breadcrumb.addon";
import NewsAddon from "../../addons/news.addon";
import ProjectsAddon from "../../addons/projects.addon";
import TestimonialsAddon from "../../addons/testimonials.addon";
import MainLayout from "../../components/layouts/main.layout";
import { fetchAPI } from "../../utils/api.util";

export default function News(props) {
  const { news, testimonials } = props;

  console.log(props);
  return (
    <MainLayout title="Our Stories">
      <BreadcrumbAddon title="Our Stories" links={["Home", "News"]} />
      <NewsAddon isHome={false} data={news} />
      <TestimonialsAddon data={testimonials} />
    </MainLayout>
  );
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [news, testimonials] = await Promise.all([
    fetchAPI("/epact-news"),
    fetchAPI("/testimonials"),
  ]);

  return {
    props: { news, testimonials },
    revalidate: 1,
  };
}
