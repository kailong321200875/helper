import { expect, it } from 'vitest'
import { isUrl } from './index'

it('isUrl', () => {
  expect(isUrl('https://www.baidu.com')).toBeTruthy()
  expect(isUrl('www.baidu.com')).toBeTruthy()
  expect(isUrl('192.168.169.197:8080')).toBeFalsy()
  expect(isUrl('https://192.168.169.197:8080')).toBeTruthy()
})
