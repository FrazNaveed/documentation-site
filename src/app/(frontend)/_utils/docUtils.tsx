import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Metadata = {
  title: string;
  description?: string;
};

export interface DocItem {
  title: string;
  slug: string;
  children?: DocItem[];
}

function parseFrontmatter(fileContent: string) {
  const { data, content } = matter(fileContent);
  return { metadata: data as Metadata, content };
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

export function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getDocs() {
  const docsDirectory = path.join(process.cwd(), "src", "app", "content");
  const allFiles = getAllFilesRecursively(docsDirectory);

  return allFiles
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const fileContent = fs.readFileSync(file, "utf-8");
      const relativePath = path.relative(docsDirectory, file);
      const slug = relativePath.replace(/\\/g, "/").replace(/\.mdx$/, "");
      const { metadata, content } = parseFrontmatter(fileContent);

      return { slug, metadata, content };
    });
}

function getAllFilesRecursively(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = entries.map((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? getAllFilesRecursively(fullPath) : fullPath;
  });

  return files.flat();
}

function extractTitle(filePath: string): string {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  if (data.title) {
    return data.title;
  }

  const titleMatch = content.match(/^#\s+(.*)$/m);
  return titleMatch ? titleMatch[1] : "Untitled";
}

export function getDocsStructure(dir = "content"): DocItem[] {
  const docsDir = path.join(process.cwd(), "src", "app", dir);
  const entries = fs.readdirSync(docsDir, { withFileTypes: true });
  return entries
    .map((entry) => {
      const fullPath = path.join(docsDir, entry.name);
      const slug = entry.name.replace(/\.mdx?$/, "");
      if (entry.isDirectory()) {
        return {
          title: slug,
          slug: `${dir}/${slug}`,
          children: getDocsStructure(`${dir}/${entry.name}`),
        };
      } else if (entry.isFile() && /\.mdx?$/.test(entry.name)) {
        return {
          title: extractTitle(fullPath),
          slug: `${dir}/${slug}`,
        };
      }
      return null;
    })
    .filter(Boolean) as DocItem[];
}
