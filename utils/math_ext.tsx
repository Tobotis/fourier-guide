import * as vec from 'vec-la'
import { Vector } from 'vec-la-fp'

export function sinSum(x: number, coordinates: vec.Vector[]): number {
  let sum = 0
  for (let i = 0; i < coordinates.length; i++) {
    let value =
      coordinates[i][1] * Math.sin(((x / coordinates[i][0]) * Math.PI) / 2)
    sum += value
  }
  return sum
}

// Returns the value of e^(i*pi*theta) in cartesian coordinates ([real, imag])
export function e_pow_ipi(theta: number): Vector {
  let real = Math.sin(theta)
  let im = Math.cos(theta)
  return [real, im]
}

export const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max)
