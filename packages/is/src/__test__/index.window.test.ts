// @vitest-environment jsdom
import { expect, it, beforeAll, vi } from 'vitest'
import {
  isServer,
  isEdge,
  isElement,
  isClient,
  isDark,
  isWindow,
  isIE,
  isGoogle,
  isMobile,
  isFirefox,
  isSafari,
  isWeixin
} from '../index'

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
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
  expect(isWindow(window)).toBeFalsy()
})

it('isIE', () => {
  expect(isIE()).toBeFalsy()
})

it('isGoogle', () => {
  // 模拟一个 window.navigator
  Object.defineProperty(window, 'navigator', {
    writable: true,
    value: {
      userAgent: 'Chrome'
    }
  })
  expect(isGoogle()).toBeTruthy()
})

it('isMobile', () => {
  // 模拟一个 移动端window.navigator
  Object.defineProperty(window, 'navigator', {
    writable: true,
    value: {
      userAgent: 'Android'
    }
  })
  expect(isMobile()).toBeTruthy()
})

it('isFirefox', () => {
  // 模拟一个 火狐window.navigator
  Object.defineProperty(window, 'navigator', {
    writable: true,
    value: {
      userAgent: 'Firefox'
    }
  })
  expect(isFirefox()).toBeTruthy()
})

it('isSafari', () => {
  // 模拟一个 safari window.navigator
  Object.defineProperty(window, 'navigator', {
    writable: true,
    value: {
      userAgent: 'Safari'
    }
  })
  expect(isSafari()).toBeTruthy()
})

it('isWeixin', () => {
  // 模拟一个 微信 window.navigator
  Object.defineProperty(window, 'navigator', {
    writable: true,
    value: {
      userAgent: 'MicroMessenger'
    }
  })
  expect(isWeixin()).toBeTruthy()
})
