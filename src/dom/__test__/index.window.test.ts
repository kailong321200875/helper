// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest'
import {
  hasClass,
  addClass,
  removeClass,
  getBoundingClientRect,
  getViewportOffset,
  on,
  getStyle,
  setStyle,
  off,
  once,
  // isScroll,
  // getScrollContainer,
  // isInContainer,
  setCssVar,
  getCssVar
} from '../index'

describe('hasClass', () => {
  it('should return false if no element or className is provided', () => {
    expect(hasClass(null, 'test')).toBe(false)
    expect(hasClass(document.createElement('div'), '')).toBe(false)
  })

  it('should throw an error if className contains space', () => {
    const el = document.createElement('div')
    expect(() => hasClass(el, 'test test')).toThrow('className should not contain space.')
  })

  it('should return true if element has the specified className', () => {
    const el = document.createElement('div')
    el.className = 'test'
    expect(hasClass(el, 'test')).toBe(true)
  })

  it('should return false if element does not have the specified className', () => {
    const el = document.createElement('div')
    el.className = 'test'
    expect(hasClass(el, 'other')).toBe(false)
  })
})

describe('addClass', () => {
  it('should do nothing if no element is provided', () => {
    const el = document.createElement('div')
    addClass(null, 'test')
    expect(el.className).toBe('')
  })

  it('should add className to the element', () => {
    const el = document.createElement('div')
    addClass(el, 'test')
    expect(el.className).toBe('test')
  })

  it('should add multiple classes to the element', () => {
    const el = document.createElement('div')
    addClass(el, 'test1 test2')
    expect(el.className).toBe('test1 test2')
  })

  it('should not add the same class twice', () => {
    const el = document.createElement('div')
    el.className = 'test'
    addClass(el, 'test')
    expect(el.className).toBe('test')
  })
})

describe('addClass', () => {
  it('should do nothing if no element is provided', () => {
    const el = document.createElement('div')
    addClass(null, 'test')
    expect(el.className).toBe('')
  })

  it('should add className to the element', () => {
    const el = document.createElement('div')
    addClass(el, 'test')
    expect(el.className).toBe('test')
  })

  it('should add multiple classes to the element', () => {
    const el = document.createElement('div')
    addClass(el, 'test1 test2')
    expect(el.className).toBe('test1 test2')
  })

  it('should not add the same class twice', () => {
    const el = document.createElement('div')
    el.className = 'test'
    addClass(el, 'test')
    expect(el.className).toBe('test')
  })
})

describe('removeClass', () => {
  it('should do nothing if no element or className is provided', () => {
    const el = document.createElement('div')
    el.className = 'test'
    removeClass(null, 'test')
    removeClass(el, '')
    expect(el.className).toBe('test')
  })

  it('should remove className from the element', () => {
    const el = document.createElement('div')
    el.className = 'test'
    removeClass(el, 'test')
    expect(el.className).toBe('')
  })

  it('should remove multiple classes from the element', () => {
    const el = document.createElement('div')
    el.className = 'test1 test2'
    removeClass(el, 'test1 test2')
    expect(el.className).toBe('')
  })

  it('should not remove non-existing classes', () => {
    const el = document.createElement('div')
    el.className = 'test'
    removeClass(el, 'other')
    expect(el.className).toBe('test')
  })
})

describe('getBoundingClientRect', () => {
  it('should return 0 if no element is provided', () => {
    expect(getBoundingClientRect(null)).toBe(0)
    expect(getBoundingClientRect(undefined)).toBe(0)
  })

  it('should return the bounding client rect of the element', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    const rect = el.getBoundingClientRect()
    expect(getBoundingClientRect(el)).toEqual(rect)
    document.body.removeChild(el)
  })
})

describe('getViewportOffset', () => {
  it('should return an object with all properties as 0 if no element is provided', () => {
    const result = getViewportOffset(null)
    expect(result).toEqual({
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      rightIncludeBody: 0,
      bottomIncludeBody: 0
    })
  })

  it('should return the correct viewport offset of the element', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    const result = getViewportOffset(el)
    const rect = el.getBoundingClientRect()
    expect(result.left).toBe(rect.left)
    expect(result.top).toBe(rect.top)
    expect(result.right).toBe(window.document.documentElement.clientWidth - rect.right)
    expect(result.bottom).toBe(window.document.documentElement.clientHeight - rect.bottom)
    expect(result.rightIncludeBody).toBe(window.document.documentElement.clientWidth - rect.left)
    expect(result.bottomIncludeBody).toBe(window.document.documentElement.clientHeight - rect.top)
    document.body.removeChild(el)
  })
})

describe('on', () => {
  it('should do nothing if no element, event, or handler is provided', () => {
    const handler = vi.fn()
    // on(null, 'click', handler)
    on(document.createElement('div'), '', handler)
    // on(document.createElement('div'), 'click', null)
    expect(handler).not.toBeCalled()
  })

  it('should bind the handler to the specified event of the element', () => {
    const el = document.createElement('div')
    const handler = vi.fn()
    on(el, 'click', handler)
    el.click()
    expect(handler).toBeCalled()
  })
})

