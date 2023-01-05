import * as React from 'react'
import FrameMafs from './FrameMafs'
import * as vec from 'vec-la'
import { sinSum, isClose } from '../utils/math_ext'
import TeX from '@matejmazur/react-katex'
import { Integral } from '../utils/mafs_extended/Integral'
import {
  Mafs,
  FunctionGraph,
  CartesianCoordinates,
  useMovablePoint,
  MovablePoint,
  Text,
  Vector2,
  Vector,
  Theme,
} from '../mafs'
import { NonSVG, NonSVGWrapper } from '../mafs/display/NonSVGElements'
import ProductIntegral from './FixedProductIntegral'

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
  let [periodendauer, setPeriodendauer] = React.useState(2)

  let [istFlächeAngezeigt, setIstFlächeAngezeigt] = React.useState(true)

  let [istGesuchterGraphAngezeigt, setIstGesuchterGraphAngezeigt] =
    React.useState(true)

  let [istProduktAngezeigt, setIstProduktAngezeigt] = React.useState(true)

  return (
    <div>
      <>
        <div className="flex gap-1 my-5">
          <div className="w-full flex-col mr-2">
            <div className="m-5 text-center">
              <TeX>
                {
                  '\\Re(f(t) \\cdot e^{- 2 \\pi \\xi i t}) = \\color{purple}{\\cos(- 2 \\pi \\xi i t) \\cdot f(t)}'
                }
              </TeX>
            </div>
            <div className="rounded-lg">
              <Mafs
                yAxisExtent={[-1.3, 1.3]}
                xAxisExtent={[leftBound, rightBound]}
                pan={false}
              >
                <CartesianCoordinates />
                {istFlächeAngezeigt ? (
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
                )}
                <>
                  <FunctionGraph.OfX
                    quality="high"
                    y={(x) => Math.cos((x / periodendauer) * (2 * Math.PI))}
                    color={Theme.blue}
                  ></FunctionGraph.OfX>

                  {istGesuchterGraphAngezeigt ? (
                    <FunctionGraph.OfX
                      quality="high"
                      y={(x) =>
                        x < 6
                          ? x > -6
                            ? Math.sin(
                                (x / fixed_periodendauer) * (2 * Math.PI)
                              )
                            : 0
                          : 0
                      }
                    ></FunctionGraph.OfX>
                  ) : (
                    <></>
                  )}
                  {istProduktAngezeigt ? (
                    <FunctionGraph.OfX
                      quality="high"
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
                    ></FunctionGraph.OfX>
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
            <div className="m-5 text-center">
              <TeX>
                {
                  '\\Im(f(t) \\cdot e^{- 2 \\pi \\xi i t}) = \\color{purple}{\\sin(- 2 \\pi \\xi i t) \\cdot f(t)}'
                }
              </TeX>
            </div>
            <div className="rounded-lg">
              <Mafs
                yAxisExtent={[-1.3, 1.3]}
                xAxisExtent={[leftBound, rightBound]}
                pan={false}
              >
                <CartesianCoordinates />
                {istFlächeAngezeigt ? (
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
                )}
                <>
                  <FunctionGraph.OfX
                    quality="high"
                    y={(x) => Math.sin((x / periodendauer) * (2 * Math.PI))}
                    color={Theme.blue}
                  ></FunctionGraph.OfX>

                  {istGesuchterGraphAngezeigt ? (
                    <FunctionGraph.OfX
                      quality="high"
                      y={(x) => 0}
                    ></FunctionGraph.OfX>
                  ) : (
                    <></>
                  )}
                  {istProduktAngezeigt ? (
                    <FunctionGraph.OfX
                      quality="high"
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
                    ></FunctionGraph.OfX>
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
            <TeX>
              {'\\text{Frequenz } \\xi \\approx' +
                (1 / periodendauer).toFixed(2)}
            </TeX>
            <input
              type="range"
              className="align-middle"
              min={1 / (fixed_periodendauer * 4)}
              max={1 / (fixed_periodendauer / 4)}
              step={0.01}
              value={1 / periodendauer}
              onChange={(event) => setPeriodendauer(1 / +event.target.value)}
            />
          </div>
          <div className="flex gap-1">
            <TeX>{'f(t) \\text{ anzeigen}'}</TeX>
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
          <div className="flex">
            <p className="px-2 ">Fläche anzeigen</p>
            <input
              type="checkbox"
              checked={istFlächeAngezeigt}
              onChange={(_) => setIstFlächeAngezeigt(!istFlächeAngezeigt)}
            />
          </div>
        </div>
        <div className="text-center mt-4 -mb-4">
          <TeX>{'\\text{Darstellung von } \\hat{f}(\\xi):'}</TeX>
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
