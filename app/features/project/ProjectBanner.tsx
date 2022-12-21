import { GatsbyImage } from "gatsby-plugin-image";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

import { getStrapiImage } from "../../common/utility/get-image";
import { DisplayProject } from "../projects/ProjectsList";

type ProjectBannerProps = {
  project: DisplayProject;
  index?: number;
  hideTitle?: boolean;
  hideOverlay?: boolean;
  className?: string;
};
export const ProjectBanner = ({
  project,
  hideTitle,
  hideOverlay,
  index = 0,
  className = "",
}: ProjectBannerProps) => {
  const { highlightColor, coverImage } = project;
  const gatsbyImage = getStrapiImage(coverImage);
  // const highlightColor = project.highlightColor

  const isEven = index % 2 === 0;

  return (
    <div
      className={twMerge(
        "grid grid-cols-1 grid-rows-1 overflow-hidden",
        className
      )}
    >
      <div className="col-start-1 row-start-1">
        <div className="aspect-video sm:aspect-square">
          {gatsbyImage && (
            <GatsbyImage
              image={gatsbyImage}
              alt={coverImage?.alternativeText || ""}
              className={`h-full object-cover object-center transition-all duration-700 ease-out ${
                !hideOverlay && !highlightColor ? "opacity-90" : ""
              }`}
            />
          )}
        </div>
      </div>

      {!hideOverlay && (
        <div className="col-start-1 row-start-1">
          <div
            style={{ color: highlightColor || "" }}
            className={`stripe-pattern z-10 h-full  ${
              highlightColor ? "opacity-70" : "bg-secondary opacity-5"
            } transition-all duration-200 ease-out`}
          />
        </div>
      )}

      {!hideTitle && (
        <div
          className={`col-start-1 row-start-1 flex ${
            isEven ? "justify-start" : "justify-end"
          } items-start`}
        >
          <div
            className={`z-20 mt-[10%] inline ${
              isEven ? "text-left" : "text-right"
            } bg-[rgba(247,247,247,0.97)] py-0.5 shadow-md dark:bg-[rgba(21,21,21,0.9)] ${
              isEven
                ? "rounded-tr-sm rounded-br-sm pr-2 pl-0.5"
                : "rounded-tl-sm rounded-bl-sm pl-2 pr-0.5"
            }`}
          >
            <h2 className="text-secondary xs:text-xl tracking-wide">
              {project.title}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};
