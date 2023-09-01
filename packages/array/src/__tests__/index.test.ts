import { expect, it } from 'vitest'
import { findIndex } from '../index'

interface ArrItem {
  name: string
}

const arr = ['1', '2', '3', '4', '5']

const arrObj: ArrItem[] = [
  {
    name: 'ming'
  },
  {
    name: 'xiaohu'
  },
  {
    name: 'uzi'
  },
  {
    name: 'mlxg'
  },
  {
    name: 'letme'
  }
]

const arr2 = ['1', '2', '3']
;(arr2.findIndex as any) = undefined

it('findIndex', () => {
  expect(
    findIndex(arr, (item: string) => {
      return item === '4'
    })
  ).equal(3)

  expect(
    findIndex(arrObj, (item: ArrItem) => {
      return item.name === 'letme'
    })
  ).equal(4)

  expect(
    findIndex(arr2, (item: string) => {
      return item === '2'
    })
  ).equal(1)
})