describe('off', () => {
  it('should do nothing if no element, event, or handler is provided', () => {
    const handler = vi.fn()
    // off(null, 'click', handler)
    off(document.createElement('div'), '', handler)
    off(document.createElement('div'), 'click', null)
    expect(handler).not.toBeCalled()
  })

  it('should unbind the handler from the specified event of the element', () => {
    const el = document.createElement('div')
    const handler = vi.fn()
    on(el, 'click', handler)
    el.click()
    expect(handler).toBeCalled()
    handler.mockClear()
    off(el, 'click', handler)
    el.click()
    expect(handler).not.toBeCalled()
  })
})

describe('once', () => {
  it('should do nothing if no element, event, or handler is provided', () => {
    const handler = vi.fn()
    // once(null, 'click', handler)
    once(document.createElement('div'), '', handler)
    // once(document.createElement('div'), 'click', null)
    expect(handler).not.toBeCalled()
  })

  it('should bind the handler to the specified event of the element and unbind it after the first trigger', () => {
    const el = document.createElement('div')
    const handler = vi.fn()
    once(el, 'click', handler)
    el.click()
    expect(handler).toBeCalledTimes(1)
    handler.mockClear()
    el.click()
    expect(handler).not.toBeCalled()
  })
})

describe('getStyle', () => {
  it('should return null if no element or styleName is provided', () => {
    expect(getStyle(null, 'height')).toBeNull()
    expect(getStyle(document.createElement('div'), '')).toBeNull()
  })

  it('should return the style of the element', () => {
    const el = document.createElement('div')
    el.style.height = '100px'
    expect(getStyle(el, 'height')).toBe('100px')
  })

  it('should convert underline style names to hump style names', () => {
    const el = document.createElement('div')
    el.style.backgroundColor = 'red'
    expect(getStyle(el, 'background_color')).toBe('rgb(255, 0, 0)')
  })

  it('should return the float style of the element', () => {
    const el = document.createElement('div')
    el.style.cssFloat = 'left'
    expect(getStyle(el, 'float')).toBe('left')
  })

  it('should return the opacity of the element', () => {
    const el = document.createElement('div')
    el.style.opacity = '0.5'
    expect(getStyle(el, 'opacity')).toBe('0.5')
  })
})

describe('setStyle', () => {
  it('should do nothing if no element or styleName is provided', () => {
    const el = document.createElement('div')
    setStyle(null, 'height', '100px')
    setStyle(el, '', '100px')
    expect(getStyle(el, 'height')).toBe('')
  })

  it('should set the style of the element', () => {
    const el = document.createElement('div')
    setStyle(el, 'height', '100px')
    expect(getStyle(el, 'height')).toBe('100px')
  })

  it('should convert underline style names to hump style names', () => {
    const el = document.createElement('div')
    setStyle(el, 'background_color', 'red')
    expect(getStyle(el, 'backgroundColor')).toBe('rgb(255, 0, 0)')
  })

  it('should set the float style of the element', () => {
    const el = document.createElement('div')
    setStyle(el, 'float', 'left')
    expect(getStyle(el, 'float')).toBe('left')
  })

  it('should set the opacity of the element', () => {
    const el = document.createElement('div')
    setStyle(el, 'opacity', '0.5')
    expect(getStyle(el, 'opacity')).toBe('0.5')
  })

  it('should set multiple styles of the element if styleName is an object', () => {
    const el = document.createElement('div')
    setStyle(el, {
      height: '100px',
      width: '100px'
    })
    expect(getStyle(el, 'height')).toBe('100px')
    expect(getStyle(el, 'width')).toBe('100px')
  })
})

// describe('isScroll', () => {
//   it('should return false if no element is provided', () => {
//     expect(isScroll(null)).toBe(false)
//     expect(isScroll(undefined)).toBe(false)
//   })

//   it('should return true if the overflow of the element is scroll or auto', () => {
//     const el = document.createElement('div')
//     setStyle(el, 'overflow', 'scroll')
//     expect(isScroll(el)).toBe(true)
//     setStyle(el, 'overflow', 'auto')
//     expect(isScroll(el)).toBe(true)
//   })

//   it('should return false if the overflow of the element is not scroll or auto', () => {
//     const el = document.createElement('div')
//     setStyle(el, 'overflow', 'hidden')
//     expect(isScroll(el)).toBe(false)
//   })

//   it('should check the overflow-x of the element if vertical is overflow-x', () => {
//     const el = document.createElement('div')
//     setStyle(el, 'overflow-x', 'scroll')
//     setStyle(el, 'overflow-y', 'hidden')
//     expect(isScroll(el, 'overflow-x')).toBe(true)
//     expect(isScroll(el, 'overflow-y')).toBe(false)
//   })

