const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g
const MOZ_HACK_REGEXP = /^moz([A-Z])/

/**
 * 去除两边空格
 * @category String
 * @param s 去除空格的字符串
 * @example
 * ``` typescript
 * trim('  123  ')
 * ```
 */
export const trim = (s: string): string => {
  return (s || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

/**
 * 字符串转驼峰
 * @category String
 * @param name 需要转换的字符串
 * @example
 * ``` typescript
 * underlineToHump('test-test')
 * ```
 */
export const underlineToHump = (name: string): string => {
  return name
    .replace(SPECIAL_CHARS_REGEXP, function (_, __, letter, offset) {
      return offset ? letter.toUpperCase() : letter
    })
    .replace(MOZ_HACK_REGEXP, 'Moz$1')
}

/**
 * 驼峰字符串转下划线
 * @category String
 * @param str 驼峰字符串
 * @example
 * ``` typescript
 * humpToUnderline('TestTest')
 * ```
 */
export const humpToUnderline = (str: string): string => {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}

/**
 * 随机字符串
 * @category String
 * @example
 * ``` typescript
 * toAnyString()
 * ```
 */
export function toAnyString() {
  const str: string = 'xxxxx-xxxxx-4xxxx-yxxxx-xxxxx'.replace(/[xy]/g, (c: string) => {
    const r: number = (Math.random() * 16) | 0
    const v: number = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString()
  })
  return str
}
