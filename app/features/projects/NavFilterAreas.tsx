import { Listbox } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { useCallback } from "react";

import { useHighlightArea } from "../project/use-highlight-area";

type NavFilterAreasProps = {
  areas: Queries.AreaBaseFragment[];
};

export const NavFilterAreas = ({ areas }: NavFilterAreasProps) => {
  const [highlightArea, setHighlightArea] = useHighlightArea();
  return (
    <div className="text-bg-secondary flex items-center justify-center gap-4">
      {areas.map(({ id, color, name, slug }, idx) => {
        const isActive = slug === highlightArea?.slug;
        return (
          <button
            key={id}
            onClick={(e) => {
              setHighlightArea(isActive ? null : slug ?? null);
            }}
            style={{
              color: isActive ? "inherit" : color || "inherit",
              backgroundColor: isActive
                ? color || "transparent"
                : "transparent",
              borderColor: color || "none",
            }}
            className={`animate-fadeIn ml-2 animate-delay-${
              100 + 100 * idx
            } cursor-pointer rounded px-1.5 py-0.5
            `}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
};

export const NavFilterAreasSelect = ({ areas }: NavFilterAreasProps) => {
  const [highlightArea, setHighlightArea] = useHighlightArea();

  const handleChange = useCallback(
    (area: Queries.AreaBaseFragment) => {
      const isActive = area.slug === highlightArea?.slug;
      setHighlightArea(isActive || !area.slug ? null : area.slug);
    },
    [highlightArea?.slug, setHighlightArea]
  );

  return (
    <div className="flex flex-col items-center">
      <Listbox value={highlightArea} onChange={handleChange}>
        <div className="relative">
          <Listbox.Button
            id="area-select"
            style={{
              backgroundColor: highlightArea?.color || "transparent",
            }}
            className={`rounded px-2 py-0.5 text-center tracking-wide ${
              highlightArea ? "text-bg-secondary" : "text-primary"
            }`}
          >
            {highlightArea ? highlightArea.name : "Filter by Area"}
          </Listbox.Button>
          {highlightArea && (
            <button
              className="absolute top-0 bottom-0 -right-8 flex items-center p-1"
              onClick={() => setHighlightArea(null)}
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          )}
        </div>
        <Listbox.Options className="flex flex-col items-center">
          {areas
            .filter((d) => !highlightArea || d.id !== highlightArea.id)
            .map((area, idx) => {
              const { id = null, color, name, slug } = area;
              const isActive = slug === highlightArea?.slug;
              return (
                <Listbox.Option
                  key={id}
                  value={area}
                  className="text-bg-secondary"
                >
                  <div
                    style={{
                      color: isActive ? "inherit" : color || "inherit",
                      backgroundColor: isActive ? color || "transparent" : "",
                    }}
                    className={`animate-fadeInFast bg-primary mt-1.5 inline-block rounded px-2 py-0.5 tracking-wide animate-delay-${
                      50 * idx
                    } cursor-pointer`}
                  >
                    {name}
                  </div>
                </Listbox.Option>
              );
            })}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};
