// @vitest-environment jsdom
import { expect, it } from 'vitest'
import { hasClass, addClass, removeClass, getBoundingClientRect } from './index'

it('hasClass', () => {
  const div = document.createElement('div')
  div.className = 'div-test div-test2'
  expect(hasClass(div, 'div-test')).toBeTruthy()
  expect(hasClass(div, 'div')).toBeFalsy()
  expect(hasClass(undefined as any, undefined as any)).toBeFalsy()
  expect(() => hasClass(div, ' div-test')).toThrowError('className should not contain space.')
})

it('addClass', () => {
  const div = document.createElement('div')
  div.className = 'div-test'

  expect(addClass(undefined as any, 'div-item')).toBeFalsy()

  addClass(div, 'div-test')
  expect(div.className).toBe('div-test')

  addClass(div, 'div-test2')
  expect(div.className).toBe('div-test div-test2')

  addClass(div, ' div-test3 ')
  expect(div.className).toBe('div-test div-test2 div-test3')
})

it('addClass', () => {
  const div = document.createElement('div')
  div.className = 'div-test div-test1 div-test2 div-test3'

  expect(removeClass(undefined as any, 'div-item')).toBeFalsy()

  removeClass(div, 'div-test')
  expect(div.className).toBe('div-test1 div-test2 div-test3')

  removeClass(div, 'div-test2')
  expect(div.className).toBe('div-test1 div-test3')

  removeClass(div, ' div-test3 ')
  expect(div.className).toBe('div-test1')
})

it('getBoundingClientRect', () => {
  const div = document.createElement('div')
  expect(getBoundingClientRect(undefined as any)).toBe(0)
  expect(getBoundingClientRect(div)).toEqual({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0
  })
})
