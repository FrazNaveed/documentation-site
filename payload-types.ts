/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    pages: Page;
    users: User;
    media: Media;
    news: News;
    'news-types': NewsType;
    'news-sub-types': NewsSubType;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  db: {
    defaultIDType: number;
  };
  globals: {};
  locale: 'en' | 'es' | 'de';
  user: User & {
    collection: 'users';
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: number;
  title?: string | null;
  slug: string;
  hero?: {
    style: 'Standard';
    headline: string;
    eyebrow?: string | null;
    buttonText?: string | null;
    buttonLink?: string | null;
    backgroundImage?: (number | null) | Media;
  };
  hideHero?: boolean | null;
  components?: (Columns | Image | RichText)[] | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  alt: string;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Columns".
 */
export interface Columns {
  leftColumn?: LeftColumn;
  rightColumn?: RightColumn;
  createSideNavLink?: boolean | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'columns';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Left Column".
 */
export interface LeftColumn {
  text?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  image?: (number | null) | Media;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Right Column".
 */
export interface RightColumn {
  text?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  image?: (number | null) | Media;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Image".
 */
export interface Image {
  image?: (number | null) | Media;
  createSideNavLink?: boolean | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'image';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "RichText".
 */
export interface RichText {
  richText?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  createSideNavLink?: boolean | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'richText';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  updatedAt: string;
  createdAt: string;
  enableAPIKey?: boolean | null;
  apiKey?: string | null;
  apiKeyIndex?: string | null;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "news".
 */
export interface News {
  id: number;
  title?: string | null;
  slug: string;
  excerpt?: string | null;
  publishDate: string;
  author: number | User;
  type: number | NewsType;
  subtype?: (number | null) | NewsSubType;
  contentType?: ('video' | 'podcast') | null;
  teaserThumbnail?: (number | null) | Media;
  logos?:
    | {
        image: number | Media;
        id?: string | null;
      }[]
    | null;
  pin?: boolean | null;
  pinPriority?: ('0' | '1' | '2' | '3') | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "news-types".
 */
export interface NewsType {
  id: number;
  name: string;
  slug: string;
  image: number | Media;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "news-sub-types".
 */
export interface NewsSubType {
  id: number;
  name: string;
  slug: string;
  image: number | Media;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: number;
  document?:
    | ({
        relationTo: 'pages';
        value: number | Page;
      } | null)
    | ({
        relationTo: 'users';
        value: number | User;
      } | null)
    | ({
        relationTo: 'media';
        value: number | Media;
      } | null)
    | ({
        relationTo: 'news';
        value: number | News;
      } | null)
    | ({
        relationTo: 'news-types';
        value: number | NewsType;
      } | null)
    | ({
        relationTo: 'news-sub-types';
        value: number | NewsSubType;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}