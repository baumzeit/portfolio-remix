import React, { useMemo } from "react";

import { generateColorStopClasses } from "../utility/generate-color-stop-classes";

type AvatarProps = { name: string; highlight?: boolean };

export const Avatar = ({ name, highlight }: AvatarProps) => {
  const colorStopClasses = useMemo(
    () => generateColorStopClasses(name),
    [name]
  );

  return (
    <div
      className={`border-highlight animate-pulse-once flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gradient-to-br ${
        highlight
          ? "border-highlight w-auto rounded-md border px-2"
          : colorStopClasses
      }`}
    >
      <div
        className={`font-display inline-block text-sm uppercase ${
          highlight ? "text-highlight" : "text-white"
        }`}
      >
        {highlight ? name : name.slice(0, 2)}
      </div>
    </div>
  );
};
