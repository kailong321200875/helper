const toString = Object.prototype.toString

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
