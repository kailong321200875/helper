export const is = (val: unknown, type: string): boolean => {
  return toString.call(val) === `[object ${type}]`
}

export const trim = (s: string): string => {
  return (s || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}
