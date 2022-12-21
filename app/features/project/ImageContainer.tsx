import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";

type ImageContainerProps = {
  image?: IGatsbyImageData | null;
  caption?: string;
  alternativeText?: string;
  onClose?: () => void;
};
export const ImageContainer = ({
  image,
  caption,
  alternativeText,
  onClose,
}: ImageContainerProps) => {
  return image ? (
    <div className="relative">
      <GatsbyImage
        image={image}
        alt={alternativeText || ""}
        className="animate-fadeInFast w-full rounded-sm shadow"
        loading="lazy"
      />
      <div className="mt-3 flex justify-between">
        <div className="break-all">{caption && caption}</div>

        <div className="block lg:hidden xl:block">
          <button
            onClick={onClose}
            className="text-highlight py-2 tracking-wide"
          >
            show description
          </button>
        </div>
      </div>
    </div>
  ) : null;
};
