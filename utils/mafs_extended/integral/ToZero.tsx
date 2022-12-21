import * as React from 'react'
import { round } from '../../../mafs/math'
import { usePaneContext } from '../../../mafs/view/PaneManager'
import { Stroked } from '../../../mafs/display/Theme'
import { useScaleContext } from '../../../mafs/view/ScaleContext'
import { Interval } from '../../../mafs/math'
import { clamp } from '../../math_ext'

export interface IntegralToZeroProps extends Stroked {
  y: (x: number) => number
  quality?: 'low' | 'medium' | 'high'
  svgPathProps?: React.SVGProps<SVGPathElement>
  belowColor: string
  aboveColor: string
  leftBound: number
  rightBound: number
}

export const ToZero: React.VFC<IntegralToZeroProps> = ({
  y,
  quality = 'low',
  opacity = 0.3,
  style,
  svgPathProps = {},
  belowColor = 'red',
  aboveColor = 'green',
  leftBound = -Infinity,
  rightBound = Infinity,
}) => {
  const { cssScale } = useScaleContext()
  const { xPanes: panes, yPaneRange } = usePaneContext()

  // Ignore points that are very high or low
  const yUpperBound = yPaneRange[1]
  const yLowerBound = yPaneRange[0]

  let subsampling: number
  switch (quality) {
    case 'low':
      subsampling = 0.5
      break
    case 'medium':
      subsampling = 1
      break
    case 'high':
      subsampling = 2
      break
  }

  const getSegment = React.useCallback(
    (min: number, max: number) => {
      const dx = (max - min) / (500 * subsampling)

      let points: number[][] = []

      for (let x = min; x <= max; x += dx) {
        const yx = y(x)
        if (yx <= yUpperBound && yx >= yLowerBound) {
          points.push([round(x, 3), round(yx, 3)])
        }
      }

      return points
    },
    [y, yLowerBound, yUpperBound, subsampling]
  )

  const xyChecker = (x: number, y: number, position?: "above" | "below") => {
    y =  position=="above" ? clamp(y, 0, Infinity) : clamp(y, -Infinity, 0)
    let isInBounds: boolean = leftBound <= x && x <= rightBound;
    y = isInBounds ? y : 0;
    return [x, y]
  }

  const generatePathAbove = React.useMemo(() => {
    let path: string = ''

    let firstPane: Interval = panes[0]
    let firstXValue: number | undefined = firstPane?.at(0)

    let lastPane: Interval | undefined = panes.at(-1)
    let lastXValue: number | undefined = lastPane?.at(1)

    let startAtZero: string = `M ${firstXValue} 0 `

    path += startAtZero

    let callback: number[][] = getSegment(
      firstXValue ? firstXValue : 0,
      lastXValue ? lastXValue : 0
    )

    callback.forEach((arr: number[]) => {
      let [x,y] = xyChecker(arr[0], arr[1], "above")

      path += `L ${x} ${y} `
    })

    let returnToZero: string = `L ${lastXValue} 0`

    path += returnToZero

    return path
  }, [panes, getSegment])

  const generatePathBelow = React.useMemo(() => {
    let path: string = ''

    let firstPane: Interval = panes[0]
    let firstXValue: number | undefined = firstPane?.at(0)

    let lastPane: Interval | undefined = panes.at(-1)
    let lastXValue: number | undefined = lastPane?.at(1)

    let startAtZero: string = `M ${firstXValue} 0 `

    path += startAtZero

    let callback: number[][] = getSegment(
      firstXValue ? firstXValue : 0,
      lastXValue ? lastXValue : 0
    )

    callback.forEach((arr: number[]) => {
      let [x,y] = xyChecker(arr[0], arr[1], "below")
      path += `L ${arr[0]} ${y} `
    })

    let returnToZero: string = `L ${lastXValue} 0`

    path += returnToZero

    return path
  }, [panes, getSegment])

  return (
    <>
      <path
        d={generatePathAbove}
        fill={aboveColor}
        transform={cssScale}
        {...svgPathProps}
        style={{
          stroke: 'none',
          opacity,
          vectorEffect: 'non-scaling-stroke',
          ...(svgPathProps?.style || {}),
        }}
      />
      <path
        d={generatePathBelow}
        fill={belowColor}
        transform={cssScale}
        {...svgPathProps}
        style={{
          stroke: 'none',
          opacity,
          vectorEffect: 'non-scaling-stroke',
          ...(svgPathProps?.style || {}),
        }}
      />
    </>
  )
}
