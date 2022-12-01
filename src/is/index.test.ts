import { expect, it } from 'vitest'
import {
  isServer,
  isEdge,
  isNumber,
  isArray,
  isDef,
  isUnDef,
  isObject,
  isString,
  isEmpty,
  isDate,
  isNull,
  isNullAndUnDef,
  isNullOrUnDef,
  isFunction,
  isPromise,
  isRegExp,
  isElement,
  isMap,
  isClient,
  isUrl,
  isEmail
} from './index'

it('isServer', () => {
  expect(isServer()).toBeTruthy()
})

it('isEdge', () => {
  expect(isEdge()).toBeFalsy()
})

it('isNumber', () => {
  expect(isNumber(123)).toBeTruthy()
  expect(isNumber(123.22)).toBeTruthy()
  expect(isNumber('123')).toBeFalsy()
  expect(isNumber(null)).toBeFalsy()
  expect(isNumber(undefined)).toBeFalsy()
})

it('isArray', () => {
  expect(isArray([])).toBeTruthy()
  expect(isArray([1, '2', '3'])).toBeTruthy()
  expect(isArray([1, 2, 3])).toBeTruthy()
  expect(isArray(['1', '2', '3'])).toBeTruthy()
  expect(isArray(123)).toBeFalsy()
  expect(isArray('123')).toBeFalsy()
})

it('isDef', () => {
  expect(isDef()).toBeFalsy()
  expect(isDef(undefined)).toBeFalsy()
  expect(isDef(null)).toBeTruthy()
  expect(isDef(123)).toBeTruthy()
  expect(isDef('123')).toBeTruthy()
})

it('isUnDef', () => {
  expect(isUnDef()).toBeTruthy()
  expect(isUnDef(undefined)).toBeTruthy()
  expect(isUnDef(null)).toBeFalsy()
  expect(isUnDef(123)).toBeFalsy()
  expect(isUnDef('123')).toBeFalsy()
})

it('isObject', () => {
  expect(isObject({})).toBeTruthy()
  expect(isObject([])).toBeFalsy()
  expect(isObject(null)).toBeFalsy()
  expect(isObject(undefined)).toBeFalsy()
  expect(isObject('123')).toBeFalsy()
  expect(isObject(123)).toBeFalsy()
})

it('isString', () => {
  expect(isString({})).toBeFalsy()
  expect(isString([])).toBeFalsy()
  expect(isString(null)).toBeFalsy()
  expect(isString(undefined)).toBeFalsy()
  expect(isString('123')).toBeTruthy()
  expect(isString(123)).toBeFalsy()
})

it('isEmpty', () => {
  expect(isEmpty([])).toBeTruthy()
  expect(isEmpty([1, 2, 3])).toBeFalsy()
  expect(isEmpty('')).toBeTruthy()
  expect(isEmpty('123')).toBeFalsy()
  expect(isEmpty(new Map())).toBeTruthy()
  expect(
    isEmpty(
      new Map([
        [1, 'one'],
        [2, 'two'],
        [3, 'three']
      ])
    )
  ).toBeFalsy()
  expect(isEmpty(new Set())).toBeTruthy()
  expect(isEmpty(new Set([1, 2, 3, 4]))).toBeFalsy()
  expect(isEmpty({})).toBeTruthy()
  expect(isEmpty({ test: '1' })).toBeFalsy()
})

it('isDate', () => {
  expect(isDate('123')).toBeFalsy()
  expect(isDate(new Date())).toBeTruthy()
  expect(isDate(new Date('2022-05-05'))).toBeTruthy()
})

it('isNull', () => {
  expect(isNull(null)).toBeTruthy()
  expect(isNull(undefined)).toBeFalsy()
  expect(isNull(123)).toBeFalsy()
  expect(isNull('123')).toBeFalsy()
})

// TODO: 会有既是null又是undefined的？？
it('isNullAndUnDef', () => {
  expect(isNullAndUnDef(undefined)).toBeFalsy()
})

it('isNullOrUnDef', () => {
  expect(isNullOrUnDef(undefined)).toBeTruthy()
  expect(isNullOrUnDef(null)).toBeTruthy()
  expect(isNullOrUnDef(123)).toBeFalsy()
})

it('isFunction', () => {
  expect(
    isFunction(function () {
      console.log('test')
    })
  ).toBeTruthy()
  expect(
    isFunction(() => {
      console.log('test')
    })
  ).toBeTruthy()
  expect(isFunction(class {})).toBeTruthy()
  expect(isFunction('123')).toBeFalsy()
})

it('isPromise', () => {
  const promise = new Promise(function () {
    console.log('test')
  })
  expect(isPromise(promise)).toBeFalsy()
  expect(isPromise({})).toBeFalsy()
})

it('isRegExp', () => {
  expect(isRegExp(/\d+/)).toBeTruthy()
  expect(isRegExp(new RegExp(/\d+/))).toBeTruthy()
  expect(isRegExp(123)).toBeFalsy()
})

it('isElement', () => {
  expect(isElement(123)).toBeFalsy()
})

it('isMap', () => {
  expect(isMap(new Map())).toBeTruthy()
  expect(
    isMap(
      new Map([
        [1, 'one'],
        [2, 'two'],
        [3, 'three']
      ])
    )
  ).toBeTruthy()
  expect(isMap([])).toBeFalsy()
})

it('isClient', () => {
  expect(isClient()).toBeFalsy()
})

it('isUrl', () => {
  expect(isUrl('https://www.baidu.com')).toBeTruthy()
  expect(isUrl('www.baidu.com')).toBeTruthy()
  expect(isUrl('192.168.169.197:8080')).toBeFalsy()
  expect(isUrl('https://192.168.169.197:8080')).toBeTruthy()
})

it('isEmail', () => {
  expect(isEmail('502431556@qq.com')).toBeTruthy()
  expect(isEmail('502431556@qq')).toBeFalsy()
})
