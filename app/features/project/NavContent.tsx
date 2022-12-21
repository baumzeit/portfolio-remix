import { Link } from "gatsby";
import React from "react";

type ModalNavbarProps = {
  closePath: string;
};
export const ProjectDetailNavContent = ({ closePath }: ModalNavbarProps) => {
  return (
    <Link to={closePath}>
      <div className={`hover:text-brand p-3 tracking-wide`}>Close</div>
    </Link>
  );
};
