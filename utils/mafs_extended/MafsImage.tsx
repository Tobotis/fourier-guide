import * as React from 'react'
import { NonSVGElement, NonSVGProps } from '../../mafs/view/NonSVGElement'
import { ScaleContextShape } from '../../mafs/view/ScaleContext'
import { Alignment, alignmentToRelativeDeviationFromCenter } from '../general'

export interface MafsImageProps extends NonSVGProps {
  width?: number
  height?: number
  source?: string
  opacity?: number
  alt?: string
  getScale?: () => ScaleContextShape
}

export const MafsImage: React.FC<MafsImageProps> = ({
  width = 1,
  height = 1,
  opacity = 1,
  x = 0,
  y = 0,
  source = '',
  alt = 'Unbennantes Bild',
  getScale = () => undefined,
  align = 'c',
}) => {
  let style: object = {
    opacity: opacity,
  }

  const scale = React.useMemo(() => {
    return getScale()
  }, [getScale])

  const pxWidth = React.useMemo(() => {
    return scale?.scaleX(1) != undefined ? width * scale.scaleX(1) : 100
  }, [scale])

  const pxHeight = React.useMemo(() => {
    return scale?.scaleY(1) != undefined ? height * scale.scaleY(1) : 100
  }, [scale])

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
