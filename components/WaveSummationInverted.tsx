import * as React from 'react'
import FrameMafs from './FrameMafs'
import * as vec from 'vec-la'
import { sinSum } from '../utils/math_ext'
import {
  Mafs,
  FunctionGraph,
  CartesianCoordinates,
  useMovablePoint,
  MovablePoint,
  Vector2,
  Vector,
  Theme,
} from '../mafs'

type props = {
  fixedCoordinates: Vector2[]
}

const WaveSummationInverted: React.FC<props> = ({ fixedCoordinates }) => {
  const [numPoints, setNumPoints] = React.useState(3)

  let [coordinates, setCoordinates] = React.useState<Vector2[]>([])

  for (let i = 0; i < numPoints; i++) {
    if (i >= coordinates.length) {
      coordinates.push([Math.random() * 6 - 3, Math.random() * 4 - 2])
    }
  }
  coordinates = coordinates.slice(0, numPoints)

  return (
    <div>
      <>
        <div className="text-center mt-5">
          Anzahl Sinus-Summanden: {numPoints}{' '}
          <input
            className="h-2.5"
            type="range"
            min={1}
            max={6}
            value={numPoints}
            onChange={(event) => setNumPoints(+event.target.value)}
          />
        </div>
        <FrameMafs>
          <div className="flex justify-between gap-5">
            <Mafs
              yAxisExtent={[
                -1.1 *
                  fixedCoordinates.reduce(
                    (pSum, coordinate) => pSum + Math.abs(coordinate[1]),
                    0
                  ),
                1.1 *
                  fixedCoordinates.reduce(
                    (pSum, coordinate) => pSum + Math.abs(coordinate[1]),
                    0
                  ),
              ]}
              xAxisExtent={[
                -5 *
                  Math.max(
                    ...fixedCoordinates.map((value) => Math.abs(value[0]))
                  ),
                5 *
                  Math.max(
                    ...fixedCoordinates.map((value) => Math.abs(value[0]))
                  ),
              ]}
            >
              <CartesianCoordinates
                xAxis={{
                  labels: (x) => (x % 5 == 0 ? x : ''),
                  lines: 5,
                }}
              />
              {coordinates.map(function (coordinate, i) {
                return (
                  <>
                    <FunctionGraph.OfX
                      quality="high"
                      y={(x) =>
                        coordinate[1] *
                        Math.sin(((x / coordinate[0]) * Math.PI) / 2)
                      }
                    ></FunctionGraph.OfX>
                    <MovablePoint
                      point={coordinate}
                      onMove={(newPos) => {
                        let copy = coordinates
                        copy[i] = newPos
                        setCoordinates(copy)
                      }}
                    />
                  </>
                )
              })}
            </Mafs>
            <Mafs
              pan={false}
              yAxisExtent={[
                -1.1 *
                  fixedCoordinates.reduce(
                    (pSum, coordinate) => pSum + Math.abs(coordinate[1]),
                    0
                  ),
                1.1 *
                  fixedCoordinates.reduce(
                    (pSum, coordinate) => pSum + Math.abs(coordinate[1]),
                    0
                  ),
              ]}
              xAxisExtent={[
                -5 *
                  Math.max(
                    ...fixedCoordinates.map((value) => Math.abs(value[0]))
                  ),
                5 *
                  Math.max(
                    ...fixedCoordinates.map((value) => Math.abs(value[0]))
                  ),
              ]}
            >
              <CartesianCoordinates
                xAxis={{
                  labels: (x) => (x % 5 == 0 ? x : ''),
                  lines: 5,
                }}
              />
              <FunctionGraph.OfX
                quality="high"
                y={(x) => sinSum(x, coordinates)}
              ></FunctionGraph.OfX>
              <FunctionGraph.OfX
                quality="high"
                y={(x) => sinSum(x, fixedCoordinates)}
                color={Theme.red}
                style="dashed"
              ></FunctionGraph.OfX>
            </Mafs>
          </div>
        </FrameMafs>
      </>
    </div>
  )
}
export default WaveSummationInverted
