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
