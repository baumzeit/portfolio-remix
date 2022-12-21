import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";

import { Container } from "../../common/components/Container";
import { getStrapiImage } from "../../common/utility/get-image";
import { DetailContent } from "./DetailContent";
import { SliderControlProps, SliderControls } from "./SliderControls";

type ProjectDetailProps = {
  project: Queries.ProjectDetailFragment;
} & SliderControlProps;

export const ProjectDetail = ({
  project,
  nextSlug,
  prevSlug,
}: ProjectDetailProps) => {
  const image = getStrapiImage(project.coverImage);

  return project ? (
    <div className="relative min-h-full overflow-auto">
      <div className={`relative h-[40vh] md:h-[40vh] lg:h-[50vh]`}>
        {image && (
          <GatsbyImage
            loading="eager"
            image={image}
            objectFit="cover"
            objectPosition="50% 30%"
            className="h-full w-full dark:opacity-90 "
            alt={project.coverImage?.alternativeText || ""}
          />
        )}
        <div className="to-bg-primaryLayer absolute inset-0 top-[85%] h-full bg-gradient-to-b from-transparent" />
        <div className="absolute inset-0">
          <SliderControls prevSlug={prevSlug} nextSlug={nextSlug} />
        </div>
      </div>
      <div className="relative z-10 pt-0 pb-16 ">
        <Container className="relative -top-5 max-w-xl sm:-top-6 md:-top-8 md:max-w-5xl">
          <DetailContent project={project} />
        </Container>
      </div>
    </div>
  ) : null;
};
