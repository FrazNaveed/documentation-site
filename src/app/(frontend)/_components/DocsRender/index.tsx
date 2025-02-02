"use client";

import React from "react";
import { MDXContent } from "@content-collections/mdx/react";

// import { MDXRemoteProps } from "next-mdx-remote";
import DocsNavigation from "../DocsNavigation/index";
import TableOfContents from "../TableOfContents/index";
import styles from "./index.module.scss";

// import { MDXContent } from "@content-collections/mdx/react";
import { useDoc } from "@/src/app/(frontend)/_hooks/useDoc";
import type { Doc } from "@/src/app/(frontend)/_types/doc";

// import { getDocsStructure, getMDXData } from "../../_utils/docUtils";

// interface DocItem {
//   title: string;
//   slug: string;
//   children?: DocItem[];
// }

// interface DocSection {
//   title: string;
//   items: DocItem[];
// }

// interface DocsStructureProps {
//   docsStructure: DocSection[];
// }

export default async function DocsPage() {
  const doc = useDoc();
  console.log("doc in docs rendering file", doc);
  // const docsStructure = await getDocsStructure();
  // console.log("docsStructure", docsStructure);

  return (
    <div className={styles.docsPage}>
      <DocsNavigation />

      {/* <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>Welcome to the Documentation</h1>
        <p className={styles.pageDescription}>
          Select a topic from the sidebar to get started.
        </p>

        <h2 id="introduction" className={styles.sectionTitle}>
          Introduction
        </h2>
        <p className={styles.sectionContent}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          euismod, nisi vel consectetur interdum, nisl nunc egestas nunc, vitae
          tincidunt nisl nunc euismod nunc.
        </p>

        <h2 id="getting-started" className={styles.sectionTitle}>
          Getting Started
        </h2>
        <p className={styles.sectionContent}>
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          ut aliquip ex ea commodo consequat.
        </p>

        <h3 id="installation" className={styles.subsectionTitle}>
          Installation
        </h3>
        <p className={styles.subsectionContent}>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>

        <h3 id="configuration" className={styles.subsectionTitle}>
          Configuration
        </h3>
        <p className={styles.subsectionContent}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>

        <h2 id="advanced-usage" className={styles.sectionTitle}>
          Advanced Usage
        </h2>
        <p className={styles.sectionContent}>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>

        <h3 id="customization" className={styles.subsectionTitle}>
          Customization
        </h3>
        <p className={styles.subsectionContent}>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </p>

        <h4 id="theming" className={styles.subsubsectionTitle}>
          Theming
        </h4>
        <p className={styles.subsubsectionContent}>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
          fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
          sequi nesciunt.
        </p>

        <h4 id="plugins" className={styles.subsubsectionTitle}>
          Plugins
        </h4>
        <p className={styles.subsubsectionContent}>
          Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
          consectetur, adipisci velit, sed quia non numquam eius modi tempora
          incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
        </p>
      </main> */}
      <MDXContent code={doc?.body.code || ""} />
      <TableOfContents />
    </div>
  );
}
