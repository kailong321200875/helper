// @vitest-environment jsdom
import { expect, it } from 'vitest'
import { setCssVar, getCssVar } from './index'

it('attribute/setCssVar', () => {
  const div = document.createElement('div')
  setCssVar('--color', 'red', div)
  expect(getCssVar('--color', div)).equal('red')

  setCssVar('--color', 'green')
  expect(getCssVar('--color')).equal('green')

  const div2 = document.createElement('div')
  setCssVar('--color', 'blue', div2)
  expect(getCssVar('--color', div2)).equal('blue')
})
