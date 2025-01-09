import NumberFlow from '@number-flow/react'

type AnimatedNumberProps = {
  value: number
  className?: string
}

export const AnimatedNumber = ({ value, className }: AnimatedNumberProps) => {
  return (
    <NumberFlow
      value={value}
      format={{ useGrouping: false }}
      className={className}
    />
  )
}

