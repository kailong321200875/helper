import { describe, it, expect } from 'vitest'
import { numberToChinese } from '../index'

describe('numberToChinese', () => {
  it('should convert numbers to Chinese currency format', () => {
    expect(numberToChinese(123456.78)).toBe('壹拾贰万叁仟肆佰伍拾陆元柒角捌分')
    expect(numberToChinese(100000000)).toBe('壹亿元整')
    expect(numberToChinese(0)).toBe('零元整')
  })

  it('should handle negative numbers', () => {
    expect(numberToChinese(-123456.78)).toBe('欠壹拾贰万叁仟肆佰伍拾陆元柒角捌分')
  })
})
