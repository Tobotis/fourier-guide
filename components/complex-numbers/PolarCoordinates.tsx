import * as React from 'react'
import {
  Mafs,
  Coordinates,
  useMovablePoint,
  Theme,
  Vector,
  Text,
  Plot,
  vec
} from 'mafs'

const PolarCoordinates = () => {
  const tip = useMovablePoint([2, 1], {
    color: Theme.indigo,
    constrain: (point)=>{
      var norm = vec.mag(point);
      if(norm > 1) {
        return point;
      }
      else {
        return vec.withMag(point,1)
      }
    }
  })
  return (
      <Mafs pan={false} viewBox={{x: [-2,2], y: [-2,2]}}>
                <Coordinates.Polar
          yAxis={{
            labels: (y) => {
              return y.toString() + 'i'
            },
          }}
        />
        <Plot.Parametric 
        t={[Math.min(0, Math.atan2(tip.y, tip.x)),Math.max(Math.atan2(tip.y, tip.x), 0)]}
         xy={(t) => [Math.cos(t)*0.8,Math.sin(t)*0.8]} color={Theme.indigo}/>
        {tip.element}

        <Vector tip={tip.point} />
        <Text x={0} y={-1.5}> {'θ ≈ ' +
            ((Math.atan2(tip.y, tip.x) * 180) / Math.PI).toFixed(2) +
            '°'}</Text>
        
      </Mafs>
  )
}
export default PolarCoordinates
