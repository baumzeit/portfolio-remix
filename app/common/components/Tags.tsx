import React from "react";

import { alignFlex, Alignment } from "../utility/alignment";
import notEmpty from "../utility/not-empty";

type TagsProps = {
  tags: Queries.AreaDetailFragment["tags"];
  color?: string;
  alignment?: Alignment;
};

export const Tags = ({ tags, color, alignment = "left" }: TagsProps) => {
  return (
    <div
      className={`flex flex-wrap gap-1.5 md:gap-2.5 justify-${alignFlex[alignment]}`}
    >
      {tags?.filter(notEmpty).map(({ name, id }) => (
        <Tag key={id} color={color} label={name || ""} />
      ))}
    </div>
  );
};

type TagProps = {
  color?: string;
  label: string;
};

export const Tag = ({ label, color }: TagProps) => {
  return (
    <div
      style={color ? { borderColor: color } : undefined}
      className={`text-secondary rounded-sm border px-1.5 py-0.5 text-xs md:px-2.5 md:text-sm`}
    >
      {label}
    </div>
  );
};
