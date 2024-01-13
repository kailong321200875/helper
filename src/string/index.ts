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
  return s.replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
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
    .replace(SPECIAL_CHARS_REGEXP, function (_, __, letter) {
      return letter.toUpperCase()
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
 * 替换字符串
 * @category String
 * @param str 需要替换的字符串
 * @param findText 被替换的内容
 * @param repText 替换的内容
 * @example
 * ``` typescript
 * replace('abcdefg', 'a', 'b')
 * ```
 */
export const replace = (str: string, findText: string, repText: string) => {
  const regExp = new RegExp(findText, 'g')
  return str.replace(regExp, repText)
}
