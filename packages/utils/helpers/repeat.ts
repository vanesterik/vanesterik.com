export const repeat = <T>(numTimes: number, callback: (index: number) => T) =>
  Array.from(Array(numTimes).keys()).map((index) => callback(index))
