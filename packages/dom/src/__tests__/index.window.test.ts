// @vitest-environment jsdom
import { expect, it } from 'vitest'
import {
  hasClass,
  addClass,
  removeClass,
  getBoundingClientRect,
  getStyle,
  setStyle
} from '../index'

it('hasClass', () => {
  const div = document.createElement('div')
  div.className = 'div-test div-test2'
  expect(hasClass(div, 'div-test')).toBeTruthy()
  expect(hasClass(div, 'div')).toBeFalsy()
  expect(hasClass(undefined as any, undefined as any)).toBeFalsy()
  expect(() => hasClass(div, ' div-test')).toThrowError('className should not contain space.')

  const div2 = document.createElement('div')
  ;(div2.classList as any) = undefined
  div2.className = 'div2-test'
  expect(hasClass(div2, 'div2-test')).toBeTruthy()
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

it('getStyle', () => {
  const div = document.createElement('div')
  div.innerText = 'test'
  div.style.color = 'red'
  expect(getStyle(div, 'color')).toBe('red')
})

it('setStyle', () => {
  const div = document.createElement('div')
  div.innerText = 'test'
  setStyle(div, 'color', 'red')
  expect(getStyle(div, 'color')).toBe('red')
})
