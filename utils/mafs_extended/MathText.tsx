import * as React from 'react'
import { useScaleContext } from '../../mafs/view/ScaleContext'
import TeX from '@matejmazur/react-katex'
import { NonSVG, NonSVGProps } from '../../mafs/view/NonSVGElement'

/* Beispiel:
  <FrameMafs>
    <Mafs xAxisExtent={[-3, 9]} yAxisExtent={[-3, 3]}>
      <CartesianCoordinates />
      <MathText
        nonsvg
        text="x^2"
        position={[0, 0]}
        color="red"
        size={24}
      ></MathText>
    </Mafs>
  </FrameMafs>
*/

export interface MathTextProps extends NonSVGProps {
  position: number[]
  size: number
  text: string
  color: string
  opacity: number
}

export const MathText: React.FC<MathTextProps> = ({
  color = 'white',
  opacity = 1,
  position = [0, 0],
  text = '',
  size = 24,
}) => {
  const { cssScale } = useScaleContext()

  let style: object = {
    opacity: opacity,
    color: color,
    fontSize: size + 'px',
  }

  return (
    <NonSVG nonsvg x={position[0]} y={position[1]}>
      <TeX block style={style}>
        {text}
      </TeX>
    </NonSVG>
  )
}