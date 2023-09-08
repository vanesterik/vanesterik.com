import { describe, expect, it } from 'vitest'

import { random } from './random'

describe('random', () => {
  it('should return a random number between passed min-max parameters', () => {
    const number = random(0, 5)
    expect(number).toBeGreaterThan(0)
    expect(number).toBeLessThan(5)
  })
})
