import * as React from 'react'
import { useScaleContext } from '../../mafs/view/ScaleContext'
import TeX from '@matejmazur/react-katex';


export interface MathTextProps{
  position: number[]
  size: number
  text: string
  color: string
  weight: number
  opacity: number
}



export const MathText: React.VFC<MathTextProps> = ({
  color = "white",
  weight = 3,
  opacity = 1,
  position = [0, 0],
  text = "",
  size = 1,


}) => {
  const { cssScale } = useScaleContext()

  

  return (
    <>
      <TeX block>{text}</TeX>
      </>
  )
}
