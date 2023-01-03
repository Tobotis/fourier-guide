import * as React from 'react'
import CoordinateContext, { CoordinateContextShape } from './CoordinateContext'
import PaneManager from './PaneManager'
import MapContext from './MapContext'
import useResizeObserver from 'use-resize-observer'
import * as vec from 'vec-la'

import { useGesture } from '@use-gesture/react'
import ScaleContext, { ScaleContextShape } from './ScaleContext'
import { round, Interval, Vector2 } from '../math'
import {
  NonSVGElement,
  NonSVGProps,
  NonSVGWrapper,
  NonSVGWrapperProps,
} from './NonSVGElement'
import { NonSVG } from '../display/NonSVGElements'
import {
  Alignment,
  alignmentToRelativeDeviationFromCenter,
  HTMLStyleObject,
} from '../../utils/general'

export interface MafsViewProps {
  width?: number | string
  height?: number
  pan?: boolean
  xAxisExtent?: Interval
  yAxisExtent?: Interval
  ssr?: boolean
  children?: any
  noNonSvg?: boolean
}

export const MafsView: React.FC<MafsViewProps> = ({
  width: desiredWidth = 'auto',
  height = 500,
  pan = true,
  xAxisExtent = [-5.5, 5.5],
  yAxisExtent = [-3.5, 3.5],
  children,
  ssr = false,
  noNonSvg = false,
}) => {
  const [visible, setVisible] = React.useState(ssr ? true : false)
  const desiredCssWidth = desiredWidth === 'auto' ? '100%' : `${desiredWidth}px`

  const { ref, width = ssr ? 500 : 1 } = useResizeObserver<HTMLDivElement>()

  React.useEffect(() => {
    setVisible(true)
  }, [visible])

  const [xMinDefault, xMaxDefault] = xAxisExtent
  const [yMinDefault, yMaxDefault] = yAxisExtent
  const [offset, setOffset] = React.useState<Vector2>([0, 0])
  const [xMin, yMin] = vec.add([xMinDefault, yMinDefault], offset)
  const [xMax, yMax] = vec.add([xMaxDefault, yMaxDefault], offset)

  const xSpan = xMax - xMin
  const ySpan = yMax - yMin

  const bind = useGesture(
    {
      onDrag: ({ offset: [mx, my] }) => {
        setOffset([(-mx / width) * xSpan, (my / height) * ySpan])
      },
    },
    { enabled: pan }
  )

  const mapX = React.useCallback(
    (x: number) => round(((x - xMin) / (xMax - xMin)) * width),
    [xMin, xMax, width]
  )

  const mapY = React.useCallback(
    (y: number) => round(((y - yMax) / (yMin - yMax)) * height),
    [yMin, yMax, height]
  )

  const centeredMapX = React.useCallback(
    (x: number) => {
      let xMid: number = (xMax + xMin) / 2
      let pxPerXStep: number = width / (xMax - xMin)
      return (-xMid + x) * pxPerXStep
    },
    [xMin, xMax, width]
  )

  const centeredMapY = React.useCallback(
    (y: number) => {
      let yMid: number = (yMax + yMin) / 2
      let pxPerYStep: number = height / (yMax - yMin)
      return (yMid - y) * pxPerYStep
    },
    [yMin, yMax, height]
  )

  const scaleX = React.useCallback(
    (x: number) => round((x / xSpan) * width, 5),
    [xSpan, width]
  )
  const scaleY = React.useCallback(
    (y: number) => round((-y / ySpan) * height, 5),
    [ySpan, height]
  )
  const unscaleX = React.useCallback(
    (x: number) => round((x / width) * xSpan, 5),
    [xSpan, width]
  )
  const unscaleY = React.useCallback(
    (y: number) => round((-y / height) * ySpan, 5),
    [ySpan, height]
  )
  const pixelMatrix = React.useMemo(
    () => vec.matrixBuilder().scale(scaleX(1), scaleY(1)).get(),
    [scaleX, scaleY]
  )
  const inversePixelMatrix = React.useMemo(
    () => vec.matrixBuilder().scale(unscaleX(1), unscaleY(1)).get(),
    [unscaleX, unscaleY]
  )

  const cssScale = `scale(${scaleX(1)} ${scaleY(1)})`

  const coordinateContext = React.useMemo<CoordinateContextShape>(
    () => ({
      xMin,
      xMax,
      yMin,
      yMax,
      height,
      width,
    }),
    [xMin, xMax, yMin, yMax, height, width]
  )

  const scaleContext = React.useMemo<ScaleContextShape>(
    () => ({
      scaleX,
      scaleY,
      pixelMatrix,
      inversePixelMatrix,
      cssScale,
      xSpan,
      ySpan,
    }),
    [scaleX, scaleY, xSpan, ySpan, pixelMatrix, inversePixelMatrix, cssScale]
  )

  const getElements = React.useMemo(() => {
    if (!children) {
      return [[], []]
    }
    let SVGElements: Array<React.ReactElement> = []
    let NonSVGElements: Array<React.ReactElement> = []
    if (!children?.length) {
      children = [children]
    }
    children.forEach((element: React.ReactElement) => {
      if (element.type === NonSVGWrapper) {
        NonSVGElements.push(element.props.children)
      } else {
        SVGElements.push(element)
      }
    })
    return [SVGElements, NonSVGElements]
  }, [children])

  const SVGGenerator = React.useMemo(() => {
    if (noNonSvg) {
      return <>{children.map((element: React.ReactNode) => element)} </>
    }
    return <>{getElements[0].map((element: React.ReactNode) => element)} </>
  }, [children])

  const nonSVGGenerator = React.useMemo(() => {
    if (noNonSvg) {
      return []
    }
    let nonSVGElements: Array<any> = getElements[1]

    let resultingElements: Array<React.ReactElement> = []

    if (nonSVGElements[0] == undefined || nonSVGElements == null) {
      return
    }

    for (let i: number = 0; i < nonSVGElements[0].length; i++) {
      let elem: any = nonSVGElements[0][i]

      let x: number | undefined = elem!.props['x']
      let y: number | undefined = elem!.props['y']

      let align: Alignment | undefined = elem!.props['align']
      let elem_width: number | undefined = elem!.props['width']
      let elem_height: number | undefined = elem!.props['height']

      if (x == undefined) {
        x = 0
      }
      if (y == undefined) {
        y = 0
      }
      if (align == undefined) {
        align = 'c'
      }
      if (elem_width == undefined) {
        elem_width = 1
      }
      if (elem_height == undefined) {
        elem_height = 1
      }

      let relativeOffsetFromCenter: Array<number> =
        alignmentToRelativeDeviationFromCenter(align)
      let pxX: number = centeredMapX(
        x + relativeOffsetFromCenter[0] * elem_width
      )
      let pxY: number = centeredMapY(
        y + relativeOffsetFromCenter[1] * elem_height
      )

      let style: HTMLStyleObject = {
        transform: `translate(${pxX}px, ${pxY}px) `,
      }

      let new_props: NonSVGProps = Object.create(elem.props)

      new_props.getScale = () => scaleContext
      elem = React.cloneElement(elem, new_props)
      // Only display the nonSVGElements if inside the viewport.
      // The check is intentionally very generous to prevent accidental removing of elements still in the viewport
      if (Math.abs(pxX) < width && Math.abs(pxY) < height) {
        resultingElements.push(
          <div className="nonsvgelement" style={style}>
            {elem}
          </div>
        )
      }
    }

    return <>{resultingElements}</>
  }, [offset, xSpan, ySpan, width, height, children])

  return (
    <div
      className="MafsWrapper overflow-hidden w-auto"
      style={{ width: desiredCssWidth }}
      ref={ref}
      {...bind()}
    >
      <CoordinateContext.Provider value={coordinateContext}>
        <ScaleContext.Provider value={scaleContext}>
          <MapContext.Provider value={{ mapX, mapY }}>
            <PaneManager>
              <div className="viewwrapper">
                {nonSVGGenerator}
                <svg
                  width={width}
                  height={height}
                  viewBox={`${-mapX(0)} ${-mapY(0)} ${width} ${height}`}
                  preserveAspectRatio="xMidYMin"
                  style={{
                    width: desiredCssWidth,
                    touchAction: pan ? 'none' : 'auto',
                  }}
                  className="MafsView"
                >
                  {visible && SVGGenerator}
                </svg>
              </div>
            </PaneManager>
          </MapContext.Provider>
        </ScaleContext.Provider>
      </CoordinateContext.Provider>
    </div>
  )
}
