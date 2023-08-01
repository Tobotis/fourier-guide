import * as React from 'react'
import {
  Mafs,
  Plot,
  Coordinates,
  Line,
  Circle,
  Point,
} from 'mafs'
import { InlineMath } from 'react-katex'

const ComplexExponential = () => {
  let [n, setN] = React.useState<number>(3)
  let [theta, setTheta] = React.useState<number>(Math.PI / 8)
  let generatePoints = (n: number, theta: number) => {
    let p: Array<any> = []
    let curr: any = [1, theta / n]
    p.push(curr)
    for (let index = 1; index < n; index++) {
      let copy: any = [
        curr[0] - (curr[1] * theta) / n,
        (curr[0] * theta) / n + curr[1],
      ]
      p.push(copy)
      curr = copy
    }
    return p
  }
  let [points, setPoints] = React.useState<Array<any>>(
    generatePoints(n, theta)
  )
  let expTerm = `\\exp(\\theta i) \\approx \\left(1 ${
    theta / n >= 0 ? '+ ' : '- '
  } \\frac{${Math.abs(
    parseFloat((theta / Math.PI).toFixed(2))
  )} \\pi}{${Math.abs(parseFloat(n.toFixed(2)))}} i \\right)^{${n.toFixed(0)}}`
  return (
    <>
      <p className="text-lg text-center mt-5">
        <InlineMath>{expTerm}</InlineMath>
      </p>
      <div className="text-center my-4 flex-row">
        <div>
          <InlineMath>{'n = ' + n.toFixed(0)}</InlineMath>:{' '}
          <input
            className="h-2.5"
            type="range"
            min={1}
            max={500}
            value={n}
            onChange={(event) => {
              setN(+event.target.value)
              setPoints(generatePoints(+event.target.value, theta))
            }}
          />
        </div>

        <div>
          <InlineMath>{'\\theta = ' + theta.toFixed(2)}</InlineMath>:{' '}
          <input
            className="h-2.5"
            type="range"
            step={0.01}
            min={0}
            max={2 * Math.PI}
            value={theta}
            onChange={(event) => {
              setTheta(+event.target.value)
              setPoints(generatePoints(n, +event.target.value))
            }}
          />
        </div>
      </div>
        <Mafs
          pan={false}
          viewBox={{x:[-2.75, 2.75], y:[-1.75, 1.75]}}
        >
          <Coordinates.Cartesian
            yAxis={{
              labels: (y) => {
                return y.toString() + 'i'
              },
            }}
          />
          <Circle
            center={[0, 0]}
            radius={1}
            strokeStyle="dashed"
            strokeOpacity={0.3}
            fillOpacity={0}
          />
          {points.map((point: any, index: number) => (
            <Point x={point[0]} y={point[1]} key={index} svgCircleProps={{r:"2"}}/>
          ))}
          {points.map((point: any, index: number) => {
            if (index > 0) {
              return (
                <Line.Segment
                  key={index}
                  point1={points[index - 1]}
                  point2={point}
                  opacity={1}
                />
              )
            } else {
              return (
                <Line.Segment
                  key={index}
                  point1={[1, 0]}
                  point2={point}
                  opacity={1}
                />
              )
            }
          })}
        </Mafs>
    </>
  )
}
export default ComplexExponential
