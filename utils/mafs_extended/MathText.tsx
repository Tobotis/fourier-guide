import * as React from 'react'
import { useScaleContext } from '../../mafs/view/ScaleContext'
import TeX from '@matejmazur/react-katex'
import { NonSVGElement, NonSVGProps } from '../../mafs/view/NonSVGElement'

export interface MathTextProps extends NonSVGProps {
  size?: number
  text?: string
  color?: string
  opacity?: number
}

export const MathText: React.FC<MathTextProps> = ({
  color = 'white',
  opacity = 1,
  x = 0,
  y = 0,
  text = '',
  size = 24,
}) => {
  let style: object = {
    opacity: opacity,
    color: color,
    fontSize: size + 'px',
  }

  return (
    <NonSVGElement nonsvg x={x} y={y}>
      <TeX block style={style}>
        {text}
      </TeX>
    </NonSVGElement>
  )
}
