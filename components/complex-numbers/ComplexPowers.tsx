import * as React from 'react'
import {
  Mafs,
  Coordinates,
  MovablePoint,
  Theme,
  Line,
  Point,
} from 'mafs'
import { InlineMath } from 'react-katex'

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
  let generatePoints = (start: any, iterations: number) => {
    let p: Array<any> = []
    let curr: any = start

    p.push(curr)
    for (let index = 1; index < iterations; index++) {
      let copy: any = [
        curr[0] * start[0] - curr[1] * start[1],
        curr[0] * start[1] + curr[1] * start[0],
      ]
      p.push(copy)
      curr = copy
    }
    return p
  }
  let [points, setPoints] = React.useState<Array<any>>(
    generatePoints([re, im], iterations)
  )
  let [tip, setTip] = React.useState<any>([re, im])
  let imNumber = `z = ${tip[0].toFixed(2)}${tip[1] > 0 ? '+ ' : '- '}${Math.abs(
    parseFloat(tip[1].toFixed(2))
  )}i`
  return (
    <>
      <p className="text-lg text-center mt-5">
        <InlineMath>{imNumber}</InlineMath>
      </p>
      <div className="text-center my-4">
        <InlineMath>{'z^k \\text{ mit } k = ' + iterations.toFixed(0)}</InlineMath>: {' '}
        <input
          className="h-2.5"
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
        <Mafs viewBox={{x:[-3,3],y:[-3,3]}}>
          <Coordinates.Cartesian
            yAxis={{
              labels: (y) => {
                return y.toString() + 'i'
              },
            }}
          />
          {points.map((point: any, index: number) => (
            <Point x={point[0]} y={point[1]} key={index} />
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
            }
          })}
          {interactive ? (
            <MovablePoint
              point={tip}
              color={Theme.indigo}
              onMove={(newPoint: any) => {
                setTip(newPoint)
                setPoints(generatePoints(newPoint, iterations))
              }}
            />
          ) : null}
        </Mafs>
    </>
  )
}
export default ComplexPowers
