"use client";

import React, { useState, useEffect } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import styles from "./index.module.scss"; // Import SCSS file

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

const TableOfContents = () => {
  const [toc, setToc] = useState<TOCItem[]>([]);

  useEffect(() => {
    const headings = document.querySelectorAll("h2, h3, h4");
    const tocItems: TOCItem[] = Array.from(headings).map((heading) => ({
      id: heading.id,
      text: heading.textContent || "",
      level: Number.parseInt(heading.tagName[1]),
    }));
    setToc(tocItems);
  }, []);

  return (
    <aside className={styles.tableOfContents}>
      <ScrollArea.Root className={styles.scrollArea}>
        <ScrollArea.Viewport className={styles.tocViewport}>
          {" "}
          <nav>
            {toc.map((item) => (
              <ul key={item.id} className={styles.tocItem}>
                <a href={`#${item.id}`} className={styles.tocLink}>
                  {item.text}
                </a>
              </ul>
            ))}
          </nav>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className={styles.scrollbar}
          orientation="vertical"
        >
          <ScrollArea.Thumb className={styles.thumb} />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </aside>
  );
};

export default TableOfContents;
