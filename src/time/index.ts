/**
 * 日期格式转换
 * @param time 需要转换的时间
 * @param fmt 需要转换的格式 如 yyyy-MM-dd、yyyy-MM-dd HH:mm:ss
 * @example
 * ``` typescript
 * formatTime(new Date(), 'yyyy-MM-dd')
 * ```
 */
export function formatTime(time: Date | number | string | null | undefined, fmt: string) {
  if (!time) return ''
  else {
    const date = new Date(time)
    const o: any = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }
    return fmt
  }
}

/**
 * 获取当前时间戳
 * @example
 * ``` typescript
 * timestamp()
 * ```
 */
export const timestamp = () => +Date.now()

/**
 * 等待指定时间
 * @param time 等待时间
 * @example
 * ``` typescript
 * await sleep(1000)
 * ```
 */
export const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time))
