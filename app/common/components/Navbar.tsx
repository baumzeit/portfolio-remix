import { graphql, Link, useStaticQuery } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { ThemeSelect } from "./ThemeSelect";

export const NAVBAR_HEIGHT = 56;

type NavbarProps = { className?: string; children: ReactNode };

export const Navbar = ({ children, className = "" }: NavbarProps) => {
  const { site } = useStaticQuery<Queries.NavDataQuery>(query);
  return (
    <nav
      style={{ height: NAVBAR_HEIGHT }}
      className={twMerge(
        "bg-primary relative z-30 flex items-center justify-between px-4 shadow-sm sm:px-6",
        className
      )}
    >
      <div className="flex-1">
        <div className="flex items-center">
          <Link to="/" className="font-bold">
            <div className="flex items-center">
              <StaticImage
                src="../../images/logo.png"
                alt="Canopies Logo"
                imgClassName={`rounded-full`}
                loading="eager"
                height={25}
                className="flex-shrink-0"
              />
              <div className="text-secondary ml-4 hidden md:block">
                {site?.siteMetadata?.title || ""}
              </div>
            </div>
          </Link>
        </div>
      </div>
      {children}
      <div className="flex flex-1 justify-end">
        <ThemeSelect />
      </div>
    </nav>
  );
};

const query = graphql`
  query NavData {
    site {
      siteMetadata {
        siteUrl
        title
      }
    }
  }
`;
