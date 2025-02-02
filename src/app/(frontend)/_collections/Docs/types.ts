export type Heading = { anchor: string; level: number; text: string };

export type ParsedDoc = {
  content: string;
  desc: string;
  headings: Heading[];
  keywords: string;
  label: string;
  order: number;
  slug: string;
  title: string;
};

export type ParsedDocForNav = Pick<
  ParsedDoc,
  "label" | "order" | "slug" | "title"
>;

export type Topic = { docs: ParsedDoc[]; label: string; slug: string };

export type TopicForNav = {
  docs: ParsedDocForNav[];
  label: string;
  slug: string;
};

export type TopicGroup = {
  groupLabel: string;
  topics: Topic[];
};

export type TopicGroupForNav = {
  groupLabel: string;
  topics: TopicForNav[];
};
