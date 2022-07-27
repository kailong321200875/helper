import { isServer } from '../is'
import { trim, underlineToHump } from '../string'
const ieVersion = isServer() ? 0 : Number((document as any).documentMode)

interface ViewportOffsetResult {
  left: number
  top: number
  right: number
  bottom: number
  rightIncludeBody: number
  bottomIncludeBody: number
}

/**
 * 判断当前元素是否有某个className
 * @category Dom
 * @param el 指定的元素
 * @param cls 需要判断是否存在的className
 * @example
 * ``` typescript
 * hasClass(document.getElementById('test'), 'test-item')
 * ```
 */
export const hasClass = (el: Element, cls: string): string | boolean => {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1) {
    throw new Error('className should not contain space.')
  }
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
}

/**
 * 给某个元素添加className
 * @category Dom
 * @param el 指定的元素
 * @param cls 需要添加的className
 * @example
 * ``` typescript
 * addClass(document.getElementById('test'), 'test-item')
 * ```
 */
export const addClass = (el: Element, cls: string) => {
  if (!el) return
  let curClass = el.className
  const classes = (cls || '').split(' ')

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.add(clsName)
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName
    }
  }
  if (!el.classList) {
    el.className = curClass
  }
}

/**
 * 给某个元素移除className
 * @category Dom
 * @param el 指定的元素
 * @param cls 需要移除的className
 * @example
 * ``` typescript
 * removeClass(document.getElementById('test'), 'test-item')
 * ```
 */
export const removeClass = (el: Element, cls: string) => {
  if (!el || !cls) return
  const classes = cls.split(' ')
  let curClass = ' ' + el.className + ' '

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.remove(clsName)
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ')
    }
  }
  if (!el.classList) {
    el.className = trim(curClass)
  }
}

/**
 * 返回元素的大小及其相对于视口的位置
 * @category Dom
 * @param element 元素
 * @example
 * ``` typescript
 * getBoundingClientRect()
 * ```
 */
export const getBoundingClientRect = (element: Element): DOMRect | number => {
  if (!element || !element.getBoundingClientRect) {
    return 0
  }
  return element.getBoundingClientRect()
}

/**
 * 获取当前元素的left、top偏移
 *   left：元素最左侧距离文档左侧的距离
 *   top:元素最顶端距离文档顶端的距离
 *   right:元素最右侧距离文档右侧的距离
 *   bottom：元素最底端距离文档底端的距离
 *   rightIncludeBody：元素最左侧距离文档右侧的距离
 *   bottomIncludeBody：元素最底端距离文档最底部的距离
 * @category Dom
 * @param element 元素
 * @example
 * ``` typescript
 * getViewportOffset(document.getElementById('test'))
 * ```
 */
export const getViewportOffset = (element: Element): ViewportOffsetResult => {
  const doc = document.documentElement

  const docScrollLeft = doc.scrollLeft
  const docScrollTop = doc.scrollTop
  const docClientLeft = doc.clientLeft
  const docClientTop = doc.clientTop

  const pageXOffset = window.pageXOffset
  const pageYOffset = window.pageYOffset

  const box = getBoundingClientRect(element)

  const { left: retLeft, top: rectTop, width: rectWidth, height: rectHeight } = box as DOMRect

  const scrollLeft = (pageXOffset || docScrollLeft) - (docClientLeft || 0)
  const scrollTop = (pageYOffset || docScrollTop) - (docClientTop || 0)
  const offsetLeft = retLeft + pageXOffset
  const offsetTop = rectTop + pageYOffset

  const left = offsetLeft - scrollLeft
  const top = offsetTop - scrollTop

  const clientWidth = window.document.documentElement.clientWidth
  const clientHeight = window.document.documentElement.clientHeight
  return {
    left: left,
    top: top,
    right: clientWidth - rectWidth - left,
    bottom: clientHeight - rectHeight - top,
    rightIncludeBody: clientWidth - left,
    bottomIncludeBody: clientHeight - top
  }
}

/**
 * 给元素绑定自定义监听事件
 * @category Dom
 * @param element 元素
 * @param event 事件名
 * @param handler 要触发的事件
 * @example
 * ``` typescript
 * on(document.getElementById('test'), 'test', () => {
 *   console.log('test')
 * })
 * ```
 */
export const on = (
  element: HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject
): void => {
  if (element && event && handler) {
    element.addEventListener(event, handler, false)
  }
}

/**
 * 给元素关闭自定义监听事件
 * @category Dom
 * @param element 元素
 * @param event 事件名
 * @param handler 要触发的事件
 * @example
 * ``` typescript
 * off(document.getElementById('test'), 'test', () => {
 *   console.log('test')
 * })
 * ```
 */
export const off = (
  element: HTMLElement | Document | Window,
  event: string,
  handler: any
): void => {
  if (element && event && handler) {
    element.removeEventListener(event, handler, false)
  }
}

