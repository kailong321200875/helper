import { expect, it } from 'vitest'
import { isHexColor, rgbToHex, hexToRGB, colorIsDark, darken } from './index'

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
