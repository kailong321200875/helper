/**
 * 根据当前颜色值获取对应深色值
 * @param color 需要设置的颜色值
 * @param amount 数值越大则越深
 * @example
 * ``` typescript
 * subtractLight('#fff', 6)
 * ```
 */
export const subtractLight = (color: string, amount: number): string => {
  const cc = parseInt(color, 16) - amount
  const c = cc < 0 ? 0 : cc
  return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`
}

/**
 * 根据当前颜色值获取对应浅色值
 * @param color 需要设置的颜色值
 * @param amount 数值越大则越浅
 * @example
 * ``` typescript
 * addLight('#333', 6)
 * ```
 */
export const addLight = (color: string, amount: number): string => {
  const cc = parseInt(color, 16) + amount
  const c = cc > 255 ? 255 : cc
  return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`
}

/**
 * 计算RGB颜色的亮度
 * @param  r 红色数值 0 - 255
 * @param  g 绿色数值 0 - 255
 * @param  b 蓝色数值 0 - 255
 * @example
 * ``` typescript
 * luminanace(34, 56, 78)
 * ```
 */
export const luminanace = (r: number, g: number, b: number): number => {
  const a = [r, g, b].map((v) => {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
}

/**
 * 计算两种RGB颜色之间的对比度
 * @param rgb1 rgb 颜色 1
 * @param rgb2 rgb 颜色 2
 * @example
 * ``` typescript
 * contrast([255, 255, 255], [0, 0, 0])
 * ```
 */
export const contrast = (rgb1: string[], rgb2: number[]): number => {
  return (
    (luminanace(~~rgb1[0], ~~rgb1[1], ~~rgb1[2]) + 0.05) /
    (luminanace(rgb2[0], rgb2[1], rgb2[2]) + 0.05)
  )
}

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
  return reg.test(color)
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
export const calculateBestTextColor = (hexColor: string): '#000000' | '#FFFFFF' => {
  const rgbColor = hexToRGB(hexColor.substring(1))
  const contrastWithBlack = contrast(rgbColor.split(','), [0, 0, 0])

  return contrastWithBlack >= 12 ? '#000000' : '#FFFFFF'
}