//   it('should check the overflow-y of the element if vertical is overflow-y', () => {
//     const el = document.createElement('div')
//     setStyle(el, 'overflow-y', 'scroll')
//     setStyle(el, 'overflow-x', 'hidden')
//     expect(isScroll(el, 'overflow-y')).toBe(true)
//     expect(isScroll(el, 'overflow-x')).toBe(false)
//   })
// })

// describe('getScrollContainer', () => {
//   it('should return undefined if running in server environment', () => {
//     // Mock isServer function to return true
//     vi.mock('./index', async () => ({
//       ...(await vi.importActual('./index')),
//       isServer: () => true
//     }))
//     expect(getScrollContainer(document.createElement('div'))).toBeUndefined()
//   })

//   it('should return window if the element is window, document, or document.documentElement', () => {
//     expect(getScrollContainer(window)).toBe(window)
//     expect(getScrollContainer(document)).toBe(window)
//     expect(getScrollContainer(document.documentElement)).toBe(window)
//   })

//   it('should return the scroll container of the element', () => {
//     const parent = document.createElement('div')
//     const child = document.createElement('div')
//     parent.appendChild(child)
//     setStyle(parent, 'overflow', 'scroll')
//     expect(getScrollContainer(child)).toBe(parent)
//   })

//   it('should return null if the element has no scroll container', () => {
//     const el = document.createElement('div')
//     expect(getScrollContainer(el)).toBeNull()
//   })

//   it('should check the overflow-x of the element if vertical is overflow-x', () => {
//     const parent = document.createElement('div')
//     const child = document.createElement('div')
//     parent.appendChild(child)
//     setStyle(parent, 'overflow-x', 'scroll')
//     expect(getScrollContainer(child, 'overflow-x')).toBe(parent)
//   })

//   it('should check the overflow-y of the element if vertical is overflow-y', () => {
//     const parent = document.createElement('div')
//     const child = document.createElement('div')
//     parent.appendChild(child)
//     setStyle(parent, 'overflow-y', 'scroll')
//     expect(getScrollContainer(child, 'overflow-y')).toBe(parent)
//   })
// })

// describe('isInContainer', () => {
//   it('should return false if running in server environment', () => {
//     // Mock isServer function to return true
//     vi.mock('./index', async () => ({
//       ...(await vi.importActual('./index')),
//       isServer: () => true
//     }))
//     expect(isInContainer(document.createElement('div'), document.body)).toBe(false)
//   })

//   it('should return false if no element or container is provided', () => {
//     expect(isInContainer(null, document.body)).toBe(false)
//     expect(isInContainer(document.createElement('div'), null)).toBe(false)
//   })

//   it('should return true if the element is in the container', () => {
//     const container = document.createElement('div')
//     const el = document.createElement('div')
//     container.appendChild(el)
//     setStyle(container, {
//       width: '100px',
//       height: '100px',
//       overflow: 'auto'
//     })
//     setStyle(el, {
//       width: '50px',
//       height: '50px'
//     })
//     document.body.appendChild(container)
//     expect(isInContainer(el, container)).toBe(true)
//     document.body.removeChild(container)
//   })

//   it('should return false if the element is not in the container', () => {
//     const container = document.createElement('div')
//     const el = document.createElement('div')
//     setStyle(container, {
//       width: '100px',
//       height: '100px',
//       overflow: 'auto'
//     })
//     setStyle(el, {
//       width: '50px',
//       height: '50px'
//     })
//     document.body.appendChild(el)
//     expect(isInContainer(el, container)).toBe(false)
//     document.body.removeChild(el)
//   })
// })

describe('setCssVar', () => {
  it('should set the CSS variable of the document.documentElement by default', () => {
    setCssVar('--color', 'red')
    expect(getComputedStyle(document.documentElement).getPropertyValue('--color').trim()).toBe(
      'red'
    )
  })

  it('should set the CSS variable of the specified element', () => {
    const el = document.createElement('div')
    setCssVar('--color', 'blue', el)
    expect(getComputedStyle(el).getPropertyValue('--color').trim()).toBe('blue')
  })

  it('should do nothing if no prop is provided', () => {
    const el = document.createElement('div')
    setCssVar('', 'green', el)
    expect(getComputedStyle(el).getPropertyValue('--color').trim()).toBe('')
  })
})

describe('getCssVar', () => {
  it('should get the CSS variable of the document.documentElement by default', () => {
    setCssVar('--color', 'red')
    expect(getCssVar('--color')).toBe('red')
  })

  it('should get the CSS variable of the specified element', () => {
    const el = document.createElement('div')
    setCssVar('--color', 'blue', el)
    expect(getCssVar('--color', el)).toBe('blue')
  })

  it('should return an empty string if no prop is provided', () => {
    expect(getCssVar('')).toBe('')
  })
})
