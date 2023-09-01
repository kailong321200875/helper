/**
 * 设置Css变量
 * @category Attribute
 * @param prop 需要设置的属性
 * @param val 需要设置的值
 * @param dom 需要设置的dom
 * @example
 * ``` typescript
 * setCssVar('--color', 'red')
 * ```
 */
export const setCssVar = (prop: string, val: any, dom = document.documentElement) => {
  dom.style.setProperty(prop, val)
}

/**
 * 获取Css变量
 * @category Attribute
 * @param prop 需要获取的属性
 * @param dom 需要从哪个dom获取
 * @example
 * ``` typescript
 * getCssVar('--color')
 * ```
 */
export const getCssVar = (prop: string, dom = document.documentElement) => {
  return dom.style.getPropertyValue(prop)
}
