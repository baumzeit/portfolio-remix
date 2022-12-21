import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";

import { getStrapiImage } from "../../common/utility/get-image";
import notEmpty from "../../common/utility/not-empty";

type ProfileProps = { profile: Queries.ProfileFragment };
export const Profile = ({ profile: { picture, qualities } }: ProfileProps) => {
  const gatsbyImage = getStrapiImage(picture);
  return (
    <div className="flex flex-row justify-center gap-4 md:flex-col lg:flex-row">
      <div className="shrink-0 px-1">
        {gatsbyImage && (
          <GatsbyImage
            image={gatsbyImage}
            alt={picture?.alternativeText || ""}
            className="w-32 overflow-hidden rounded-md shadow-md sm:w-40"
          />
        )}
      </div>
      <ul className="ml-5 flex-1 list-disc">
        {qualities?.filter(notEmpty).map(({ text }, idx) => (
          <li key={idx}>{text}</li>
        ))}
      </ul>
    </div>
  );
};
