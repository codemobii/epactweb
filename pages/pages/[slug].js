import React from "react";
import ReactMarkdown from "react-markdown";

import BreadcrumbAddon from "../../addons/breadcrumb.addon";
import SingleAddon from "../../addons/single.addon";
import MainLayout from "../../components/layouts/main.layout";
import { fetchAPI } from "../../utils/api.util";

export default function ProjectDesc(props) {
  const { article } = props;
  console.log(props);
  return (
    <MainLayout title={article.title}>
      <BreadcrumbAddon title={article.title} links={["Home", article.title]} />
      <SingleAddon
        desc={
          <>
            <ReactMarkdown children={article.description} escapeHtml={false} />
          </>
        }
      />
    </MainLayout>
  );
}

export async function getStaticPaths() {
  const news = await fetchAPI("/pages");

  return {
    paths: news.map((news) => ({
      params: {
        slug: news.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const news = await fetchAPI(`/pages?slug=${params.slug}`);

  return {
    props: { article: news[0] },
    revalidate: 1,
  };
}
