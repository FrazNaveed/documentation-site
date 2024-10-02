import cx from 'classnames'

export type StatsProps = {
  className?: string
}

export default function Stats({
  className
}: StatsProps) {
  return (
    <section>
      <div>
        <div>
          <p>stats list</p>
        </div>
        <div>
          <p>caption</p>
        </div>
      </div>

    </section>
  )
}
