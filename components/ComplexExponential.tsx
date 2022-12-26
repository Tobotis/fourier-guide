import * as React from 'react'
import {
  Mafs,
  FunctionGraph,
  CartesianCoordinates,
  MovablePoint,
  Theme,
  Vector,
  Text,
  Vector2,
  Line,
  Circle,
  Point,
} from '../mafs'
import * as vec from 'vec-la'
import FrameMafs from './FrameMafs'
import TeX from '@matejmazur/react-katex'
import { Angle } from '../utils/mafs_extended/Angle'

const ComplexExponential = () => {
  let [n, setN] = React.useState<number>(3)
  let [theta, setTheta] = React.useState<number>(Math.PI / 8)
  let generatePoints = (n: number, theta: number) => {
    let p: Array<Vector2> = []
    let curr: Vector2 = [1, theta / n]
    p.push(curr)
    for (let index = 1; index < n; index++) {
      let copy: Vector2 = [
        curr[0] - (curr[1] * theta) / n,
        (curr[0] * theta) / n + curr[1],
      ]
      p.push(copy)
      curr = copy
    }
    return p
  }
  let [points, setPoints] = React.useState<Array<Vector2>>(
    generatePoints(n, theta)
  )
  let expTerm = `\\exp(\\theta i) \\approx \\left(1 ${
    theta / n >= 0 ? '+ ' : '- '
  } \\frac{${Math.abs(parseFloat(theta.toFixed(2)))}}{${Math.abs(
    parseFloat(n.toFixed(2))
  )}} i \\right)^{${n.toFixed(0)}}`
  return (
    <>
      <p className="text-lg text-center mt-5">
        <TeX>{expTerm}</TeX>
      </p>
      <div className="text-center my-4 flex-row">
        <div>
          <TeX>{'n = ' + n.toFixed(0)}</TeX>:{' '}
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
          <TeX>{'\\theta = ' + theta.toFixed(2)}</TeX>:{' '}
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
      <FrameMafs>
        <Mafs
          pan={false}
          xAxisExtent={[-2.75, 2.75]}
          yAxisExtent={[-1.75, 1.75]}
        >
          <CartesianCoordinates
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
          {points.map((point: Vector2, index: number) => (
            <Point x={point[0]} y={point[1]} key={index} r={3} />
          ))}
          {points.map((point: Vector2, index: number) => {
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
      </FrameMafs>
    </>
  )
}
export default ComplexExponential
