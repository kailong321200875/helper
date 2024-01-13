import { describe, it, expect } from 'vitest'
import {
  addLight,
  calculateBestTextColor,
  colorIsDark,
  contrast,
  darken,
  hexToRGB,
  isHexColor,
  lighten,
  luminanace,
  rgbToHex,
  subtractLight
} from '../index'

describe('subtractLight', () => {
  it('should return the darker color based on the current color value', () => {
    expect(subtractLight('ffffff', 6)).toBe('fffff9')
  })

  it('should return 0 if the result is less than 0', () => {
    expect(subtractLight('000000', 6)).toBe('00')
  })

  it('should add a leading 0 if the result is a single digit', () => {
    expect(subtractLight('00000a', 6)).toBe('04')
  })
})

describe('addLight', () => {
  it('should return the lighter color based on the current color value', () => {
    expect(addLight('000000', 6)).toBe('06')
  })

  it('should return 255 if the result is more than 255', () => {
    expect(addLight('ffffff', 6)).toBe('ff')
  })

  it('should add a leading 0 if the result is a single digit', () => {
    expect(addLight('000000', 1)).toBe('01')
  })
})

describe('luminanace', () => {
  it('should calculate the luminance of the RGB color correctly', () => {
    expect(luminanace(255, 255, 255)).toBeCloseTo(1)
    expect(luminanace(0, 0, 0)).toBeCloseTo(0)
    expect(luminanace(255, 0, 0)).toBeCloseTo(0.2126)
    expect(luminanace(0, 255, 0)).toBeCloseTo(0.7152)
    expect(luminanace(0, 0, 255)).toBeCloseTo(0.0722)
  })
})

describe('contrast', () => {
  it('should calculate the contrast ratio between two RGB colors correctly', () => {
    expect(contrast(['255', '255', '255'], [0, 0, 0])).toBeCloseTo(21)
    expect(contrast(['0', '0', '0'], [255, 255, 255])).toBeCloseTo(0.05)
    expect(contrast(['255', '0', '0'], [0, 255, 0])).toBeCloseTo(0.34)
    expect(contrast(['0', '0', '255'], [255, 255, 255])).toBeCloseTo(0.12)
  })
})

describe('isHexColor', () => {
  it('should return true for valid hex color values', () => {
    expect(isHexColor('#fff')).toBe(true)
    expect(isHexColor('#ffffff')).toBe(true)
    expect(isHexColor('#000')).toBe(true)
    expect(isHexColor('#000000')).toBe(true)
  })

  it('should return false for invalid hex color values', () => {
    expect(isHexColor('#ff')).toBe(false)
    expect(isHexColor('#fffff')).toBe(false)
    expect(isHexColor('#ggg')).toBe(false)
    expect(isHexColor('#00000')).toBe(false)
    expect(isHexColor('fff')).toBe(false)
  })
})

describe('rgbToHex', () => {
  it('should convert RGB color values to hexadecimal color values correctly', () => {
    expect(rgbToHex(255, 255, 255)).toBe('#ffffff')
    expect(rgbToHex(0, 0, 0)).toBe('#000000')
    expect(rgbToHex(23, 46, 176)).toBe('#172eb0')
  })
})

describe('hexToRGB', () => {
  it('should convert hexadecimal color values to RGB color values correctly', () => {
    expect(hexToRGB('#ffffff')).toBe('RGB(255,255,255)')
    expect(hexToRGB('#000000')).toBe('RGB(0,0,0)')
    expect(hexToRGB('#172eb0')).toBe('RGB(23,46,176)')
  })

  it('should handle short hexadecimal color values', () => {
    expect(hexToRGB('#fff')).toBe('RGB(255,255,255)')
    expect(hexToRGB('#000')).toBe('RGB(0,0,0)')
    expect(hexToRGB('#12c')).toBe('RGB(17,34,204)')
  })

  it('should handle opacity', () => {
    expect(hexToRGB('#ffffff', 0.5)).toBe('RGBA(255,255,255,0.5)')
    expect(hexToRGB('#000000', 0.5)).toBe('RGBA(0,0,0,0.5)')
    expect(hexToRGB('#172eb0', 0.5)).toBe('RGBA(23,46,176,0.5)')
  })

  it('should return the original value for invalid hexadecimal color values', () => {
    expect(hexToRGB('#ff')).toBe('#ff')
    expect(hexToRGB('#fffff')).toBe('#fffff')
    expect(hexToRGB('#ggg')).toBe('#ggg')
    expect(hexToRGB('#00000')).toBe('#00000')
    expect(hexToRGB('fff')).toBe('fff')
  })
})

describe('colorIsDark', () => {
  it('should return true for dark colors', () => {
    expect(colorIsDark('#000000')).toBe(true)
    expect(colorIsDark('#172eb0')).toBe(true)
  })

  it('should return false for light colors', () => {
    expect(colorIsDark('#ffffff')).toBe(false)
    expect(colorIsDark('#fff')).toBe(false)
  })

  it('should return false for invalid hex color values', () => {
    expect(colorIsDark('#ff')).toBe(false)
    expect(colorIsDark('#fffff')).toBe(false)
    expect(colorIsDark('#ggg')).toBe(false)
    expect(colorIsDark('#00000')).toBe(false)
    expect(colorIsDark('fff')).toBe(false)
  })
})

describe('darken', () => {
  it('should darken the color correctly', () => {
    expect(darken('#ffffff', 20)).toBe('#cccccc')
    expect(darken('#000000', 20)).toBe('#000000')
    expect(darken('#172eb0', 20)).toBe('#00007d')
  })

  it('should handle short hexadecimal color values', () => {
    expect(darken('#ffffff', 20)).toBe('#cccccc')
    expect(darken('#000000', 20)).toBe('#000000')
  })

  it('should throw an error for invalid hex color values', () => {
    expect(() => darken('#ff', 20)).toThrow('请遵循 #ffffff 格式')
    expect(() => darken('#ggg', 20)).toThrow('请遵循 #ffffff 格式')
    expect(() => darken('fff', 20)).toThrow('请遵循 #ffffff 格式')
  })
})

describe('lighten', () => {
  it('should lighten the color correctly', () => {
    expect(lighten('#000000', 20)).toBe('#333333')
    expect(lighten('#172eb0', 20)).toBe('#4a61e3')
  })

  it('should handle short hexadecimal color values', () => {
    expect(lighten('#000000', 20)).toBe('#333333')
  })

  it('should throw an error for invalid hex color values', () => {
    expect(() => lighten('#ff', 20)).toThrow('请遵循 #ffffff 格式')
    expect(() => lighten('#ggg', 20)).toThrow('请遵循 #ffffff 格式')
    expect(() => lighten('fff', 20)).toThrow('请遵循 #ffffff 格式')
  })
})

describe('calculateBestTextColor', () => {
  it('should return black for light colors', () => {
    expect(calculateBestTextColor('#ffffff')).toBe('#FFFFFF')
    expect(calculateBestTextColor('#fff')).toBe('#FFFFFF')
  })

  it('should return white for dark colors', () => {
    expect(calculateBestTextColor('#000000')).toBe('#FFFFFF')
    expect(calculateBestTextColor('#000')).toBe('#FFFFFF')
  })
})
