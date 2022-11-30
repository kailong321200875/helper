// @vitest-environment jsdom
import { expect, it } from 'vitest'
import { getUrlQuery } from './index'

it('getUrlQuery', () => {
  // 自定义window.location
  Object.defineProperty(window, 'location', {
    value: {
      search: '?name=123&age=12'
    }
  })
  expect(getUrlQuery('name')).toBe('123')
  expect(getUrlQuery('age')).toBe('12')

  Object.defineProperty(window, 'location', {
    value: {
      search: '',
      hash: '#/home?height=165&sex=1'
    }
  })
  expect(getUrlQuery('height')).toBe('165')
  expect(getUrlQuery('sex')).toBe('1')

  expect(getUrlQuery('weight')).toBe(null)
})
