import ComplexExponentialsSum from '../complex-numbers/ComplexExponentialsSum'
import ScrollingFunction from './ScrollingFunction'
import { InlineMath } from 'react-katex'
import * as React from 'react'

interface FourierSeriesProps {
  ithC: (x: number) => [number, number]
  f: (x: number) => number
  omega: number
  yBExtent?: [number, number]
  xAExtent?: [number, number]
  show?: boolean
}

const FourierSeries = ({
  ithC,
  f,
  omega,
  yBExtent = [-3, 3],
  xAExtent = [-2, 2],show=true
}: FourierSeriesProps) => {
  let [n, setN] = React.useState<number>(5)
  let [ak, setAk] = React.useState<Array<[number, number, number]>>(
    generateAk(n)
  )
  function generateAk(n: number) {
    let a: Array<[number, number, number]> = []
    for (let index = -n; index <= n; index++) {
      let c = ithC(index)
      if (c[0] != 0 || c[1] != 0) a.push([c[0], c[1], index])
    }
    return a
  }
  return (
    <>
      <div className="text-center mt-4">
        <InlineMath>{'n = ' + n.toFixed(0)}</InlineMath>:{' '}
        <input
          className="h-2.5"
          type="range"
          min={1}
          max={30}
          value={n}
          onChange={(event) => {
            setN(+event.target.value)
            setAk(generateAk(+event.target.value))
          }}
        />
      </div>
      <div className="flex-col justify-center mt-3">
        {show?<ComplexExponentialsSum
          height={350}
          xExtent={xAExtent}
          yExtent={[-1.5, 1.5]}
          ak={ak ?? []}
          vectorSize={1}
          omega={omega * 0.2}
        />:<></>}
        <ScrollingFunction
          height={350}
          slow={0.2}
          xExtent={[-1, 3]}
          yExtent={yBExtent}
          omega={omega}
          f={f}
          ak={ak ?? []}
        />
      </div>
    </>
  )
}

export default FourierSeries
