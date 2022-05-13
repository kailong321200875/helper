/**
 * 判断是否十六进制颜色值
 *
 * @version 1.0.1
 * @param color 十六进制颜色值
 * @category Color
 * @example
 *
 * ``` typescript
 * isHexColor('#fff')
 * ```
 */
export const isHexColor = (color: string): boolean => {
  const reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-f]{6})$/
  return reg.test(color);
}

/**
 * RGB 颜色值转换为十六进制颜色值.
 * r, g, 和 b 需要在 [0, 255] 范围内
 *
 * @version 1.0.1
 * @param r 0-255 之间的数值
 * @param g 0-255 之间的数值
 * @param b 0-255 之间的数值
 * @category Color
 * @example
 *
 * ``` typescript
 * rgbToHex(23, 46, 176)
 * ```
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
  // tslint:disable-next-line:no-bitwise
  const hex = ((r << 16) | (g << 8) | b).toString(16)
  return '#' + new Array(Math.abs(hex.length - 7)).join('0') + hex
}
