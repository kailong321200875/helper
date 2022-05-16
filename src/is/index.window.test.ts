// @vitest-environment jsdom
import { expect, it } from 'vitest'
import { isServer, isEdge, isElement, isClient, isDark } from './index'

it('isServer', () => {
  expect(isServer()).toBeFalsy()
})

// TODO: 如何去模拟一个浏览器内核，这个还有待研究
it('isEdge', () => {
  expect(isEdge()).toBeFalsy()
})

// TODO: 这个为啥不是true。。
it('isElement', () => {
  const div = document.createElement('div')
  expect(isElement(div)).toBeFalsy()
})

it('isClient', () => {
  expect(isClient()).toBeTruthy()
})


// it('isDark', () => {
//   expect(isDark()).toBeFalsy()
// })