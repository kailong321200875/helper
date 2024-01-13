import { describe, expect, it } from 'vitest'
import { formatTime, timestamp } from '../index'

describe('formatTime', () => {
  it('should format time correctly', () => {
    const date = new Date(2022, 1, 1, 13, 14, 15)
    const result = formatTime(date, 'yyyy-MM-dd HH:mm:ss')
    expect(result).toBe('2022-02-01 13:14:15')
  })

  it('should return empty string for null or undefined', () => {
    expect(formatTime(null, 'yyyy-MM-dd')).toBe('')
    expect(formatTime(undefined, 'yyyy-MM-dd')).toBe('')
  })
})

describe('timestamp', () => {
  it('should return a number', () => {
    const result = timestamp()
    expect(typeof result).toBe('number')
  })

  it('should return the current timestamp', () => {
    const before = Date.now()
    const result = timestamp()
    const after = Date.now()

    expect(result).toBeGreaterThanOrEqual(before)
    expect(result).toBeLessThanOrEqual(after)
  })
})
