import React from "react";

type IntroProps = { title: string; text: string };
export const Intro = ({ text, title }: IntroProps) => (
  <div>
    {/* <h1 className="mb-1 text-xl md:text-2xl">{title}</h1> */}
    <div className="text-secondary mt-2">{text}</div>
  </div>
);
