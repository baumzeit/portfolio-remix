import React, { useMemo } from "react";

import { RenderMd } from "../../common/components/RenderMd";
import { getStrapiImage } from "../../common/utility/get-image";
import notEmpty from "../../common/utility/not-empty";
import { ImageContainer } from "./ImageContainer";

type DetailContentProps = {
  project: Queries.ProjectDetailFragment;
  selectedImageIdx: number | null;
  onClosePreview: () => void;
};
export const DetailBody = ({
  project: { description, images },
  selectedImageIdx,
  onClosePreview,
}: DetailContentProps) => {
  const selectedImage = useMemo(() => {
    if (images && typeof selectedImageIdx === "number") {
      return images.filter(notEmpty)[selectedImageIdx];
    }
  }, [images, selectedImageIdx]);

  return (
    <div className="order-2 flex-1 md:order-1">
      <div className="relative grid">
        <article
          className={`col-start-1 transition-opacity duration-100 ${
            selectedImage
              ? "absolute top-0 left-0 h-full w-full overflow-hidden opacity-0 ease-in"
              : "opacity-100"
          }`}
        >
          <RenderMd
            className={`text-justify`}
            content={description?.data?.description}
          />
        </article>
        {selectedImage && (
          <div className="z-10 col-start-1 min-h-[70vw] md:min-h-0">
            <ImageContainer
              image={getStrapiImage(selectedImage)}
              caption={selectedImage.caption || ""}
              alternativeText={selectedImage.alternativeText || ""}
              onClose={onClosePreview}
            />
          </div>
        )}
      </div>
    </div>
  );
};
