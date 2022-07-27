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
