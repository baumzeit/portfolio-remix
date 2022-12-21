import React, { PropsWithChildren, ReactNode } from "react";

type InfoItemData = Record<string, any> | string;

export type InfoRowProps<T extends InfoItemData> = {
  rowTitle?: string;
  data?: T[] | T;
  render?: (item: T) => ReactNode;
};

export const InfoRow = <T extends InfoItemData>({
  rowTitle: title,
  data,
  render,
  children,
}: PropsWithChildren<InfoRowProps<T>>) => (
  <div className="flex gap-x-3 leading-snug">
    {title && <div className="text-tertiary">{title}</div>}
    {data && (
      <div className="flex flex-wrap gap-x-2">
        {Array.isArray(data) ? (
          data.map((item, idx) => (
            <div key={idx}>{render ? render(item) : item}</div>
          ))
        ) : (
          <div>{render ? render(data) : data}</div>
        )}
      </div>
    )}
    {children}
  </div>
);
