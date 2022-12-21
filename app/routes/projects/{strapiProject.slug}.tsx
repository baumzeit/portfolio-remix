import { PageProps } from "gatsby";
import { graphql } from "gatsby";
import React from "react";

import Layout from "../../common/components/Layout";
import { Navbar } from "../../common/components/Navbar";
import { PATH } from "../../common/constants/paths";
import { ProjectDetail } from "../../features/project/Detail";
import { ProjectDetailNavContent } from "../../features/project/NavContent";

export type ProjectsAndAreas = {
  projects: Queries.ProjectDetailFragment[];
  areas: Queries.AreaBaseFragment[];
};

const ProjectsDetailPage = ({
  data: { project, allProjects },
}: PageProps<Queries.ProjectDetailPageQuery>) => {
  const activePojectIdx = allProjects.nodes.findIndex(
    ({ slug }) => slug === project?.slug
  );
  const prevIdx =
    activePojectIdx > 0 ? activePojectIdx - 1 : allProjects.nodes.length - 1;
  const nextIdx = (activePojectIdx + 1) % allProjects.nodes.length;
  const [prevSlug, nextSlug] = [prevIdx, nextIdx].map(
    (idx) => allProjects.nodes[idx].slug || ""
  );

  if (!project) {
    return null;
  }

  return (
    <Layout
      navbar={
        <Navbar className="dark:shadow-md">
          <ProjectDetailNavContent closePath={PATH.PROJECTS} />
        </Navbar>
      }
    >
      <ProjectDetail
        project={project}
        nextSlug={nextSlug}
        prevSlug={prevSlug}
      />
    </Layout>
  );
};

export const query = graphql`
  query ProjectDetailPage($slug: String!) {
    allProjects: allStrapiProject(sort: { createdAt: DESC }) {
      nodes {
        slug
        createdAt
      }
    }
    project: strapiProject(slug: { eq: $slug }) {
      ...ProjectDetail
    }
  }
`;

export default ProjectsDetailPage;
