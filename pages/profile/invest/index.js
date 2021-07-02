import {
  Box,
  Flex,
  HStack,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/layout";
import React from "react";
import ProjectsAddon from "../../../addons/projects.addon";
import TableAddon from "../../../addons/table.addon";
import OutlineButton from "../../../components/buttons/outline.button";
import AccountLayout from "../../../components/layouts/account.layout";
import CardLayout from "../../../components/layouts/card.layout";
import ListLayout from "../../../components/layouts/list.layout";
import { fetchAPI } from "../../../utils/api.util";

export default function Account(props) {
  const { projects } = props;
  return (
    <AccountLayout title="Projects">
      <ProjectsAddon isHome={false} isAccount projects={projects} />
    </AccountLayout>
  );
}

export async function getStaticProps(req, res) {
  // Run API calls in parallel
  const [projects] = await Promise.all([fetchAPI("/projects")]);

  return {
    props: { projects },
    revalidate: 1,
  };
}
