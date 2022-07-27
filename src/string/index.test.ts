import { expect, it } from 'vitest'
import { trim, underlineToHump } from './index'

it('public/trim', () => {
  expect(trim('   ')).equal('')
  expect(trim('123   ')).equal('123')
  expect(trim('   123')).equal('123')
  expect(trim('   123  ')).equal('123')
  expect(trim(' 1 2 3 ')).equal('1 2 3')
})

it('public/underlineToHump', () => {
  expect(underlineToHump('testTest')).equal('testTest')
  expect(underlineToHump('test-test')).equal('testTest')
  expect(underlineToHump('test_test')).equal('testTest')
  expect(underlineToHump('Test_Test')).equal('TestTest')
  expect(underlineToHump('TestTest')).equal('TestTest')
})
