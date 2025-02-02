"use client";

import { createContext, type PropsWithChildren } from "react";
import { usePathname } from "next/navigation";

import { allDocs } from "@/.content-collections/generated/index.js";
import type { Doc } from "@/src/app/(frontend)/_types/doc";

export const DocContext = createContext<Doc | null>(null);

export const DocProvider = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const normalizedPathname = pathname
    .replace(/^\/docs\//, "")
    .replace(/\\/g, "/")
    .replace(/^\/|\/$/g, "");
  const doc =
    allDocs.find((doc) => {
      const normalizedDocUrl = doc.url
        .replace(/\\/g, "/")
        .replace(/^\/|\/$/g, "");
      return normalizedDocUrl === normalizedPathname;
    }) || null;
  return <DocContext.Provider value={doc}>{children}</DocContext.Provider>;
};
