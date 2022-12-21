import { Transition } from "@headlessui/react";
import { ArrowSmallUpIcon } from "@heroicons/react/24/solid";
import { graphql, PageProps } from "gatsby";
import React, { Suspense, useMemo, useRef } from "react";

import Layout from "../../common/components/Layout";
import { Navbar } from "../../common/components/Navbar";
import { areasAtom, projectsAtom } from "../../common/contexts/atoms";
import { assertAndExtractNodes } from "../../common/utility/assert-and-extract-nodes";
import { ProjectsNavContent } from "../../features/projects/NavContent";
import ProjectsList from "../../features/projects/ProjectsList";
import ProjectsMap from "../../features/projects/ProjectsMap";

export type ProjectsAndAreas = {
  projects: Queries.ProjectBaseFragment[];
  areas: Queries.AreaBaseFragment[];
};

const ProjectsPage = ({
  data: { allStrapiArea, allStrapiProject },
}: PageProps<Queries.ProjectsPageDataQuery>) => {
  const areas = useMemo(
    () => assertAndExtractNodes(allStrapiArea),
    [allStrapiArea]
  );
  const projects = useMemo(
    () => assertAndExtractNodes(allStrapiProject),
    [allStrapiProject]
  );

  const main = useRef<HTMLDivElement>(null);

  return (
    <Layout
      ref={main}
      navbar={
        <Navbar>
          <ProjectsNavContent areas={areas} />
        </Navbar>
      }
      providerData={[
        [areasAtom, areas],
        [projectsAtom, projects],
      ]}
    >
      <Suspense
        fallback={
          <div className="text-secondary flex h-4/5 items-center justify-center text-2xl font-light tracking-wide">
            <div>Loading ...</div>
          </div>
        }
      >
        <Transition
          appear={true}
          show={true}
          enter="transition-opacity duration-600"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-600"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="hidden md:block">
            <ProjectsMap projects={projects} areas={areas} />
          </div>
          <div className="block md:hidden">
            <ProjectsList projects={projects} areas={areas} />
            <div className="mb-2 flex justify-center">
              <button
                className="rounded-full p-2"
                onClick={() => main.current?.scrollTo(0, 0)}
              >
                <div className="flex items-center gap-2">
                  <div>Back to top</div>
                  <ArrowSmallUpIcon className="h-4 w-4" />
                </div>
              </button>
            </div>
          </div>
        </Transition>
      </Suspense>
    </Layout>
  );
};

export const query = graphql`
  query ProjectsPageData {
    allStrapiProject(sort: { createdAt: DESC }) {
      totalCount
      edges {
        node {
          ...ProjectBase
        }
      }
    }
    allStrapiArea {
      edges {
        node {
          ...AreaBase
        }
      }
    }
  }
`;

export default ProjectsPage;
