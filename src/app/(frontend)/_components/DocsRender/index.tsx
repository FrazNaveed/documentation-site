"use client";

import React from "react";
import Link from "next/link";
import { MDXContent } from "@content-collections/mdx/react";
import DocsNavigation from "../DocsNavigation/index";
import TableOfContents from "../TableOfContents/index";
import styles from "./index.module.scss";
import { useDoc } from "@/src/app/(frontend)/_hooks/useDoc";
import type { Doc } from "@/src/app/(frontend)/_types/doc";
import { MdxBlockquote } from "./mdx-blockquote";
import { h1, h2, h3, h4 } from "./mdx-heading";

export const mdxComponents = {
  h1,
  h2,
  h3,
  h4,
  a: Link,
  blockquote: MdxBlockquote,
};

export default function DocsPage() {
  const doc = useDoc();
  return (
    <div className={styles.docsPage}>
      <aside className={styles.sidebar}>
        <DocsNavigation />
      </aside>

      <main className={styles.content}>
        <h2 className={styles.pageHeading}>{doc?.title}</h2>
        <MDXContent code={doc?.body.code || ""} components={mdxComponents} />
      </main>

      <aside className={styles.toc}>
        <TableOfContents />
      </aside>
    </div>
  );
}
