/**
 * 替换字符串
 * @category String
 * @param str 需要替换的字符串
 * @param findText 被替换的内容
 * @param repText 替换的内容
 * @example
 * ``` typescript
 * replaceAll('abcdefg', 'a', 'b')
 * ```
 */
export const replaceAll = (str: string, findText: string, repText: string) => {
  const regExp = new RegExp(findText, 'g')
  return str.replace(regExp, repText)
}