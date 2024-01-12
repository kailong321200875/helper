import { expect, it } from 'vitest'
import { trim, underlineToHump, humpToUnderline, replace } from '../index'

it('trim', () => {
  expect(trim(undefined as any)).equal('')
  expect(trim('   ')).equal('')
  expect(trim('123   ')).equal('123')
  expect(trim('   123')).equal('123')
  expect(trim('   123  ')).equal('123')
  expect(trim(' 1 2 3 ')).equal('1 2 3')
})

it('underlineToHump', () => {
  expect(underlineToHump('testTest')).equal('testTest')
  expect(underlineToHump('test-test')).equal('testTest')
  expect(underlineToHump('test_test')).equal('testTest')
  expect(underlineToHump('Test_Test')).equal('TestTest')
  expect(underlineToHump('TestTest')).equal('TestTest')
})

it('humpToUnderline', () => {
  expect(humpToUnderline('testTest')).equal('test-test')
})

it('replaceAll', () => {
  expect(replace('abcdefg', 'ab', '')).equal('cdefg')
})
