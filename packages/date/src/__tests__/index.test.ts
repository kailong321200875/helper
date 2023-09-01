import { expect, it } from 'vitest'
import { formatTime } from '../index'

const date = new Date('2021-01-01 12:12:12')

it('date/formatTime', () => {
  expect(formatTime(date, 'yyyy-MM-dd')).equal('2021-01-01')
  expect(formatTime(date, 'yyyy-MM-dd HH:mm:ss')).equal('2021-01-01 12:12:12')
  expect(formatTime(date, 'yyyy/MM/dd HH:mm')).equal('2021/01/01 12:12')
  expect(formatTime(date, 'yyyy')).equal('2021')
  expect(formatTime(date, 'MM-dd')).equal('01-01')
  expect(formatTime(date, 'dd')).equal('01')
  expect(formatTime('', 'HH:mm:ss')).equal('')
})
