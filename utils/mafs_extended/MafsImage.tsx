import * as React from 'react'
import { NonSVGElement, NonSVGProps } from '../../mafs/view/NonSVGElement'
import {
  ScaleContextShape,
  useScaleContext,
} from '../../mafs/view/ScaleContext'
import { Alignment, alignmentToRelativeDeviationFromCenter } from '../general'

export interface MafsImageProps extends NonSVGProps {
  width?: number
  height?: number
  source?: string
  opacity?: number
  alt?: string
}

export const MafsImage: React.FC<MafsImageProps> = ({
  width = 1,
  height = 1,
  opacity = 1,
  x = 0,
  y = 0,
  source = '',
  alt = 'Unbennantes Bild',
  align = 'c',
}) => {
  let style: object = {
    opacity: opacity,
  }

  let { scaleX, scaleY } = useScaleContext()

  const pxWidth = React.useMemo(() => {
    return width * scaleX(1)
  }, [scaleX])

  const pxHeight = React.useMemo(() => {
    return height * scaleY(1)
  }, [scaleY])

  return (
    <NonSVGElement nonsvg>
      <img
        style={style}
        alt={alt}
        src={source}
        width={pxWidth}
        height={pxHeight}
        title={alt}
      ></img>
    </NonSVGElement>
  )
}
