import { describe, it, expect } from 'vitest'
import {
  trim,
  underlineToHump,
  humpToUnderline,
  replace,
  phoneToAsterisk,
  toCDB,
  toDBC
} from '../index'

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

describe('phoneToAsterisk', () => {
  it('should replace the middle four digits with asterisks', () => {
    expect(phoneToAsterisk('12345678901')).toBe('123****8901')
    expect(phoneToAsterisk('98765432109')).toBe('987****2109')
  })

  it('should return the original string if it does not match the pattern', () => {
    expect(phoneToAsterisk('12345')).toBe('12345')
    expect(phoneToAsterisk('abcdefg')).toBe('abcdefg')
  })
})

describe('toCDB', () => {
  it('should convert full-width characters to half-width', () => {
    expect(toCDB('１２３４５６')).toBe('123456')
    expect(toCDB('ＡＢＣＤＥＦ')).toBe('ABCDEF')
  })

  it('should convert full-width space to half-width', () => {
    expect(toCDB('　')).toBe(' ')
  })

  it('should leave half-width characters unchanged', () => {
    expect(toCDB('123456')).toBe('123456')
    expect(toCDB('ABCDEF')).toBe('ABCDEF')
  })
})

describe('toDBC', () => {
  it('should convert half-width characters to full-width', () => {
    expect(toDBC('123456')).toBe('１２３４５６')
    expect(toDBC('ABCDEF')).toBe('ＡＢＣＤＥＦ')
  })

  it('should convert half-width space to full-width', () => {
    expect(toDBC(' ')).toBe('　')
  })

  it('should leave full-width characters unchanged', () => {
    expect(toDBC('１２３４５６')).toBe('１２３４５６')
    expect(toDBC('ＡＢＣＤＥＦ')).toBe('ＡＢＣＤＥＦ')
  })
})
