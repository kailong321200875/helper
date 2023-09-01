/**
 * 获取URL参数 兼容HASH模式
 * @category Url
 * @param key 需要获取的参数名
 * @example
 * ``` typescript
 * getQuery('name')
 * ```
 */
export function getUrlQuery(key: string) {
  const search = window.location.search.substr(1) || window.location.hash.split('?')[1]
  const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)')
  const r = search?.match(reg)
  if (r != null) return unescape(r[2])
  return null
}
