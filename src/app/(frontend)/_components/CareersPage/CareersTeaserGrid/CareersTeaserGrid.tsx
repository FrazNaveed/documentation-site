type CareersTeaserGridProps = {
  careers: any
  emptyListingsText: any
}

export default function CareersTeaserGrid({ careers, emptyListingsText }: CareersTeaserGridProps) {
  if (careers.length === 0) {
    return (
      <div>
        render in lexical:
        {emptyListingsText}
      </div>
    )
  }
  return (
    <div>
      GRID!!!!!!!!
    </div>
  )
}
