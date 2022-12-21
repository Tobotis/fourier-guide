import * as React from 'react'
import { round } from '../../mafs/math'
import { usePaneContext } from '../../mafs/view/PaneManager'
import { Stroked } from '../../mafs/display/Theme'
import { useScaleContext } from '../../mafs/view/ScaleContext'
import { Interval } from '../../mafs/math'
import { clamp } from '../math_ext'
import { Text } from '../../mafs'

/* Beispiel-Nutzung:

<FrameMafs> 
  <Mafs> 
    <CartesianCoordinates />
    <Angle position={[1,0]} start_angle={0} end_angle={0.7 * pi} radius={3} label={"Label"}/>
  </Mafs>
</FrameMafs>





*/

export interface AngleProps extends Stroked {
  svgPathProps?: React.SVGProps<SVGPathElement>
  position: number[]
  radius: number
  start_angle: number
  end_angle: number
  label: string
}

export const pi : number = Math.PI

export const Angle: React.VFC<AngleProps> = ({
  color = "white",
  weight = 3,
  opacity = 1,
  style,
  svgPathProps = {},
  radius = 1,
  start_angle = 0,
  end_angle = Math.PI,
  position = [0, 0],
  label = ""


}) => {
  const { cssScale } = useScaleContext()
  const { xPanes: panes, yPaneRange } = usePaneContext()

  const generateLabel = React.useMemo(() => {

    let x: number = position[0]
    let y: number = position[1]

    let mid_angle = (start_angle + end_angle) / 2

    let text_x: number = x + Math.cos(mid_angle) * radius * 1.1
    let text_y: number = y + Math.sin(mid_angle) * radius * 1.1

    let istLinks: boolean = mid_angle > Math.PI / 2 && mid_angle < 3 / 2 * Math.PI

    return <Text x={text_x} y={text_y} attach={istLinks ? "w" : "e" }>{label}</Text>
    

  }, [radius, start_angle, end_angle, position, label])

  const generatePath = React.useMemo(() => {

    let x: number = position[0]
    let y: number = position[1]

    let startPosition_x: number = x + Math.cos(start_angle) * radius
    let startPosition_y: number = y + Math.sin(start_angle) * radius
    let endPosition_x: number = x + Math.cos(end_angle) * radius
    let endPosition_y: number = y + Math.sin(end_angle) * radius

    let startPath: string = `M ${startPosition_x} ${startPosition_y} `

    let istÜberstumpf: boolean = end_angle - start_angle > Math.PI
    

    let arcPath: string = `A ${radius} ${radius} 0 ${istÜberstumpf ? 1 : 0} 1 ${endPosition_x} ${endPosition_y} `
     
    return startPath + arcPath

    

  }, [radius, start_angle, end_angle, position])


  return (
    <>
      <path
        d={generatePath}
        transform={cssScale}
        {...svgPathProps}
        style={{
          stroke: color,
          strokeWidth: weight,
          fill: "none",
          opacity,
          vectorEffect: 'non-scaling-stroke',
          ...(svgPathProps?.style || {}),
        }}
      />
      {generateLabel}

    </>
  )
}
