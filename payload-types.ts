/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "StatsList".
 */
export type StatsList =
  | {
      label: string;
      stat: string;
      id?: string | null;
    }[]
  | null;
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "PointsList".
 */
export type PointsList = {
  icon?: (number | null) | Media;
  header?: string | null;
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
  id?: string | null;
}[];

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    events: Event;
    pages: Page;
    users: User;
    media: Media;
    news: News;
    'news-types': NewsType;
    'news-sub-types': NewsSubType;
    wallets: Wallet;
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
 * via the `definition` "events".
 */
export interface Event {
  id: number;
  title: string;
  startDate: string;
  startTime?: string | null;
  endDate?: string | null;
  country:
    | 'AF'
    | 'AX'
    | 'AL'
    | 'DZ'
    | 'AS'
    | 'AD'
    | 'AO'
    | 'AI'
    | 'AQ'
    | 'AG'
    | 'AR'
    | 'AM'
    | 'AW'
    | 'AU'
    | 'AT'
    | 'AZ'
    | 'BS'
    | 'BH'
    | 'BD'
    | 'BB'
    | 'BY'
    | 'BE'
    | 'BZ'
    | 'BJ'
    | 'BM'
    | 'BT'
    | 'BO'
    | 'BQ'
    | 'BA'
    | 'BW'
    | 'BV'
    | 'BR'
    | 'IO'
    | 'BN'
    | 'BG'
    | 'BF'
    | 'BI'
    | 'CV'
    | 'KH'
    | 'CM'
    | 'CA'
    | 'KY'
    | 'CF'
    | 'TD'
    | 'CL'
    | 'CN'
    | 'CX'
    | 'CC'
    | 'CO'
    | 'KM'
    | 'CG'
    | 'CD'
    | 'CK'
    | 'CR'
    | 'HR'
    | 'CU'
    | 'CW'
    | 'CY'
    | 'CZ'
    | 'CI'
    | 'DK'
    | 'DJ'
    | 'DM'
    | 'DO'
    | 'EC'
    | 'EG'
    | 'SV'
    | 'GQ'
    | 'ER'
    | 'EE'
    | 'SZ'
    | 'ET'
    | 'FK'
    | 'FO'
    | 'FJ'
    | 'FI'
    | 'FR'
    | 'GF'
    | 'PF'
    | 'TF'
    | 'GA'
    | 'GM'
    | 'GE'
    | 'DE'
    | 'GH'
    | 'GI'
    | 'GR'
    | 'GL'
    | 'GD'
    | 'GP'
    | 'GU'
    | 'GT'
    | 'GG'
    | 'GN'
    | 'GW'
    | 'GY'
    | 'HT'
    | 'HM'
    | 'VA'
    | 'HN'
    | 'HK'
    | 'HU'
    | 'IS'
    | 'IN'
    | 'ID'
    | 'IR'
    | 'IQ'
    | 'IE'
    | 'IM'
    | 'IL'
    | 'IT'
    | 'JM'
    | 'JP'
    | 'JE'
    | 'JO'
    | 'KZ'
    | 'KE'
    | 'KI'
    | 'KP'
    | 'KR'
    | 'KW'
    | 'KG'
    | 'LA'
    | 'LV'
    | 'LB'
    | 'LS'
    | 'LR'
    | 'LY'
    | 'LI'
    | 'LT'
    | 'LU'
    | 'MO'
    | 'MG'
    | 'MW'
    | 'MY'
    | 'MV'
    | 'ML'
    | 'MT'
    | 'MH'
    | 'MQ'
    | 'MR'
    | 'MU'
    | 'YT'
    | 'MX'
    | 'FM'
    | 'MD'
    | 'MC'
    | 'MN'
    | 'ME'
    | 'MS'
    | 'MA'
    | 'MZ'
    | 'MM'
    | 'NA'
    | 'NR'
    | 'NP'
    | 'NL'
    | 'NC'
    | 'NZ'
    | 'NI'
    | 'NE'
    | 'NG'
    | 'NU'
    | 'NF'
    | 'MK'
    | 'MP'
    | 'NO'
    | 'OM'
    | 'PK'
    | 'PW'
    | 'PS'
    | 'PA'
    | 'PG'
    | 'PY'
    | 'PE'
    | 'PH'
    | 'PN'
    | 'PL'
    | 'PT'
    | 'PR'
    | 'QA'
    | 'RO'
    | 'RU'
    | 'RW'
    | 'RE'
    | 'BL'
    | 'SH'
    | 'KN'
    | 'LC'
    | 'MF'
    | 'PM'
    | 'VC'
    | 'WS'
    | 'SM'
    | 'ST'
    | 'SA'
    | 'SN'
    | 'RS'
    | 'SC'
    | 'SL'
    | 'SG'
    | 'SX'
    | 'SK'
    | 'SI'
    | 'SB'
    | 'SO'
    | 'ZA'
    | 'GS'
    | 'SS'
    | 'ES'
    | 'LK'
    | 'SD'
    | 'SR'
    | 'SJ'
    | 'SE'
    | 'CH'
    | 'SY'
    | 'TW'
    | 'TJ'
    | 'TZ'
    | 'TH'
    | 'TL'
    | 'TG'
    | 'TK'
    | 'TO'
    | 'TT'
    | 'TN'
    | 'TR'
    | 'TM'
    | 'TC'
    | 'TV'
    | 'UG'
    | 'UA'
    | 'AE'
    | 'GB'
    | 'US'
    | 'UY'
    | 'UZ'
    | 'VU'
    | 'VE'
    | 'VN'
    | 'EH'
    | 'YE'
    | 'ZM'
    | 'ZW';
  location: string;
  flareInvolvement: string;
  button?: {
    buttonType?: ('announcement' | 'rsvp') | null;
    link?: string | null;
  };
  featured?: boolean | null;
  updatedAt: string;
  createdAt: string;
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
    style: 'standard';
    headline: string;
    eyebrow?: string | null;
    buttonText?: string | null;
    buttonLink?: string | null;
    backgroundImage?: (number | null) | Media;
  };
  hideHero?: boolean | null;
  components?: (Columns | Image | RichText | Stats | ITalkingPoints)[] | null;
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
  layout?: ('equal' | 'wideLeft' | 'wideRight') | null;
  leftColumnBlock?:
    | (
        | {
            image?: (number | null) | Media;
            id?: string | null;
            blockName?: string | null;
            blockType: 'colImage';
          }
        | RichText
      )[]
    | null;
  rightColumnBlock?:
    | (
        | {
            image?: (number | null) | Media;
            id?: string | null;
            blockName?: string | null;
            blockType: 'colImage';
          }
        | RichText
      )[]
    | null;
  createSideNavLink?: boolean | null;
  linkText?: string | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'columns';
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
  linkText?: string | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'richText';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Image".
 */
export interface Image {
  image?: (number | null) | Media;
  createSideNavLink?: boolean | null;
  linkText?: string | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'image';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Stats".
 */
export interface Stats {
  stats?: StatsList;
  caption?: {
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
  linkText?: string | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'stats';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ITalkingPoints".
 */
export interface ITalkingPoints {
  points: PointsList;
  createSideNavLink?: boolean | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'talkingPoints';
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
  featured?: boolean | null;
  content?: {
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
 * via the `definition` "wallets".
 */
export interface Wallet {
  id: number;
  name: string;
  logo?: (number | null) | Media;
  walletLink: string;
  flrFunctionality?: boolean | null;
  walletConnect?: boolean | null;
  tags?: ('wrap' | 'delegate' | 'stake' | 'autoclaim' | 'claim' | 'voting')[] | null;
  platforms?: ('ios' | 'android' | 'hardware')[] | null;
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
        relationTo: 'events';
        value: number | Event;
      } | null)
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
      } | null)
    | ({
        relationTo: 'wallets';
        value: number | Wallet;
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