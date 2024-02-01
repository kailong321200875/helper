import { describe, it, expect } from 'vitest'
import { findIndex, move } from '../index'

describe('findIndex', () => {
  it('should return the index of the first element that satisfies the provided testing function', () => {
    const array = [1, 2, 3, 4, 5]
    const fn = (item: number) => item > 3
    expect(findIndex(array, fn)).toBe(3)
  })

  it('should return -1 if no elements satisfy the provided testing function', () => {
    const array = [1, 2, 3, 4, 5]
    const fn = (item: number) => item > 5
    expect(findIndex(array, fn)).toBe(-1)
  })

  it('should return -1 if the array is empty', () => {
    const array: number[] = []
    const fn = (item: number) => item > 3
    expect(findIndex(array, fn)).toBe(-1)
  })

  // 原型链没有findIndex方法
  it('should support findIndex from prototype chain', () => {
    const array = [1, 2, 3, 4, 5]
    array.findIndex = undefined as any
    const fn = (item: number) => item > 3
    expect(findIndex(array, fn)).toBe(3)
  })
})

describe('move', () => {
  it('should correctly move elements within the array', () => {
    expect(move([1, 2, 3], 0, 2)).toEqual([3, 2, 1])
    expect(move(['a', 'b', 'c', 'd'], 1, 3)).toEqual(['a', 'd', 'c', 'b'])
  })

  it('should handle out of bounds indices', () => {
    expect(() => move([1, 2, 3], 0, 5)).toThrowError('Index out of bounds')
    expect(() => move([1, 2, 3], 5, 0)).toThrowError('Index out of bounds')
  })
})
