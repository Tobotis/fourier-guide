import * as React from 'react'

import { Mafs, Plot } from 'mafs'
import { InlineMath } from 'react-katex'

const Harmonics = () => {
  const [period, setPeriod] = React.useState(Math.PI)
  return (
    <>
      <div className="text-center my-4">
        <InlineMath>{'T= ' + period.toFixed(1)}</InlineMath>:{' '}
        <input
          className="h-2.5"
          type="range"
          min={0.5}
          step={0.1}
          max={4}
          value={period}
          onChange={(event) => {
            setPeriod(+event.target.value)
          }}
        />
      </div>
        <Mafs
          viewBox={{x:[-5,5], y:[-9,1.5]}}
          pan={false}
          height={200}
        >
          <Plot.OfX
            y={(x) => Math.sin((2 * Math.PI * x) / period)}
          />
          <Plot.OfX
            y={(x) => Math.sin((2 * (2 * Math.PI * x)) / period) - 2.5}
          />
          <Plot.OfX
            y={(x) => Math.sin((3 * (2 * Math.PI * x)) / period) - 5}
          />
          <Plot.OfX
            y={(x) => Math.sin((4 * (2 * Math.PI * x)) / period) - 7.5}
          />
        </Mafs>
    </>
  )
}

export default Harmonics
