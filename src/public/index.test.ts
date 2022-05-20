import { expect, it } from 'vitest'
import { is, trim, camelCase } from './index'

it('public/is', () => {
  // ToBeTruthy Test
  expect(is(1, 'Number')).toBeTruthy()
  expect(is(NaN, 'Number')).toBeTruthy()
  expect(is('123', 'String')).toBeTruthy()
  expect(is(true, 'Boolean')).toBeTruthy()
  expect(is([], 'Array')).toBeTruthy()
  expect(is({}, 'Object')).toBeTruthy()
  expect(is(null, 'Null')).toBeTruthy()
  expect(is(undefined, 'Undefined')).toBeTruthy()
  expect(is(() => ({ a: 1 }), 'Function')).toBeTruthy()
  // ToBeFalsy Test
  expect(is(null, 'Number')).toBeFalsy()
  expect(is(null, 'Object')).toBeFalsy()
  expect(is(/123/, 'Object')).toBeFalsy()
})

it('public/trim', () => {
  expect(trim('   ')).equal('')
  expect(trim('123   ')).equal('123')
  expect(trim('   123')).equal('123')
  expect(trim('   123  ')).equal('123')
  expect(trim(' 1 2 3 ')).equal('1 2 3')
})

it('public/camelCase', () => {
  expect(camelCase('testTest')).equal('testTest')
  expect(camelCase('test-test')).equal('testTest')
  expect(camelCase('test_test')).equal('testTest')
  expect(camelCase('Test_Test')).equal('TestTest')
  expect(camelCase('TestTest')).equal('TestTest')
})
