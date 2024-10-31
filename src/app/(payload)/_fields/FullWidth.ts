import type { Field } from 'payload'
import { ColumnsBlock } from '../_blocks/ColumnsBlock'
import { ImageBlock } from '../_blocks/ImageBlock'
import { ImageTextGridBlock } from '../_blocks/ImageTextGridBlock'
// import { RichTextBlockWithSideNavLink } from '../_blocks/RichTextBlockWithSideNavLink'
import { PastFeaturedGrantsGridBlock } from '../_blocks/PastFeaturedGrantsGridBlock'
import { StatsBlock } from '../_blocks/StatsBlock'
import { TableDrawersBlock } from '../_blocks/TableDrawersBlock'
import { TalkingPoints } from '../_blocks/TalkingPointsBlock'
import { TwoColumnBlock } from '../_blocks/TwoColumnBlock'
import { ApplicationProcess } from '../_blocks/ApplicationProcessBlock'

export const FullWidth: Field[] = [
  {
    name: 'fullWidth',
    type: 'group',
    label: 'Full-width Template',
    interfaceName: 'FullWidth',
    fields: [
      {
        name: 'components',
        type: 'blocks',
        blocks: [
          ColumnsBlock,
          ImageBlock,
          ImageTextGridBlock,
          // RichTextBlockWithSideNavLink,
          PastFeaturedGrantsGridBlock,
          StatsBlock,
          TableDrawersBlock,
          TalkingPoints,
          TwoColumnBlock,
          ApplicationProcess,
        ],
      },
    ],
  }
]
