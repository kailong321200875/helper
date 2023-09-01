import { expect, it } from 'vitest'
import {
  isHexColor,
  rgbToHex,
  hexToRGB,
  colorIsDark,
  darken,
  lighten,
  calculateBestTextColor
} from '../index'

it('isHexColor', () => {
  expect(isHexColor('')).toBeFalsy()
  expect(isHexColor('fff')).toBeFalsy()
  expect(isHexColor('#ffff')).toBeFalsy()
  expect(isHexColor('#fff')).toBeTruthy()
  expect(isHexColor('#ffffff')).toBeTruthy()
})

it('rgbToHex', () => {
  expect(rgbToHex(0, 0, 0)).equal('#000000')
  expect(rgbToHex(255, 255, 255)).equal('#ffffff')
  expect(rgbToHex(100, 100, 100)).equal('#646464')
})

it('hexToRGB', () => {
  expect(hexToRGB('#FFF')).equal('RGB(255,255,255)')
  expect(hexToRGB('#FFF', 0)).equal('RGB(255,255,255)')
  expect(hexToRGB('#FFF', 0.5)).equal('RGBA(255,255,255,0.5)')
  expect(hexToRGB('#FFFF')).equal('#ffff')
})

it('colorIsDark', () => {
  expect(colorIsDark('#FFF')).toBeFalsy()
  expect(colorIsDark('#000')).toBeTruthy()
})

it('darken', () => {
  expect(() => darken('#fff', 6)).toThrowError('请遵循 #ffffff 格式')
  expect(darken('#ffffff', 8)).equal('#ebebeb')
  expect(darken('ffffff', 8)).equal('#ebebeb')
})

it('lighten', () => {
  expect(() => lighten('#000', 6)).toThrowError('请遵循 #ffffff 格式')
  expect(lighten('#000000', 8)).equal('#141414')
  expect(lighten('000000', 8)).equal('#141414')
})

it('calculateBestTextColor', () => {
  expect(calculateBestTextColor('#ccc')).equal('#FFFFFF')
  expect(calculateBestTextColor('#ccccccc')).equal('#FFFFFF')
  expect(calculateBestTextColor('#141414')).equal('#000000')
})
