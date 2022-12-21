import React from "react";

type ContactProps = { contact: Queries.ContactFragment };
export const Contact = ({ contact: { text, button } }: ContactProps) => (
  <div className="flex items-center gap-x-10">
    <div className="text-secondary">{text}</div>
    {button && (
      <a href={button.link || ""} target="_blank" rel="noreferrer">
        <button className="">{button.label || button.link}</button>
      </a>
    )}
  </div>
);
