const toString = Object.prototype.toString

const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g
const MOZ_HACK_REGEXP = /^moz([A-Z])/

/**
 * 判断类型公共方法
 * @category Public
 * @param val 需要验证的值
 * @prarm type 需要验证的类型
 * @example
 * ``` typescript
 * is(123, 'Number')
 * ```
 */
export const is = (val: unknown, type: string): boolean => {
  return toString.call(val) === `[object ${type}]`
}

/**
 * 去除两边空格
 * @category Public
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
 * @category Public
 * @param name 需要转换的字符串
 * @example
 * ``` typescript
 * camelCase('test-test')
 * ```
 */
 export const camelCase = (name: string): string => {
  return name
    .replace(SPECIAL_CHARS_REGEXP, function (_, __, letter, offset) {
      return offset ? letter.toUpperCase() : letter
    })
    .replace(MOZ_HACK_REGEXP, 'Moz$1')
}
