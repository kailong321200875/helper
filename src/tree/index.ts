interface TreeHelperConfig {
  id: string
  children: string
  pid: string
}

interface Fn<T = any> {
  (...arg: T[]): T
}

const DEFAULT_CONFIG: TreeHelperConfig = {
  id: 'id',
  children: 'children',
  pid: 'pid'
}

const getConfig = (config: Partial<TreeHelperConfig>) => Object.assign({}, DEFAULT_CONFIG, config)

/**
 * 一维数组转树形数据
 * @param list 需要转换的数组
 * @param config 树形的配置项
 * @category Tree
 * @example
 * ``` typescript
 * listToTree([{value: 1, id: 1}, {value: 2, pid: 1, id: 2}])
 * ```
 */
export const listToTree = <T = any>(list: any[], config: Partial<TreeHelperConfig> = {}): T[] => {
  const conf = getConfig(config) as TreeHelperConfig
  const nodeMap = new Map()
  const result: T[] = []
  const { id, children, pid } = conf

  for (const node of list) {
    node[children] = node[children] || []
    nodeMap.set(node[id], node)
  }
  for (const node of list) {
    const parent = nodeMap.get(node[pid])
    ;(parent ? parent.children : result).push(node)
  }
  return result
}

/**
 * 树形数据转一维数组
 * @param tree 需要转换的树形数据
 * @param config 树形的配置项
 * @category Tree
 * @example
 * ``` typescript
 * treeToList([{value: 1, id: 1, children: [{value: 2, pid: 1, id: 2}]}])
 * ```
 */
export const treeToList = <T = any>(tree: any, config: Partial<TreeHelperConfig> = {}): T => {
  config = getConfig(config)
  const { children } = config
  const result: any = [...tree]
  for (let i = 0; i < result.length; i++) {
    if (!result[i][children!]) continue
    result.splice(i + 1, 0, ...result[i][children!])
  }
  return result
}

/**
 * 查找树形数据中指定的节点
 * @param tree 树形数据
 * @param func 查找节点的函数
 * @param config 树形的配置项
 * @category Tree
 * @example
 * ``` typescript
 * const tree = [{value: 1, id: 1, children: [{value: 2, pid: 1, id: 2}]}]
 * const node = findNode(tree, (node) => {
 *   return node.value === 1
 * })
 * ```
 */
export const findNode = <T = any>(
  tree: any,
  func: Fn,
  config: Partial<TreeHelperConfig> = {}
): T | null => {
  config = getConfig(config)
  const { children } = config
  const list = [...tree]
  for (const node of list) {
    if (func(node)) return node
    node[children!] && list.push(...node[children!])
  }
  return null
}

/**
 * 查找所有符合条件的节点
 * @param tree 树形数据
 * @param func 查找节点的函数
 * @param config 树形的配置项
 * @category Tree
 * @example
 * ``` typescript
 * const tree = [{value: 1, id: 1, children: [{value: 2, pid: 1, id: 2}]}]
 * const nodes = findNodeAll(tree, (node) => {
 *   return node.value
 * })
 * ```
 */
export const findNodeAll = <T = any>(
  tree: any,
  func: Fn,
  config: Partial<TreeHelperConfig> = {}
): T[] => {
  config = getConfig(config)
  const { children } = config
  const list = [...tree]
  const result: T[] = []
  for (const node of list) {
    func(node) && result.push(node)
    node[children!] && list.push(...node[children!])
  }
  return result
}

/**
 * 查找父节点
 * @param tree 树形数据
 * @param func 查找节点的函数
 * @param config 树形的配置项
 * @category Tree
 * @example
 * ``` typescript
 * const tree = [{value: 1, id: 1, children: [{value: 2, pid: 1, id: 2, children: [{value: 3, pid: 2, id: 3}]}]}]
 * const nodes = findPath(tree, (node) => {
 *   return node.value === 3
 * })
 * ```
 */
export const findPath = <T = any>(
  tree: any,
  func: Fn,
  config: Partial<TreeHelperConfig> = {}
): T | T[] | null => {
  config = getConfig(config)
  const path: T[] = []
  const list = [...tree]
  const visitedSet = new Set()
  const { children } = config
  while (list.length) {
    const node = list[0]
    if (visitedSet.has(node)) {
      path.pop()
      list.shift()
    } else {
      visitedSet.add(node)
      node[children!] && list.unshift(...node[children!])
      path.push(node)
      if (func(node)) {
        return path
      }
    }
  }
  return null
}