/**
 * 给元素只绑定一次自定义监听事件
 * @category Dom
 * @param el 元素
 * @param event 事件名
 * @param fn 要触发的事件
 * @example
 * ``` typescript
 * once(document.getElementById('test'), 'test', () => {
 *   console.log('test')
 * })
 * ```
 */
export const once = (el: HTMLElement, event: string, fn: EventListener): void => {
  const listener = function (this: any, ...args: unknown[]) {
    if (fn) {
      fn.apply(this, args as any)
    }
    off(el, event, listener)
  }
  on(el, event, listener)
}

/**
 * 获取元素的某个样式
 * @category Dom
 * @param element 元素
 * @param styleName 属性名
 * @example
 * ``` typescript
 * getStyle(document.getElementById('test'), 'height')
 * ```
 */
export const getStyle =
  ieVersion < 9
    ? (element: Element | any, styleName: string) => {
        if (isServer()) return
        if (!element || !styleName) return null
        styleName = underlineToHump(styleName)
        if (styleName === 'float') {
          styleName = 'styleFloat'
        }
        try {
          switch (styleName) {
            case 'opacity':
              try {
                return element.filters.item('alpha').opacity / 100
              } catch (e) {
                return 1.0
              }
            default:
              return element.style[styleName] || element.currentStyle
                ? element.currentStyle[styleName]
                : null
          }
        } catch (e) {
          return element.style[styleName]
        }
      }
    : (element: Element | any, styleName: string) => {
        if (isServer()) return
        if (!element || !styleName) return null
        styleName = underlineToHump(styleName)
        if (styleName === 'float') {
          styleName = 'cssFloat'
        }
        try {
          const computed = (document as any).defaultView.getComputedStyle(element, '')
          return element.style[styleName] || computed ? computed[styleName] : null
        } catch (e) {
          return element.style[styleName]
        }
      }

/**
 * 设置元素的某个样式
 * @category Dom
 * @param element 元素
 * @param styleName 属性名
 * @param value 属性值
 * @example
 * ``` typescript
 * setStyle(document.getElementById('test'), 'height', '100px')
 * ```
 */
export const setStyle = (element: Element | any, styleName: any, value: any) => {
  if (!element || !styleName) return

  if (typeof styleName === 'object') {
    for (const prop in styleName) {
      if (Object.prototype.hasOwnProperty.call(styleName, prop)) {
        setStyle(element, prop, styleName[prop])
      }
    }
  } else {
    styleName = underlineToHump(styleName)
    if (styleName === 'opacity' && ieVersion < 9) {
      element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')'
    } else {
      element.style[styleName] = value
    }
  }
}

/**
 * 判断元素overflow
 * @category Dom
 * @param el 元素
 * @param vertical 滚动条方向，'overflow-y' | 'overflow-x'
 * @example
 * ``` typescript
 * isScroll(document.getElementById('test'), 'overflow-y')
 * ```
 */
export const isScroll = (el: Element, vertical?: 'overflow-y' | 'overflow-x') => {
  if (isServer()) return

  const determinedDirection = vertical !== null || vertical !== undefined
  const overflow = determinedDirection
    ? vertical
      ? getStyle(el, 'overflow-y')
      : getStyle(el, 'overflow-x')
    : getStyle(el, 'overflow')

  return overflow.match(/(scroll|auto)/)
}

/**
 * 判断元素的滚动容器
 * @category Dom
 * @param el 元素
 * @param vertical 滚动条方向，'overflow-y' | 'overflow-x'
 * @example
 * ``` typescript
 * getScrollContainer(document.getElementById('test'))
 * ```
 */
export const getScrollContainer = (el: Element, vertical?: 'overflow-y' | 'overflow-x') => {
  if (isServer()) return

  let parent: any = el
  while (parent) {
    if ([window, document, document.documentElement].includes(parent)) {
      return window
    }
    if (isScroll(parent, vertical)) {
      return parent
    }
    parent = parent.parentNode
  }

  return parent
}

/**
 * 判断元素是否在某个容器内
 * @category Dom
 * @param el 元素
 * @param container 父容器元素
 * @example
 * ``` typescript
 * isInContainer(document.getElementById('test'), document.body)
 * ```
 */
export const isInContainer = (el: Element, container: any) => {
  if (isServer() || !el || !container) return false

  const elRect = el.getBoundingClientRect()
  let containerRect

  if ([window, document, document.documentElement, null, undefined].includes(container)) {
    containerRect = {
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      left: 0
    }
  } else {
    containerRect = container.getBoundingClientRect()
  }

  return (
    elRect.top < containerRect.bottom &&
    elRect.bottom > containerRect.top &&
    elRect.right > containerRect.left &&
    elRect.left < containerRect.right
  )
}
