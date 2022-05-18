// @vitest-environment jsdom
import { expect, it, beforeAll, vi } from 'vitest'
import { isServer, isEdge, isElement, isClient, isDark, isWindow } from './index'

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }))
  })
})

it('isServer', () => {
  expect(isServer()).toBeFalsy()
})

// TODO: 如何去模拟一个浏览器内核，这个还有待研究
it('isEdge', () => {
  expect(isEdge()).toBeFalsy()
})

it('isElement', () => {
  const div = document.createElement('div')
  expect(isElement('div')).toBeFalsy()
  expect(isElement(div)).toBeTruthy()
})

it('isClient', () => {
  expect(isClient()).toBeTruthy()
})

it('isDark', () => {
  expect(isDark()).toBeFalsy()
})

it('isWindow', () => {
  expect(isWindow(123)).toBeFalsy()
  expect(isWindow(window)).toBeTruthy()
})