/**
 * 查找所有父节点
 * @param tree 树形数据
 * @param func 查找节点的函数
 * @param config 树形的配置项
 * @category Tree
 * @example
 * ``` typescript
 * const tree = [{value: 1, id: 1, children: [{value: 2, pid: 1, id: 2, children: [{value: 3, pid: 2, id: 3}]}]}]
 * const nodes = findPathAll(tree, (node) => {
 *   return node.value === 3
 * })
 * ```
 */
export const findPathAll = (tree: any, func: Fn, config: Partial<TreeHelperConfig> = {}) => {
  config = getConfig(config)
  const path: any[] = []
  const list = [...tree]
  const result: any[] = []
  const visitedSet = new Set(),
    { children } = config
  while (list.length) {
    const node = list[0]
    if (visitedSet.has(node)) {
      path.pop()
      list.shift()
    } else {
      visitedSet.add(node)
      node[children!] && list.unshift(...node[children!])
      path.push(node)
      func(node) && result.push([...path])
    }
  }
  return result
}

/**
 * 过滤树形数据
 * @param tree 树形数据
 * @param func 过滤节点的函数
 * @param config 树形的配置项
 * @category Tree
 * @example
 * ``` typescript
 * const tree = [{value: 1, id: 1, children: [{value: 2, pid: 1, id: 2, children: [{value: 3, pid: 2, id: 3}]}]}]
 * const nodes = filter(tree, (node) => {
 *   return node.value === 2
 * })
 * ```
 */
export const filter = <T = any>(
  tree: T[],
  func: (n: T) => boolean,
  config: Partial<TreeHelperConfig> = {}
): T[] => {
  config = getConfig(config)
  const children = config.children as string
  function listFilter(list: T[]) {
    return list
      .map((node: any) => ({ ...node }))
      .filter((node) => {
        node[children] = node[children] && listFilter(node[children])
        return func(node) || (node[children] && node[children].length)
      })
  }
  return listFilter(tree)
}

/**
 * 循环遍历树形数据
 * @param tree 树形数据
 * @param func 循环遍历节点的函数
 * @param config 树形的配置项
 * @category Tree
 * @example
 * ``` typescript
 * const tree = [{value: 1, id: 1, children: [{value: 2, pid: 1, id: 2, children: [{value: 3, pid: 2, id: 3}]}]}]
 * const nodes = forEach(tree, (node) => {
 *   console.log(node)
 * })
 * ```
 */
export const forEach = <T = any>(
  tree: T[],
  func: (n: T) => any,
  config: Partial<TreeHelperConfig> = {}
): void => {
  config = getConfig(config)
  const list: any[] = [...tree]
  const { children } = config
  for (let i = 0; i < list.length; i++) {
    // func 返回true就终止遍历，避免大量节点场景下无意义循环，引起浏览器卡顿
    if (func(list[i])) {
      return
    }
    children && list[i][children] && list.splice(i + 1, 0, ...list[i][children])
  }
}

/**
 * 循环遍历树形数据返回符合条件的节点
 * @param treeData 树形数据
 * @param opt 树形的配置项
 * @category Tree
 * @example
 * ``` typescript
 * const tree = [{value: 1, id: 1, children: [{value: 2, pid: 1, id: 2, children: [{value: 3, pid: 2, id: 3}]}]}]
 * const nodes = treeMap(tree, {
 *   conversion: (node) => {
 *     if (node.value === 3) {
 *		   return node
 *		 }
 *	 }
 * })
 * ```
 */
export const treeMap = <T = any>(
  treeData: T[],
  opt: { children?: string; conversion: Fn }
): T[] => {
  return treeData.map((item) => treeMapEach(item, opt))
}

const treeMapEach = (
  data: any,
  { children = 'children', conversion }: { children?: string; conversion: Fn }
) => {
  const haveChildren = Array.isArray(data[children]) && data[children].length > 0
  const conversionData = conversion(data) || {}
  if (haveChildren) {
    return {
      ...conversionData,
      [children]: data[children].map((i: number) =>
        treeMapEach(i, {
          children,
          conversion
        })
      )
    }
  } else {
    return {
      ...conversionData
    }
  }
}

/**
 * 递归遍历树形数据
 * @param treeDatas 树形数据
 * @param callBack 遍历节点的函数
 * @param parentNode 父级节点
 * @category Tree
 * @example
 * ``` typescript
 * const tree = [{value: 1, id: 1, children: [{value: 2, pid: 1, id: 2, children: [{value: 3, pid: 2, id: 3}]}]}]
 * eachTree(tree, (node, parent) => {
 *   console.log(node, parent)
 * })
 * ```
 */
export const eachTree = (treeDatas: any[], callBack: Fn, parentNode = {}) => {
  treeDatas.forEach((element) => {
    const newNode = callBack(element, parentNode) || element
    if (element.children) {
      eachTree(element.children, callBack, newNode)
    }
  })
}
