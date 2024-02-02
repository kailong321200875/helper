interface Fn<T = any> {
  (...arg: T[]): T
}

/**
 * 查找数组对象的某个下标
 * @category Array
 * @param ary 查找的数组
 * @param fn 判断的方法
 * @returns 返回查找到的下标
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

/**
 * 给数组元素更换位置
 * @category Array
 * @param ary 查找的数组
 * @param fromIndex 起始位置
 * @param toIndex 目标位置
 * @returns 返回更换位置后的数组
 * @example
 * ``` typescript
 * move([1, 2, 3], 0, 2)
 * ```
 */
export const move = <T = any>(ary: T[], fromIndex: number, toIndex: number): T[] => {
  if (fromIndex < 0 || fromIndex >= ary.length || toIndex < 0 || toIndex >= ary.length) {
    throw new Error('Index out of bounds')
  }
  // 交换数组元素
  ;[ary[fromIndex], ary[toIndex]] = [ary[toIndex], ary[fromIndex]]
  return ary
}

/**
 * 数组乱序
 * @category Array
 * @param ary 查找的数组
 * @returns 返回乱序后的数组
 * @example
 * ``` typescript
 * shuffle([1, 2, 3])
 * ```
 */
export const shuffle = <T = any>(ary: T[]): T[] => {
  return ary.sort(() => Math.random() - 0.5)
}
