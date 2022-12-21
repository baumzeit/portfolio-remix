import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Link } from "gatsby";
import React from "react";

export const HomeNavContent = () => {
  return (
    <Link to="/projects">
      <div className="group flex items-center gap-1 tracking-wide">
        Projects
        <ChevronRightIcon className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
};
