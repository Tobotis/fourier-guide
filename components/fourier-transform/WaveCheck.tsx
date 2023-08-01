import * as React from 'react'
import { InlineMath } from 'react-katex'
import ProductIntegral from './FixedProductIntegral'
//import { Integral } from '../utils/mafs_extended/Integral'
import {
  Mafs,
  Plot,
  Coordinates,
  Theme,
} from 'mafs'

type props = {
  children: any
  fixed_periodendauer: any
  leftBound?: number
  rightBound?: number
}

const WaveCheck: React.FC<props> = ({
  children,
  fixed_periodendauer,
  leftBound = -Infinity,
  rightBound = Infinity,
}) => {
  let [periodendauer, setPeriodendauer] = React.useState(
    0.1 * fixed_periodendauer + fixed_periodendauer
  )

  let [istFlächeAngezeigt, setIstFlächeAngezeigt] = React.useState(true)

  let [istGesuchterGraphAngezeigt, setIstGesuchterGraphAngezeigt] =
    React.useState(true)

  let [istProduktAngezeigt, setIstProduktAngezeigt] = React.useState(true)

  return (
    <div>
      <>
        <div className="flex gap-1 my-5">
          <div className="w-full flex-col mr-2">
            <div className="m-5 text-center text-xs">
              <InlineMath>
                  {'\\Re(f(t) \\cdot e^{- 2 \\pi \\xi i t}) = \\color{purple}{\\cos(- 2 \\pi \\xi t) \\cdot f(t)}'}
              </InlineMath>
            </div>
            <div className="rounded-lg">
              <Mafs
              viewBox={{x:[leftBound,rightBound],y:[-1.3,1.3]}}
                pan={false}
              >
                                  <Coordinates.Cartesian/>
                {/*istFlächeAngezeigt ? (
                  <Integral.ToZero
                    y={(x: number) =>
                      x < 6
                        ? x > -6
                          ? Math.sin(
                              (x / fixed_periodendauer) * (2 * Math.PI)
                            ) * Math.cos((x / periodendauer) * (2 * Math.PI))
                          : 0
                        : 0
                    }
                    belowColor="red"
                    aboveColor="green"
                    quality="high"
                    leftBound={-Infinity}
                    rightBound={Infinity}
                  ></Integral.ToZero>
                ) : (
                  <></>
                )*/}
                <>
                  <Plot.OfX
                    y={(x) => Math.cos((x / periodendauer) * (2 * Math.PI))}
                    color={Theme.blue}
                  ></Plot.OfX>

                  {istGesuchterGraphAngezeigt ? (
                    <Plot.OfX
                      y={(x) =>
                        x < 6
                          ? x > -6
                            ? Math.sin(
                                (x / fixed_periodendauer) * (2 * Math.PI)
                              )
                            : 0
                          : 0
                      }
                    ></Plot.OfX>
                  ) : (
                    <></>
                  )}
                  {istProduktAngezeigt ? (
                    <Plot.OfX
                      y={(x) =>
                        x < 6
                          ? x > -6
                            ? Math.sin(
                                (x / fixed_periodendauer) * (2 * Math.PI)
                              ) * Math.cos((x / periodendauer) * (2 * Math.PI))
                            : 0
                          : 0
                      }
                      color="purple"
                    ></Plot.OfX>
                  ) : (
                    <></>
                  )}
                </>
                {/*<NonSVGWrapper>
                  <NonSVG.MathText
                    text={
                      isClose.Relative(periodendauer, 4, 0.03)
                        ? 'A \\to \\infty'
                        : 'A \\approx 0'
                    }
                    x={-6}
                    y={1.15}
                    size={25}
                  />
                  </NonSVGWrapper>*/}

              </Mafs>
            </div>
          </div>
          <div className="w-full flex-col ml-2">
            <div className="m-5 text-center text-xs">
              <InlineMath>
                {
                  '\\Im(f(t) \\cdot e^{- 2 \\pi \\xi i t}) = \\color{purple}{\\sin(- 2 \\pi \\xi t) \\cdot f(t)}'
                }
              </InlineMath>
            </div>
            <div className="rounded-lg">
              <Mafs
                viewBox={{y:[-1.3,1.3],x:[leftBound,rightBound]}}
                pan={false}
              >
                <Coordinates.Cartesian/>
                {/*istFlächeAngezeigt ? (
                  <Integral.ToZero
                    y={(x: number) =>
                      x < 6
                        ? x > -6
                          ? Math.sin(
                              (x / fixed_periodendauer) * (2 * Math.PI)
                            ) * Math.sin((x / periodendauer) * (2 * Math.PI))
                          : 0
                        : 0
                    }
                    belowColor="red"
                    aboveColor="green"
                    quality="high"
                    leftBound={-Infinity}
                    rightBound={Infinity}
                  ></Integral.ToZero>
                ) : (
                  <></>
                )*/}
                <>
                  <Plot.OfX
                    y={(x) => Math.sin((x / periodendauer) * (2 * Math.PI))}
                    color={Theme.blue}
                  ></Plot.OfX>

                  {istGesuchterGraphAngezeigt ? (
                    <Plot.OfX
                      y={(x) => 0}
                    ></Plot.OfX>
                  ) : (
                    <></>
                  )}
                  {istProduktAngezeigt ? (
                    <Plot.OfX
                      y={(x) =>
                        x < 6
                          ? x > -6
                            ? Math.sin(
                                (x / fixed_periodendauer) * (2 * Math.PI)
                              ) * Math.sin((x / periodendauer) * (2 * Math.PI))
                            : 0
                          : 0
                      }
                      color="purple"
                    ></Plot.OfX>
                  ) : (
                    <></>
                  )}
                </>
                {/*<NonSVGWrapper>
                  <NonSVG.MathText
                    text={
                      isClose.Relative(periodendauer, 4, 0.03)
                        ? 'A \\to \\infty'
                        : 'A \\approx 0'
                    }
                    x={0}
                    y={0.75}
                    size={25}
                  />
                  </NonSVGWrapper>*/}
              </Mafs>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <InlineMath>
              {'\\text{Frequenz } \\xi \\approx' +
                (1 / periodendauer).toFixed(2)}
            </InlineMath>
            <input
              type="range"
              className="align-middle"
              min={1 / (fixed_periodendauer * 4)}
              max={1 / (fixed_periodendauer / 2)}
              step={0.01}
              value={1 / periodendauer}
              onChange={(event) => setPeriodendauer(1 / +event.target.value)}
            />
          </div>
          <div className="flex gap-1">
            <InlineMath>{'f(t) \\text{ anzeigen}'}</InlineMath>
            <input
              type="checkbox"
              checked={istGesuchterGraphAngezeigt}
              onChange={(_) =>
                setIstGesuchterGraphAngezeigt(!istGesuchterGraphAngezeigt)
              }
            />
          </div>
          {/*<div className="flex gap-1">
            <TeX>
              {'\\color{purple}{e^{- 2 \\pi i \\xi t} f(t)} \\text{ anzeigen}'}
            </TeX>
            <input
              type="checkbox"
              checked={istProduktAngezeigt}
              onChange={(_) => setIstProduktAngezeigt(!istProduktAngezeigt)}
            />
          </div>*/}
          {/*<div className="flex">
            <p className="px-2 ">Fläche anzeigen</p>
            <input
              type="checkbox"
              checked={istFlächeAngezeigt}
              onChange={(_) => setIstFlächeAngezeigt(!istFlächeAngezeigt)}
            />
        </div>*/}
        </div>
        <div className="text-center mt-4 mb-4">
          <InlineMath>{'\\text{Darstellung von } \\hat{f}(\\xi):'}</InlineMath>
        </div>

        <ProductIntegral
          lowerBound={-6}
          upperBound={6}
          minX={-2}
          maxX={2}
          omegaA={(Math.PI * 2) / fixed_periodendauer}
          amplitudeA={1}
          linePos={1 / periodendauer}
          reInteg={(x: number, omega: number) => {
            return (
              (-1 *
                (omega *
                  Math.sin(((Math.PI * 2) / fixed_periodendauer) * x) *
                  Math.sin(omega * x) +
                  ((Math.PI * 2) / fixed_periodendauer) *
                    Math.cos(((Math.PI * 2) / fixed_periodendauer) * x) *
                    Math.cos(omega * x))) /
              (Math.pow(omega, 2) -
                Math.pow((Math.PI * 2) / fixed_periodendauer, 2))
            )
          }}
          imInteg={(x: number, omega: number) => {
            return (
              (1 *
                (omega *
                  Math.cos(((Math.PI * 2) / fixed_periodendauer) * x) *
                  Math.sin(omega * x) -
                  omega *
                    Math.sin(((Math.PI * 2) / fixed_periodendauer) * x) *
                    Math.cos(omega * x))) /
              (Math.pow(omega, 2) -
                Math.pow((Math.PI * 2) / fixed_periodendauer, 2))
            )
          }}
        />
      </>
    </div>
  )
}
export default WaveCheck
