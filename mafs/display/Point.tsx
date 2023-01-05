import * as React from 'react'
import { useScaleContext } from '../view/ScaleContext'
import { Theme } from './Theme'

export interface PointProps {
  x: number
  y: number
  color?: string
  opacity?: number
  r?: number
  svgCircleProps?: React.SVGProps<SVGCircleElement>
}

export const Point: React.VFC<PointProps> = ({
  x,
  y,
  color = Theme.foreground,
  opacity = 1,
  svgCircleProps = {},
  r = 6,
}) => {
  const { scaleX, scaleY } = useScaleContext()

  return (
    <circle
      cx={scaleX(x)}
      cy={scaleY(y)}
      r={r}
      {...svgCircleProps}
      style={{ fill: color, opacity, ...svgCircleProps.style }}
    />
  )
}
