import { describe, it, expect } from 'vitest'
import { trim, underlineToHump, humpToUnderline, replace } from '../index'

describe('trim', () => {
  it('should remove spaces from both ends', () => {
    const result = trim('  123  ')
    expect(result).toBe('123')
  })
})

describe('underlineToHump', () => {
  it('should convert underline to hump', () => {
    const result = underlineToHump('test-test')
    expect(result).toBe('testTest')
  })
})

describe('humpToUnderline', () => {
  it('should convert hump to underline', () => {
    const result = humpToUnderline('testTest')
    expect(result).toBe('test-test')
  })
})

describe('replace', () => {
  it('should replace specified text', () => {
    const result = replace('abcdefg', 'a', 'b')
    expect(result).toBe('bbcdefg')
  })
})
