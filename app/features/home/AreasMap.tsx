import chunk from "lodash.chunk";
import React from "react";

import { Area } from "./Area";

type AreasMapProps = { areas: Queries.AreaDetailFragment[] };

export const AreasMap = ({ areas }: AreasMapProps) => {
  return (
    <div>
      {chunk(areas, 3).map((areas, idx) => (
        <div
          key={`areas-grid-${idx}`}
          className="xl-gap-y-32 grid grid-cols-4 gap-x-0 gap-y-14 md:gap-y-16 lg:gap-x-40 lg:gap-y-20"
        >
          {areas.map((area, idx) => {
            const one = idx % 3 === 0;
            const two = idx % 3 === 1;
            const three = idx % 3 === 2;
            return (
              <div
                key={area.id}
                className={`
            ${
              one
                ? "col-start-1 row-start-1"
                : two
                ? "col-start-1 row-start-2 lg:col-start-3 lg:row-start-1"
                : three
                ? "col-start-1 row-start-3 lg:col-start-2 lg:row-start-2"
                : ""
            } col-end-5 lg:col-span-2`}
              >
                <div className="hidden lg:block">
                  <Area
                    area={area}
                    alignment={
                      one ? "right" : two ? "left" : three ? "center" : "left"
                    }
                  />
                </div>
                <div className="block lg:hidden">
                  <Area area={area} alignment="left" />
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
