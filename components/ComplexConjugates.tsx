import * as React from 'react'
import {
  Mafs,
  CartesianCoordinates,
  Vector,
  useStopwatch,
  Circle,
  useMovablePoint,
  Polygon,
  Point,
} from '../mafs'
import FrameMafs from './FrameMafs'
import TeX from '@matejmazur/react-katex'

const ComplexConjugates = ({ omega = (2 * Math.PI) / 5 }) => {
  const { time, start, stop } = useStopwatch()
  const tip = useMovablePoint([1, 1])
  React.useEffect(() => stop(), [stop])
  let imNumber = `c_1 = ${tip.x.toFixed(2)}${
    tip.y >= 0 ? '+ ' : '- '
  }${Math.abs(parseFloat(tip.y.toFixed(2)))}i`
  let imNumberConj = `c_{-1} = \\overline{c_1} = ${tip.x.toFixed(2)}${
    -tip.y > 0 ? '+ ' : '- '
  }${Math.abs(parseFloat((-tip.y).toFixed(2)))}i`
  return (
    <FrameMafs>
      <>
        <div className="p-4 bg-black border-t border-gray-900  flex justify-between">
          <div className="space-x-4 ">
            <button
              className="bg-gray-200 font-bold px-4 py-1 rounded-sm text-gray-900"
              onClick={start}
            >
              Start
            </button>
            <button
              className="bg-gray-200 font-bold px-4 py-1 rounded-sm text-gray-900"
              onClick={stop}
            >
              Stop
            </button>
          </div>
          <p className="text-lg text-center text-slate-50">
            <TeX>{imNumber + '\\qquad ' + imNumberConj}</TeX>
          </p>
        </div>
        <Mafs pan={false}>
          <CartesianCoordinates
            yAxis={{
              labels: (y) => {
                return y.toString() + 'i'
              },
            }}
          />
          <>
            <Circle
              center={[0, 0]}
              radius={Math.sqrt(Math.pow(tip.x, 2) + Math.pow(tip.y, 2))}
              strokeStyle="dashed"
              strokeOpacity={0.3}
              fillOpacity={0}
            />
            <Vector
              tip={[
                tip.x * Math.cos(time * omega) - tip.y * Math.sin(time * omega),
                tip.x * Math.sin(time * omega) + tip.y * Math.cos(time * omega),
              ]}
            />
            <Vector
              tip={[
                tip.x * Math.cos(-time * omega) -
                  -tip.y * Math.sin(-time * omega),
                tip.x * Math.sin(-time * omega) +
                  -tip.y * Math.cos(-time * omega),
              ]}
            />
            <Point
              x={
                tip.x * Math.cos(time * omega) -
                tip.y * Math.sin(time * omega) +
                tip.x * Math.cos(-time * omega) -
                -tip.y * Math.sin(-time * omega)
              }
              y={0}
            />
            <Polygon
              points={[
                [
                  tip.x * Math.cos(-time * omega) -
                    -tip.y * Math.sin(-time * omega),
                  tip.x * Math.sin(-time * omega) +
                    -tip.y * Math.cos(-time * omega),
                ],
                [
                  tip.x * Math.cos(time * omega) -
                    tip.y * Math.sin(time * omega) +
                    tip.x * Math.cos(-time * omega) -
                    -tip.y * Math.sin(-time * omega),
                  0,
                ],
                [
                  tip.x * Math.cos(time * omega) -
                    tip.y * Math.sin(time * omega),
                  tip.x * Math.sin(time * omega) +
                    tip.y * Math.cos(time * omega),
                ],
                [0, 0],
              ]}
              strokeStyle="dashed"
            />
          </>

          {tip.element}
        </Mafs>
      </>
    </FrameMafs>
  )
}
export default ComplexConjugates
