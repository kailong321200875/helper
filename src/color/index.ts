import { addLight, subtractLight, contrast } from '../.helper'

/**
 * 判断是否十六进制颜色值
 * @param color 十六进制颜色值
 * @category Color
 * @example
 * ``` typescript
 * isHexColor('#fff')
 * ```
 */
export const isHexColor = (color: string): boolean => {
  const reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-f]{6})$/
  return reg.test(color);
}

/**
 * RGB颜色值转换为十六进制颜色值
 * r, g, 和 b 需要在 [0, 255] 范围内
 * @param r 0-255 之间的数值
 * @param g 0-255 之间的数值
 * @param b 0-255 之间的数值
 * @category Color
 * @example
 * ``` typescript
 * rgbToHex(23, 46, 176)
 * ```
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
  // tslint:disable-next-line:no-bitwise
  const hex = ((r << 16) | (g << 8) | b).toString(16)
  return '#' + new Array(Math.abs(hex.length - 7)).join('0') + hex
}

/**
 * 十六进制颜色值转RGB颜色值
 * @param hex 十六进制颜色值
 * @param opacity 透明度 0 - 1之间的值
 * @category Color
 * @example
 * ``` typescript
 * hexToRGB('#fff', 0.5)
 * ```
 */
export const hexToRGB = (hex: string, opacity?: number): string => {
  let sHex = hex.toLowerCase()
  if (isHexColor(hex)) {
    if (sHex.length === 4) {
      let sColorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sHex.slice(i, i + 1).concat(sHex.slice(i, i + 1))
      }
      sHex = sColorNew
    }
    const sColorChange: number[] = []
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt('0x' + sHex.slice(i, i + 2)))
    }
    return opacity
      ? 'RGBA(' + sColorChange.join(',') + ',' + opacity + ')'
      : 'RGB(' + sColorChange.join(',') + ')'
  }
  return sHex
}

/**
 * 是否是暗色系颜色，只支持六十进制颜色值
 * @param color 需要判断的颜色值
 * @category Color
 * @example
 * ``` typescript
 * colorIsDark('#fff')
 * ```
 */
export const colorIsDark = (color: string): boolean => {
  if (!isHexColor(color)) return false
  const [r, g, b] = hexToRGB(color)
    .replace(/(?:\(|\)|rgb|RGB)*/g, '')
    .split(',')
    .map((item) => Number(item))
  return r * 0.299 + g * 0.578 + b * 0.114 < 192
}

/**
 * 加深颜色
 * @param color 需要加深的颜色值
 * @param amount 需要加深的程度
 * @category Color
 * @example
 * ``` typescript
 * darken('#fff', 6)
 * ```
 */
export const darken = (color: string, amount: number): string | undefined => {
  if (color.length < 6) {
    throw new Error('请遵循 #ffffff 格式')
  }
  color = color.indexOf('#') >= 0 ? color.substring(1, color.length) : color
  amount = Math.trunc((255 * amount) / 100)
  return `#${subtractLight(color.substring(0, 2), amount)}${subtractLight(
    color.substring(2, 4),
    amount
  )}${subtractLight(color.substring(4, 6), amount)}`
}

/**
 * 减少颜色
 * @param color 需要减少的颜色值
 * @param amount 需要减少的程度
 * @category Color
 * @example
 * ``` typescript
 * lighten('#333', 6)
 * ```
 */
export const lighten = (color: string, amount: number): string | undefined => {
  if (color.length < 6) {
    throw new Error('请遵循 #ffffff 格式')
  }
  color = color.indexOf('#') >= 0 ? color.substring(1, color.length) : color
  amount = Math.trunc((255 * amount) / 100)
  return `#${addLight(color.substring(0, 2), amount)}${addLight(
    color.substring(2, 4),
    amount
  )}${addLight(color.substring(4, 6), amount)}`
}

/**
 * 根据与背景的对比度确定最佳文本颜色（黑色或白色）
 * @param hexColor 需要转换的颜色值
 * @category Color
 * @example
 * ``` typescript
 * calculateBestTextColor('#333')
 * ```
 */
export const calculateBestTextColor = (hexColor: string): "#000000" | "#FFFFFF" => {
  const rgbColor = hexToRGB(hexColor.substring(1))
  const contrastWithBlack = contrast(rgbColor.split(','), [0, 0, 0])

  return contrastWithBlack >= 12 ? '#000000' : '#FFFFFF'
}
