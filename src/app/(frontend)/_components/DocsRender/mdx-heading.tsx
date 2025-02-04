import type { ComponentPropsWithoutRef } from "react";
import { LinkIcon } from "lucide-react";
import "./index.module.scss";

type HeadingType = "h1" | "h2" | "h3" | "h4";
type HeadingProps<T extends HeadingType> = Omit<
  ComponentPropsWithoutRef<T>,
  "as"
> & { as?: T };

export const MdxHeading = <T extends HeadingType>({
  as,
  id,
  className,
  children,
  ...props
}: HeadingProps<T>) => {
  const Comp = as ?? "h1";
  if (!id) return <Comp className={className} {...props} />;

  return (
    <Comp id={id} className={`mdx-heading ${className || ""}`} {...props}>
      {children}
      <a href={`#${id}`} className="heading-link">
        <LinkIcon className="heading-icon" />
      </a>
    </Comp>
  );
};

export const h1 = (props: ComponentPropsWithoutRef<"h1">) => (
  <MdxHeading as="h1" {...props} />
);
export const h2 = (props: ComponentPropsWithoutRef<"h2">) => (
  <MdxHeading as="h2" {...props} />
);
export const h3 = (props: ComponentPropsWithoutRef<"h3">) => (
  <MdxHeading as="h3" {...props} />
);
export const h4 = (props: ComponentPropsWithoutRef<"h4">) => (
  <MdxHeading as="h4" {...props} />
);
