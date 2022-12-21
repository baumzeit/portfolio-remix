import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { graphql, PageProps } from "gatsby";
import React, { useMemo } from "react";

import { Container } from "../common/components/Container";
import Layout from "../common/components/Layout";
import { Navbar } from "../common/components/Navbar";
import { assertAndExtractNodes } from "../common/utility/assert-and-extract-nodes";
import notEmpty from "../common/utility/not-empty";
import { AreasMap } from "../features/home/AreasMap";
import { Intro } from "../features/home/Intro";
import { HomeNavContent } from "../features/home/NavContent";
import { Profile } from "../features/home/Profile";

// markup
const HomePage = ({
  data: { strapiHome, allStrapiArea },
}: PageProps<Queries.HomeDataQuery>) => {
  const displayAreas = useMemo(() => {
    if (allStrapiArea && strapiHome) {
      const homeAreas = strapiHome.areas?.filter(notEmpty);
      if (homeAreas) {
        return assertAndExtractNodes(allStrapiArea).filter((area) =>
          homeAreas.find((homeArea) => homeArea.id === area.id)
        );
      }
    }
  }, [allStrapiArea, strapiHome]);

  if (!(strapiHome && allStrapiArea && displayAreas)) {
    return <div>No Data</div>;
  }
  const { title, introText, seo, profile, contact } = strapiHome;

  return (
    title &&
    introText &&
    profile && (
      <>
        <Layout
          navbar={
            <Navbar>
              <HomeNavContent />
            </Navbar>
          }
        >
          <Container className="pt-6 pb-20 md:pt-10">
            <div className="grid grid-cols-8 gap-y-8">
              <div className="col-start-1 col-end-9 md:col-end-5">
                <Intro title={title} text={introText} />
              </div>
              <div className="col-start-1 col-end-9 md:col-start-6 lg:mt-0">
                <Profile profile={profile} />
              </div>
              <div className="col-start-1 col-end-9 mt-6 mb-8 md:mt-10 md:mb-14 lg:mt-14 lg:mb-20">
                <AreasMap areas={displayAreas} />
              </div>
              {contact && (
                <>
                  <div className="col-start-1 col-end-9 md:col-end-5">
                    <div className="text-secondary">{contact.text}</div>
                  </div>
                  <div className="col-start-1 col-end-9 md:col-start-6 lg:mt-0">
                    <a
                      href={contact.button?.link || ""}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <button className="border-highlight hover:bg-highlight hover:text-bg-primary rounded border px-5 py-3 tracking-wide transition-colors ease-out">
                        <div className="flex items-center gap-x-2">
                          {contact.button?.label || contact.button?.link}
                          <EnvelopeIcon className="h-4 w-4" />
                        </div>
                      </button>
                    </a>
                  </div>
                </>
              )}
            </div>
          </Container>
        </Layout>
      </>
    )
  );
};

export const query = graphql`
  query HomeData {
    strapiHome {
      title
      introText
      profile {
        ...Profile
      }
      contact {
        ...Contact
      }
      seo {
        metaTitle
      }
      areas {
        id
        name
        description
      }
    }
    allStrapiArea(sort: { name: DESC }) {
      edges {
        node {
          projects {
            id
            title
            slug
          }
          ...AreaDetail
        }
      }
    }
  }
`;

export default HomePage;

// export function Head() {
//   return <SEO/>
// }
