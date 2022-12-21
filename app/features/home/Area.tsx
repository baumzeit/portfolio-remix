import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Link } from "gatsby";
import React from "react";
import useDarkMode from "use-dark-mode";

import { Tags } from "../../common/components/Tags";
import { PATH } from "../../common/constants/paths";
import { SvgBlob } from "../blob/SvgBlob";

const flex = {
  left: "start",
  center: "center",
  right: "end",
};

const blobOffset = {
  left: "-top-[20px] md:-top-[80px] -left-[100px] lg:-left-[140px] lg:-top-[60px]",
  center: "lg:-top-[120px] left-0",
  right: "lg:-right-[140px] lg:-top-[60px]",
};

type AreaProps = {
  area: Queries.AreaDetailFragment;
  alignment: "left" | "center" | "right";
};
export const Area = ({
  area: { name, description, id, color: areaColor, tags, slug },
  alignment,
}: AreaProps) => {
  const { value: isDarkMode } = useDarkMode();

  return (
    <div className="group relative">
      <div className="relative z-10">
        <Link to={`${PATH.PROJECTS}#area=${slug}`}>
          <div
            style={{ justifyContent: flex[alignment] }}
            className="mb-2.5 flex items-center gap-2"
          >
            <h2 className={`text-3xl font-light tracking-wider`}>{name}</h2>
            <div className="-mr-1 transition-transform group-hover:translate-x-0.5">
              <ChevronRightIcon
                style={{ color: areaColor || "" }}
                className="h-4 w-4"
              />
            </div>
          </div>
          <div
            style={{ justifyContent: flex[alignment] }}
            className={`flex w-full`}
          >
            <div
              style={{
                alignItems: flex[alignment],
                alignContent: flex[alignment],
              }}
              className={`flex flex-col gap-y-4 md:w-4/5 `}
            >
              <p
                style={{ textAlign: alignment }}
                className={`text-secondary text-md`}
              >
                {description}
              </p>
              <Tags tags={tags} color={areaColor || ""} />
            </div>
          </div>
        </Link>
      </div>
      <div
        className={`pointer-events-none absolute flex w-full ${blobOffset[alignment]}`}
        style={{ justifyContent: flex[alignment] }}
      >
        <div
          className="-mx-14 -my-14 w-[340px] opacity-20 transition-all duration-150 group-hover:scale-95 
        group-hover:opacity-40 group-hover:duration-[300ms] dark:opacity-[0.15] dark:group-hover:opacity-[0.25] md:w-[430px] lg:w-[500px]"
        >
          <div className="md:animate-spinVerySlow">
            <SvgBlob
              variant="solid"
              color={areaColor || ""}
              isOutline={!isDarkMode}
              shapeProps={{ growth: 6, edges: 6 }}
              id={id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
