import { is } from '../public'

/**
 * 判断是否是服务器环境
 *
 * @version 1.0.1
 * @category Is
 * @example
 *
 * ``` typescript
 * isServer()
 * ```
 */
export const isServer = (): boolean => {
  return typeof window === 'undefined'
}

/**
 * 判断是否是Edge浏览器
 *
 * @version 1.0.1
 * @category Is
 * @example
 *
 * ``` typescript
 * isServer()
 * ```
 */
export const isEdge = (): boolean => {
  return !isServer() && navigator.userAgent.indexOf('Edge') > -1
}

/**
 * 判断是否是数字类型
 *
 * @version 1.0.1
 * @param val 需要验证的值
 * @category Is
 * @example
 *
 * ``` typescript
 * isNumber(123)
 * ```
 */
export const isNumber = (val: unknown): boolean => {
  return is(val, 'Number')
}
