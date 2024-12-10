/* eslint-disable */
import {
  type JSXConvertersFunction,
  RichText,
} from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type { FileData, FileSize, TypeWithID } from 'payload'
import Image from 'next/image'
import type { IHeadingWithButton, Media, News, Page, Subheader } from 'payload-types'
import cx from 'classnames'
import Link from '../Link'
import HeadingWithButtonBlock from '../HeadingWithButtonBlock'
import VideoEmbed from '../VideoEmbed'
import getCollectionPath from '../../_utils/getCollectionPath'
import type { CollectionPathContentTypes } from '../../_utils/getCollectionPath'
import styles from './LexicalRenderer.module.scss'

const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => {
  return {
    ...defaultConverters,
    autolink: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({
        nodes: node.children,
      })
  
      const rel: string | undefined = node.fields.newTab ? 'noopener noreferrer' : undefined
      const target: string | undefined = node.fields.newTab ? '_blank' : undefined
  
      return (
        <Link href={node.fields.url} {...{ rel, target }}>
          {children}
        </Link>
      )
    },
    link: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({
        nodes: node.children,
      })
  
      const rel: string | undefined = node.fields.newTab ? 'noopener noreferrer' : undefined
      const target: string | undefined = node.fields.newTab ? '_blank' : undefined
  
      let href: string = node.fields.url
      if (node.fields.linkType === 'internal') {
        type TRelatedDocs = News | Page
        const relatedDocValue = node.fields.doc?.value
        if (typeof relatedDocValue === 'object') {
          href = `${getCollectionPath(node.fields.doc?.relationTo as CollectionPathContentTypes)}${(relatedDocValue as unknown as TRelatedDocs)?.slug}`
        }
      }
  
      return (
        <Link href={href} {...{ rel, target }}>
          {children}
        </Link>
      )
    },
    upload: ({ node }) => {
      const uploadDocument: {
        value?: FileData & TypeWithID & Media
      } = node as any

      const url = uploadDocument?.value?.url

      /**
       * If the upload is not an image, return a link to the upload
       */
      if (!uploadDocument?.value?.mimeType?.startsWith('image') && url) {
        return (
          <Link href={url} rel="noopener noreferrer">
            {uploadDocument.value?.filename}
          </Link>
        )
      }

      if (url) {
        return (
          <figure className={cx(styles.figure, styles[`figure__${node.fields?.float}`])}>
            <Image
              className={styles.figureImg}
              src={url}
              width={uploadDocument?.value?.width ?? 0}
              height={uploadDocument?.value?.height ?? 0}
              alt={uploadDocument?.value?.alt ?? ''}
              priority
            />
            {node.fields?.caption && <figcaption className={styles.figcaption}>{node.fields.caption}</figcaption>}
          </figure>
        )
      }
    },
    blocks: {
      headingWithButton: ({ node }) => {
        const nodeFields = node.fields as IHeadingWithButton
        if (nodeFields.heading || (nodeFields.buttonText && nodeFields.buttonLink)) {
          return <HeadingWithButtonBlock className={styles.headingWithButton} {...nodeFields} />
        }
        return null
      },
      subheader: ({ node }) => {
        const nodeFields = node.fields as Subheader
        if (nodeFields.subheader) {
          return (
            <div
              className={styles.subheaderBlock}
              dangerouslySetInnerHTML={{ __html: nodeFields.subheader }}
            />
          )
        }
        return null
      },
      video: ({ node }) => {
        type TVideo = {
          url?: string | null
        } 
        const nodeFields = node.fields as TVideo
        if (nodeFields.url) {
          return (
            <div className={styles.video}>
              <VideoEmbed url={nodeFields.url} />
            </div>
          )
        }
        return null
      },
    },
  }
}

const LexicalRenderer = ({ content }: { content: SerializedEditorState }) => (
  <div className={styles.content}>
    <RichText
      converters={jsxConverters}
      data={content}
    />
  </div>
)

export default LexicalRenderer
