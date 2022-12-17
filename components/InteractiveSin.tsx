import * as React from 'react'
import {
  Mafs,
  CartesianCoordinates,
  FunctionGraph,
  labelPi,
  Theme,
  Vector2,
  MovablePoint,
} from '../mafs'
import FrameMafs from './FrameMafs'

function InteractiveSin() {
  let [phase, setPhase] = React.useState<Vector2>([0, 0])
  let [amplitude, setAmplitude] = React.useState<Vector2>([Math.PI / 2, 1])
  let [period, setPeriod] = React.useState<Vector2>([2 * Math.PI, 0])

  let delPhi = (phase[0] * (2 * Math.PI)) / (period[0] - phase[0])
  let omega = (2 * Math.PI) / (period[0] - phase[0])
  return (
    <>
      <p className="text-lg text-center">
        Funktion: $f(t) = {parseFloat(amplitude[1].toFixed(2))} \cdot \sin(
        {parseFloat(omega.toFixed(2))} \cdot t {delPhi > 0 ? '- ' : '+ '}
        {Math.abs(parseFloat(delPhi.toFixed(2)))}
        )$
      </p>
      <FrameMafs>
        <Mafs height={400} yAxisExtent={[-2.5, 2.5]} xAxisExtent={[-15, 15]}>
          <CartesianCoordinates
            subdivisions={4}
            xAxis={{ lines: Math.PI, labels: labelPi }}
          />
          <FunctionGraph.OfX
            y={(x) => amplitude[1] * Math.sin(omega * x - delPhi)}
          />
          <MovablePoint
            point={period}
            onMove={(newPos) => {
              setPeriod([newPos[0], 0])
              setAmplitude([
                phase[0] + (newPos[0] - phase[0]) / 4,
                amplitude[1],
              ])
            }}
            color={Theme.green}
          />
          <MovablePoint
            point={phase}
            onMove={(newPos) => {
              setPeriod([period[0] + (newPos[0] - phase[0]), 0])
              setPhase([newPos[0], 0])
              setAmplitude([
                newPos[0] + (period[0] - newPos[0]) / 4,
                amplitude[1],
              ])
            }}
            color={Theme.orange}
          />
          <MovablePoint
            point={amplitude}
            onMove={(newPos) => {
              setAmplitude([amplitude[0], newPos[1]])
            }}
            color={Theme.blue}
          />
        </Mafs>
      </FrameMafs>
    </>
  )
}
export default InteractiveSin
