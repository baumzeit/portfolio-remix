import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import React from "react";

type ExternalLinkProps = {
  link?: string | null;
  label?: string | null;
};

export const ExternalLink = ({ link, label }: ExternalLinkProps) => {
  return (
    <a
      href={link || ""}
      target="_blank"
      rel="noreferrer"
      className="transition-colors hover:text-sky-600"
    >
      <div className="flex items-center gap-1">
        <div className="break-words">{label}</div>
        <div className="">
          <ArrowTopRightOnSquareIcon className="h-4 w-4 text-sky-600" />
        </div>
      </div>
    </a>
  );
};
