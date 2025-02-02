import { notFound } from "next/navigation";
import { getDocs } from "src/app/(frontend)/_utils/docUtils";
import DocsRender from "../../../_components/DocsRender";
import { serialize } from "next-mdx-remote/serialize";
import { Provider } from "@/src/app/(frontend)/_provider";

// import Link from "next/link";

// export function generateStaticParams() {
//   const docs = getDocs();

//   return docs.map((doc) => ({
//     slug: doc.slug.split("/"), // Split the slug into segments
//   }));
// }

export default async function Doc() {
  // const { slug } = await params; // Extract the slug array from params
  // const slugPath = slug.join("/"); // Join the slug segments into a path string

  // // Find the post based on the full path
  // const doc = getDocs().find((doc) => doc.slug === slugPath);

  // if (!doc) {
  //   notFound();
  // }
  // const mdxContent = await serialize(doc.content);

  return (
    <>
      <main>
        <Provider>
          {" "}
          <DocsRender />
        </Provider>
      </main>
    </>
  );
}
