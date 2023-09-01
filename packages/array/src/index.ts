interface Fn<T = any> {
  (...arg: T[]): T
}

/**
 * 查找数组对象的某个下标
 * @category Array
 * @param ary 查找的数组
 * @param fn 判断的方法
 * @example
 * ``` typescript
 * findIndex([1, 2, 3], (item, i, ary) => {
 *  return item === 2
 * })
 * ```
 */
export const findIndex = <T = any>(ary: Array<T>, fn: Fn): number => {
  if (ary.findIndex) {
    return ary.findIndex(fn)
  }
  let index = -1
  ary.some((item: T, i: number, ary: Array<T>) => {
    const ret: T = fn(item, i, ary)
    if (ret) {
      index = i
      return ret
    }
  })
  return index
}
