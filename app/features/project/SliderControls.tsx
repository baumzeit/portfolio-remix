import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Link } from "gatsby";
import React from "react";

export type SliderControlProps = {
  prevSlug: string;
  nextSlug: string;
};
export const SliderControls = ({ prevSlug, nextSlug }: SliderControlProps) => {
  return (
    <div className="relative z-10 flex h-full items-center justify-between">
      <Link to={`../${prevSlug}`}>
        <div className="hover:text-brand text-secondary group flex items-center justify-center rounded-tr-sm rounded-br-sm bg-white/80 shadow-md dark:bg-black/80">
          <ChevronLeftIcon className="mx-2 my-1 h-8 w-8 transition-all sm:ml-8 md:h-10 md:w-10 " />
        </div>
      </Link>
      <Link to={`../${nextSlug}`}>
        <div className="hover:text-brand text-secondary group flex items-center justify-center rounded-tl-sm rounded-bl-sm bg-white/80 shadow-md dark:bg-black/80">
          <ChevronRightIcon className="mx-2 my-1 h-8 w-8 transition-all sm:mr-8 md:h-10 md:w-10" />
        </div>
      </Link>
    </div>
  );
};
