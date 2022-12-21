import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";

import { getStrapiImage } from "../../common/utility/get-image";

export type ImagesPreviewProps = {
  images: Queries.ProjectDetailFragment["images"];
  selectedImageIdx?: number | null;
  onClick: (idx: number) => void;
  onClosePreview: () => void;
};
export const ImagesPreview = ({
  images,
  selectedImageIdx = null,
  onClick,
  onClosePreview,
}: ImagesPreviewProps) => {
  return images ? (
    <>
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-2 lg:grid-cols-3">
        {images.map((image, idx) => {
          const imageData = getStrapiImage(image);
          return image ? (
            <button
              key={image.id}
              className={`animate-fadeInFast relative overflow-hidden rounded-sm shadow-sm outline transition-all ${
                selectedImageIdx === idx
                  ? "outline-brand"
                  : "outline-transparent"
              }`}
              onClick={() => onClick(idx)}
            >
              {imageData && (
                <GatsbyImage
                  image={imageData}
                  alt={image.alternativeText || ""}
                  className="aspect-square object-cover object-center"
                  loading="lazy"
                />
              )}
            </button>
          ) : null;
        })}
      </div>
      {selectedImageIdx !== null && (
        <div className="hidden lg:block">
          <button
            onClick={onClosePreview}
            className="text-highlight py-2 tracking-wide"
          >
            show description
          </button>
        </div>
      )}
    </>
  ) : null;
};
