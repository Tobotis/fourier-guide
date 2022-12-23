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
  Point,
} from '../mafs'
import * as vec from 'vec-la'
import FrameMafs from './FrameMafs'
import TeX from '@matejmazur/react-katex'
import { Angle } from '../utils/mafs_extended/Angle'
import { TimerOptions } from 'timers'
import { timeStamp } from 'console'

interface ComplexPowerProps {
  re: number
  im: number
  interactive: boolean
}

const ComplexPowers: React.FC<ComplexPowerProps> = ({
  re = Math.cos(0.5),
  im = 1.1 * Math.sin(0.5),
  interactive = true,
}: ComplexPowerProps) => {
  let [iterations, setIterations] = React.useState<number>(20)
  let generatePoints = (start: Vector2, iterations: number) => {
    let p: Array<Vector2> = []
    let curr: Vector2 = start

    p.push(curr)
    for (let index = 1; index < iterations; index++) {
      let copy: Vector2 = [
        curr[0] * start[0] - curr[1] * start[1],
        curr[0] * start[1] + curr[1] * start[0],
      ]
      p.push(copy)
      curr = copy
    }
    return p
  }
  let [points, setPoints] = React.useState<Array<Vector2>>(
    generatePoints([re, im], iterations)
  )
  let [tip, setTip] = React.useState<Vector2>([re, im])
  let imNumber = `z = ${tip[0].toFixed(2)}${tip[1] > 0 ? '+ ' : '- '}${Math.abs(
    parseFloat(tip[1].toFixed(2))
  )}i`
  return (
    <>
      <p className="text-lg text-center mt-5">
        <TeX>{imNumber}</TeX>
      </p>
      <div className="text-center my-4">
        <TeX>{'z^k \\text{ mit } k = ' + iterations.toFixed(0)}</TeX>:{' '}
        <input
          className="appearance-none h-2"
          type="range"
          min={2}
          max={40}
          value={iterations}
          onChange={(event) => {
            setIterations(+event.target.value)
            setPoints(generatePoints(tip, +event.target.value))
          }}
        />
      </div>
      <FrameMafs>
        <Mafs>
          <CartesianCoordinates
            yAxis={{
              labels: (y) => {
                return y.toString() + 'i'
              },
            }}
          />
          {points.map((point: Vector2, index: number) => (
            <Point x={point[0]} y={point[1]} key={index} />
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
            }
          })}
          {interactive ? (
            <MovablePoint
              point={tip}
              color={Theme.blue}
              onMove={(newPoint: Vector2) => {
                setTip(newPoint)
                setPoints(generatePoints(newPoint, iterations))
              }}
            />
          ) : null}
        </Mafs>
      </FrameMafs>
    </>
  )
}
export default ComplexPowers
