import LexicalRenderer from '../../LexicalRenderer'

type CareersTeaserGridProps = {
  careers: any
  emptyListingsText: any
}

export default function CareersTeaserGrid({ careers, emptyListingsText }: CareersTeaserGridProps) {
  if (careers.length === 0) {
    return (
      <LexicalRenderer content={emptyListingsText} />
    )
  }
  return (
    <div>
      GRID!!!!!!!!
    </div>
  )
}
