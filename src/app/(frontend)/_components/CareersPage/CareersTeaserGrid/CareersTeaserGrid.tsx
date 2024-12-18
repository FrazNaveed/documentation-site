type CareersTeaserGridProps = {
  careers: any
}

export default function CareersTeaserGrid({ careers }: CareersTeaserGridProps) {
  if (careers.length === 0) {
    return (
      <div>
        get content from page template
      </div>
    )
  }
  return (
    <div>
      GRID!!!!!!!!
    </div>
  )
}
