/*
- Unit Circle and a rotation vector with length 1
- Creation of sine and cosine curve
*/

import * as React from "react";
import {
  Mafs,
  Point,
  Coordinates,
  useStopwatch,
  Vector,
  Plot,
  Circle,
  Line,
  Theme,
  labelPi,
} from "mafs";

export default function UnitCircleSine() {
  const { time, start } = useStopwatch();
  React.useEffect(() => start(), [start]);
  let speed = 1 / 5;
  return (
    <Mafs height={300} pan={false} viewBox={{ x: [-1.5, 7], y: [-1, 1] }}>
      <Coordinates.Cartesian
        xAxis={{ lines: Math.PI, labels: labelPi }}
        yAxis={{ lines: Math.PI, labels: labelPi }}
        subdivisions={4}
      />
      <Vector
        tip={[
          Math.cos(time * Math.PI * speed),
          Math.sin(time * Math.PI * speed),
        ]}
      />
      <Circle center={[0, 0]} radius={1} />
      <Plot.Parametric
        xy={(t) => [t, -Math.sin(t - Math.PI * time * speed)]}
        t={[0, 8]}
      />
      <Line.Segment
        point1={[
          Math.cos(time * Math.PI * speed),
          Math.sin(time * Math.PI * speed),
        ]}
        point2={[0, Math.sin(time * Math.PI * speed)]}
        style="dashed"
      />
      <Point x={0} y={Math.sin(time * Math.PI * speed)} color={Theme.pink} />
    </Mafs>
  );
}
