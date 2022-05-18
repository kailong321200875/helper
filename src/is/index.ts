import { is } from '../public'

/**
 * 判断是否是服务器环境
 * @category Is
 * @example
 * ``` typescript
 * isServer()
 * ```
 */
export const isServer = (): boolean => {
  return typeof window === 'undefined'
}

/**
 * 判断是否是Edge浏览器
 * @category Is
 * @example
 * ``` typescript
 * isServer()
 * ```
 */
export const isEdge = (): boolean => {
  return !isServer() && navigator.userAgent.indexOf('Edge') > -1
}

/**
 * 判断是否是数字类型
 * @param val 需要验证的值
 * @category Is
 * @example
 * ``` typescript
 * isNumber(123)
 * ```
 */
export const isNumber = (val: unknown): boolean => {
  return is(val, 'Number')
}

/**
 * 判断是否是数组类型
 * @param val 需要验证的值
 * @category Is
 * @example
 * ``` typescript
 * isArray([1, 2, 3])
 * ```
 */
export const isArray = (val: any): val is Array<any> => {
  return val && Array.isArray(val)
}

/**
 * 判断不是undefined类型
 * @param val 需要验证的值
 * @category Is
 * @example
 * ``` typescript
 * isDef(null)
 * ```
 */
export const isDef = <T = unknown>(val?: T): val is T => {
  return typeof val !== 'undefined'
}

/**
 * 判断是undefined类型
 * @param val 需要验证的值
 * @category Is
 * @example
 * ``` typescript
 * isUnDef('123')
 * ```
 */
export const isUnDef = <T = unknown>(val?: T): val is T => {
  return !isDef(val)
}

/**
 * 判断是否是对象类型
 * @param val 需要验证的值
 * @category Is
 * @example
 * ``` typescript
 * isObject('123')
 * ```
 */
export const isObject = (val: any): val is Record<any, any> => {
  return val !== null && is(val, 'Object')
}

/**
 * 判断是否是字符串类型
 * @param val 需要验证的值
 * @category Is
 * @example
 * ``` typescript
 * isString('123')
 * ```
 */
export const isString = (val: unknown): val is string => {
  return is(val, 'String')
}

/**
 * 判断是否是空值
 * @param val 需要验证的值
 * @category Is
 * @example
 * ``` typescript
 * isEmpty('123')
 * ```
 */
export const isEmpty = <T = unknown>(val: T): val is T => {
  if (isArray(val) || isString(val)) {
    return val.length === 0
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0
  }

  return false
}

/**
 * 判断是否是时间类型
 * @param val 需要验证的值
 * @category Is
 * @example
 * ``` typescript
 * isDate(new Date())
 * ```
 */
export const isDate = (val: unknown): val is Date => {
  return is(val, 'Date')
}

/**
 * 判断是否是null类型
 * @param val 需要验证的值
 * @category Is
 * @example
 * ``` typescript
 * isNull(null)
 * ```
 */
export const isNull = (val: unknown): val is null => {
  return val === null
}

/**
 * 判断是否是null类型并且是undefined
 * @param val 需要验证的值
 * @category Is
 * @example
 * ``` typescript
 * isNullAndUnDef(null)
 * ```
 */
export const isNullAndUnDef = (val: unknown): val is null | undefined => {
  return isUnDef(val) && isNull(val)
}

/**
 * 判断是否是null类型或者是undefined
 * @param val 需要验证的值
 * @category Is
 * @example
 * ``` typescript
 * isNullOrUnDef(null)
 * ```
 */
export const isNullOrUnDef = (val: unknown): val is null | undefined => {
  return isUnDef(val) || isNull(val)
}

/**
 * 判断是否是Function类型
 * @param val 需要验证的值
 * @category Is
 * @example
 * ``` typescript
 * isFunction(function() {})
 * ```
 */
export const isFunction = (val: unknown): val is Function => {
  return typeof val === 'function'
}

/**
 * 判断是否是Promise类型
 * @param val 需要验证的值
 * @category Is
 * @example
 * ``` typescript
 * isPromise(new Promise(() => {}))
 * ```
 */
export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

/**
 * 判断是否是正则类型
 * @param val 需要验证的值
 * @category Is
 * @example
 * ``` typescript
 * isRegExp(/\d+/)
 * ```
 */
export const isRegExp = (val: unknown): val is RegExp => {
  return is(val, 'RegExp')
}

/**
 * 判断是否是window对象
 * @param val 需要验证的值
 * @category Is
 * @example
 * ``` typescript
 * isWindow(window)
 * ```
 */
export const isWindow = (val: any): val is Window => {
  return typeof window !== 'undefined' && is(val, 'Window')
}

/**
 * 判断是否是element对象
 * @param val 需要验证的值
 * @category Is
 * @example
 * ``` typescript
 * isElement(document.body)
 * ```
 */
export const isElement = (val: unknown): val is Element => {
  return !!(val && (val as Element).nodeType === 1)
}

/**
 * 判断是否是map对象
 * @param val 需要验证的值
 * @category Is
 * @example
 * ``` typescript
 * isMap(new Map())
 * ```
 */
export const isMap = (val: unknown): val is Map<any, any> => {
  return is(val, 'Map')
}

/**
 * 判断是否是client对象
 * @category Is
 * @example
 * ``` typescript
 * isClient()
 * ```
 */
export const isClient = () => {
  return !isServer()
}

/**
 * 判断是否是合法的url
 * @param path 需要验证的值
 * @category Is
 * @example
 * ``` typescript
 * isUrl('http://www.baidu.com')
 * ```
 */
export const isUrl = (path: string): boolean => {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&%@.\w_]*)#?(?:[\w]*))?)$/
  return reg.test(path)
}

/**
 * 判断是否是暗黑模式
 * @category Is
 * @example
 * ``` typescript
 * isDark()
 * ```
 */
export const isDark = (): boolean => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}
