import * as React from 'react'
import {
  Mafs,
  Coordinates,
  Plot,
  labelPi,
  Theme,
  MovablePoint,
} from 'mafs'
import { InlineMath } from 'react-katex'

function InteractiveSin() {
  let [phase, setPhase] = React.useState<any>([0, 0])
  let [amplitude, setAmplitude] = React.useState<any>([Math.PI / 2, 1])
  let [period, setPeriod] = React.useState<any>([2 * Math.PI, 0])

  let delPhi = (phase[0] * (2 * Math.PI)) / (period[0] - phase[0])
  let omega = (2 * Math.PI) / (period[0] - phase[0])
  let functionTex = `f(t) = ${parseFloat(
    amplitude[1].toFixed(2)
  )} \\cdot \\sin(${parseFloat(omega.toFixed(2))} \\cdot t ${
    delPhi > 0 ? '- ' : '+ '
  }${Math.abs(parseFloat(delPhi.toFixed(2)))})`
  return (
    <>
      <p className="text-lg text-center m-5">
        <InlineMath>{functionTex}</InlineMath>
      </p>
        <Mafs viewBox={{x:[-2.5,2.5],y:[-8,8]}}>
          <Coordinates.Cartesian
            xAxis={{ lines: Math.PI, labels: labelPi }}
          />
          <Plot.OfX
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
    </>
  )
}
export default InteractiveSin
