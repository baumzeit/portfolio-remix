import React from "react";

import { ExternalLink } from "../../common/components/ExternalLink";
import { Tags } from "../../common/components/Tags";
import notEmpty from "../../common/utility/not-empty";
import { DetailBody } from "./DetailBody";
import { ImagesPreview } from "./ImagesPreview";
import { InfoRow } from "./InfoRow";
import { useImageHash } from "./use-image-hash";

type DetailContentProps = {
  project: Queries.ProjectDetailFragment;
};

export const DetailContent = ({ project }: DetailContentProps) => {
  const { title, images } = project;
  const [imageIdx, setImageIdx] = useImageHash();
  return (
    <>
      <div
        className="shadow-glow via:bg-slate-800/90 -ml-2 rounded-sm bg-gradient-to-br from-slate-800/95 to-slate-800/60 
        py-0.5 pl-3 pr-4
        shadow-white/30 backdrop-blur-xl dark:from-white/95 dark:via-white/90 dark:to-white/60 dark:shadow-black/30 sm:py-1 md:py-1.5"
      >
        <h1 className="text-bg-primary w-full text-xl sm:text-2xl md:w-auto md:text-3xl">
          {title}
        </h1>
      </div>
      <div className="mt-6 mb-6 flex flex-col gap-x-12 gap-y-4 md:mt-8 md:flex-row lg:gap-x-16 ">
        <div className="block md:hidden">
          <MainInfo project={project} />
        </div>
        <div className="mb-4 flex-1">
          <DetailBody
            project={project}
            selectedImageIdx={imageIdx}
            onClosePreview={() => setImageIdx(null)}
          />
        </div>
        <div className="md:w-1/3">
          <div className={`mb-4 grid gap-y-4`}>
            <div className="hidden md:block">
              <MainInfo project={project} />
            </div>
            {images && (
              <div className="row-start-1 mb-1 md:row-start-auto">
                <ImagesPreview
                  images={images}
                  onClick={(idx) => setImageIdx(idx)}
                  selectedImageIdx={imageIdx}
                  onClosePreview={() => setImageIdx(null)}
                />
              </div>
            )}

            {imageIdx === null && <SecondaryInfo project={project} />}
          </div>
        </div>
      </div>
    </>
  );
};

type MainInfoProps = { project: Queries.ProjectDetailFragment };
const MainInfo = ({ project: { organization, areas } }: MainInfoProps) => {
  return (
    <div>
      {organization?.link ? (
        <InfoRow
          rowTitle="Organization:"
          data={organization}
          render={(organization) => (
            <ExternalLink
              link={organization.link || ""}
              label={organization.name}
            />
          )}
        />
      ) : (
        <InfoRow data="Hobby Project" />
      )}
      {areas && (
        <InfoRow
          rowTitle="Areas:"
          data={areas.filter(notEmpty)}
          render={(area) => area.name}
        />
      )}
    </div>
  );
};

type SecondaryInfoProps = { project: Queries.ProjectDetailFragment };
const SecondaryInfo = ({ project: { links, tags } }: SecondaryInfoProps) => {
  return (
    <>
      {links && links?.length > 0 && (
        <div className="leading-snug">
          {links.filter(notEmpty).map((link) => (
            <ExternalLink key={link.id} {...link} />
          ))}
        </div>
      )}
      {tags && (
        <div className="mt-1">
          <Tags tags={tags} />
        </div>
      )}
    </>
  );
};
