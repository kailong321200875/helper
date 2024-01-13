import { describe, it, expect } from 'vitest'
import {
  eachTree,
  filter,
  findNode,
  findNodeAll,
  findPath,
  findPathAll,
  forEach,
  listToTree,
  treeMap,
  treeToList
} from '../index'

describe('listToTree', () => {
  it('should convert list to tree correctly', () => {
    const list = [
      { id: 1, pid: null, value: 'root' },
      { id: 2, pid: 1, value: 'child 1' },
      { id: 3, pid: 1, value: 'child 2' },
      { id: 4, pid: 2, value: 'grandchild 1' },
      { id: 5, pid: 2, value: 'grandchild 2' }
    ]
    const tree = listToTree(list)
    expect(tree).toEqual([
      {
        id: 1,
        pid: null,
        value: 'root',
        children: [
          {
            id: 2,
            pid: 1,
            value: 'child 1',
            children: [
              { id: 4, pid: 2, value: 'grandchild 1', children: [] },
              { id: 5, pid: 2, value: 'grandchild 2', children: [] }
            ]
          },
          { id: 3, pid: 1, value: 'child 2', children: [] }
        ]
      }
    ])
  })

  it('should handle custom config correctly', () => {
    const list = [
      { _id: 1, _pid: null, value: 'root' },
      { _id: 2, _pid: 1, value: 'child 1' },
      { _id: 3, _pid: 1, value: 'child 2' },
      { _id: 4, _pid: 2, value: 'grandchild 1' },
      { _id: 5, _pid: 2, value: 'grandchild 2' }
    ]
    const tree = listToTree(list, { id: '_id', pid: '_pid', children: '_children' })
    expect(tree).toEqual([
      {
        _id: 1,
        _pid: null,
        value: 'root',
        _children: [
          {
            _id: 2,
            _pid: 1,
            value: 'child 1',
            _children: [
              { _id: 4, _pid: 2, value: 'grandchild 1', _children: [] },
              { _id: 5, _pid: 2, value: 'grandchild 2', _children: [] }
            ]
          },
          { _id: 3, _pid: 1, value: 'child 2', _children: [] }
        ]
      }
    ])
  })
})

describe('treeToList', () => {
  it('should convert tree to list correctly', () => {
    const tree = [
      {
        value: 1,
        id: 1,
        children: [
          { value: 2, pid: 1, id: 2 },
          { value: 3, pid: 1, id: 3, children: [{ value: 4, pid: 3, id: 4 }] }
        ]
      }
    ]
    const list = treeToList(tree)
    expect(list).toEqual([
      { value: 1, id: 1 },
      { value: 2, pid: 1, id: 2 },
      { value: 3, pid: 1, id: 3 },
      { value: 4, pid: 3, id: 4 }
    ])
  })

  it('should handle custom config correctly', () => {
    const tree = [
      {
        value: 1,
        _id: 1,
        _children: [
          { value: 2, _pid: 1, _id: 2 },
          { value: 3, _pid: 1, _id: 3, _children: [{ value: 4, _pid: 3, _id: 4 }] }
        ]
      }
    ]
    const list = treeToList(tree, { id: '_id', pid: '_pid', children: '_children' })
    expect(list).toEqual([
      { value: 1, _id: 1 },
      { value: 2, _pid: 1, _id: 2 },
      { value: 3, _pid: 1, _id: 3 },
      { value: 4, _pid: 3, _id: 4 }
    ])
  })
})

describe('findNode', () => {
  it('should find the correct node', () => {
    const tree = [
      {
        value: 1,
        id: 1,
        children: [
          { value: 2, pid: 1, id: 2 },
          { value: 3, pid: 1, id: 3, children: [{ value: 4, pid: 3, id: 4 }] }
        ]
      }
    ]
    const node = findNode(tree, (node) => node.value === 2)
    expect(node).toEqual({ value: 2, pid: 1, id: 2 })
  })

  it('should return null if no node is found', () => {
    const tree = [
      {
        value: 1,
        id: 1,
        children: [
          { value: 2, pid: 1, id: 2 },
          { value: 3, pid: 1, id: 3, children: [{ value: 4, pid: 3, id: 4 }] }
        ]
      }
    ]
    const node = findNode(tree, (node) => node.value === 5)
    expect(node).toBeNull()
  })

  it('should handle custom config correctly', () => {
    const tree = [
      {
        value: 1,
        _id: 1,
        _children: [
          { value: 2, _pid: 1, _id: 2 },
          { value: 3, _pid: 1, _id: 3, _children: [{ value: 4, _pid: 3, _id: 4 }] }
        ]
      }
    ]
    const node = findNode(tree, (node) => node.value === 2, {
      id: '_id',
      pid: '_pid',
      children: '_children'
    })
    expect(node).toEqual({ value: 2, _pid: 1, _id: 2 })
  })
})

describe('findNodeAll', () => {
  it('should find all nodes that meet the condition', () => {
    const tree = [
      {
        value: 1,
        id: 1,
        children: [
          { value: 2, pid: 1, id: 2 },
          { value: 3, pid: 1, id: 3, children: [{ value: 4, pid: 3, id: 4 }] }
        ]
      }
    ]
    const nodes = findNodeAll(tree, (node) => node.value >= 2)
    expect(nodes).toEqual([
      { value: 2, pid: 1, id: 2 },
      { value: 3, pid: 1, id: 3 },
      { value: 4, pid: 3, id: 4 }
    ])
  })

  it('should return an empty array if no nodes meet the condition', () => {
    const tree = [
      {
        value: 1,
        id: 1,
        children: [
          { value: 2, pid: 1, id: 2 },
          { value: 3, pid: 1, id: 3, children: [{ value: 4, pid: 3, id: 4 }] }
        ]
      }
    ]
    const nodes = findNodeAll(tree, (node) => node.value > 4)
    expect(nodes).toEqual([])
  })

  it('should handle custom config correctly', () => {
    const tree = [
      {
        value: 1,
        _id: 1,
        _children: [
          { value: 2, _pid: 1, _id: 2 },
          { value: 3, _pid: 1, _id: 3, _children: [{ value: 4, _pid: 3, _id: 4 }] }
        ]
      }
    ]
    const nodes = findNodeAll(tree, (node) => node.value >= 2, {
      id: '_id',
      pid: '_pid',
      children: '_children'
    })
    expect(nodes).toEqual([
      { value: 2, _pid: 1, _id: 2 },
      { value: 3, _pid: 1, _id: 3 },
      { value: 4, _pid: 3, _id: 4 }
    ])
  })
})

describe('findPath', () => {
  it('should find the correct path to the node', () => {
    const tree = [
      {
        value: 1,
        id: 1,
        children: [{ value: 2, pid: 1, id: 2, children: [{ value: 3, pid: 2, id: 3 }] }]
      }
    ]
    const path = findPath(tree, (node) => node.value === 3)
    expect(path).toEqual([
      { value: 1, id: 1 },
      { value: 2, pid: 1, id: 2 },
      { value: 3, pid: 2, id: 3 }
    ])
  })

  it('should return null if no path is found', () => {
    const tree = [
      {
        value: 1,
        id: 1,
        children: [{ value: 2, pid: 1, id: 2, children: [{ value: 3, pid: 2, id: 3 }] }]
      }
    ]
    const path = findPath(tree, (node) => node.value === 4)
    expect(path).toBeNull()
  })

  it('should handle custom config correctly', () => {
    const tree = [
      {
        value: 1,
        _id: 1,
        _children: [{ value: 2, _pid: 1, _id: 2, _children: [{ value: 3, _pid: 2, _id: 3 }] }]
      }
    ]
    const path = findPath(tree, (node) => node.value === 3, {
      id: '_id',
      pid: '_pid',
      children: '_children'
    })
    expect(path).toEqual([
      { value: 1, _id: 1 },
      { value: 2, _pid: 1, _id: 2 },
      { value: 3, _pid: 2, _id: 3 }
    ])
  })
})

describe('findPathAll', () => {
  it('should find all paths to the nodes that meet the condition', () => {
    const tree = [
      {
        value: 1,
        id: 1,
        children: [
          { value: 2, pid: 1, id: 2, children: [{ value: 3, pid: 2, id: 3 }] },
          { value: 3, pid: 1, id: 4 }
        ]
      }
    ]
    const paths = findPathAll(tree, (node) => node.value === 3)
    expect(paths).toEqual([
      [
        { value: 1, id: 1 },
        { value: 2, pid: 1, id: 2 },
        { value: 3, pid: 2, id: 3 }
      ],
      [
        { value: 1, id: 1 },
        { value: 3, pid: 1, id: 4 }
      ]
    ])
  })

  it('should return an empty array if no paths are found', () => {
    const tree = [
      {
        value: 1,
        id: 1,
        children: [{ value: 2, pid: 1, id: 2, children: [{ value: 3, pid: 2, id: 3 }] }]
      }
    ]
    const paths = findPathAll(tree, (node) => node.value === 4)
    expect(paths).toEqual([])
  })

  it('should handle custom config correctly', () => {
    const tree = [
      {
        value: 1,
        _id: 1,
        _children: [
          { value: 2, _pid: 1, _id: 2, _children: [{ value: 3, _pid: 2, _id: 3 }] },
          { value: 3, _pid: 1, _id: 4 }
        ]
      }
    ]
    const paths = findPathAll(tree, (node) => node.value === 3, {
      id: '_id',
      pid: '_pid',
      children: '_children'
    })
    expect(paths).toEqual([
      [
        { value: 1, _id: 1 },
        { value: 2, _pid: 1, _id: 2 },
        { value: 3, _pid: 2, _id: 3 }
      ],
      [
        { value: 1, _id: 1 },
        { value: 3, _pid: 1, _id: 4 }
      ]
    ])
  })
})

describe('filter', () => {
  it('should filter the tree correctly', () => {
    const tree = [
      {
        value: 1,
        id: 1,
        children: [
          { value: 2, pid: 1, id: 2, children: [{ value: 3, pid: 2, id: 3 }] },
          { value: 4, pid: 1, id: 4 }
        ]
      }
    ]
    const filteredTree = filter(tree, (node) => node.value >= 2)
    expect(filteredTree).toEqual([
      {
        value: 1,
        id: 1,
        children: [
          { value: 2, pid: 1, id: 2, children: [{ value: 3, pid: 2, id: 3 }] },
          { value: 4, pid: 1, id: 4 }
        ]
      }
    ])
  })

  it('should return an empty array if no nodes meet the condition', () => {
    const tree = [
      {
        value: 1,
        id: 1,
        children: [{ value: 2, pid: 1, id: 2, children: [{ value: 3, pid: 2, id: 3 }] }]
      }
    ]
    const filteredTree = filter(tree, (node) => node.value > 4)
    expect(filteredTree).toEqual([])
  })

  it('should handle custom config correctly', () => {
    const tree = [
      {
        value: 1,
        _id: 1,
        _children: [
          { value: 2, _pid: 1, _id: 2, _children: [{ value: 3, _pid: 2, _id: 3 }] },
          { value: 4, _pid: 1, _id: 4 }
        ]
      }
    ]
    const filteredTree = filter(tree, (node) => node.value >= 2, {
      id: '_id',
      pid: '_pid',
      children: '_children'
    })
    expect(filteredTree).toEqual([
      {
        value: 1,
        _id: 1,
        _children: [
          { value: 2, _pid: 1, _id: 2, _children: [{ value: 3, _pid: 2, _id: 3 }] },
          { value: 4, _pid: 1, _id: 4 }
        ]
      }
    ])
  })
})

describe('forEach', () => {
  it('should iterate over the tree correctly', () => {
    const tree = [
      {
        value: 1,
        id: 1,
        children: [{ value: 2, pid: 1, id: 2, children: [{ value: 3, pid: 2, id: 3 }] }]
      }
    ]
    const values: any[] = []
    forEach(tree, (node) => {
      values.push(node.value)
    })
    expect(values).toEqual([1, 2, 3])
  })

  it('should stop iteration when the function returns true', () => {
    const tree = [
      {
        value: 1,
        id: 1,
        children: [{ value: 2, pid: 1, id: 2, children: [{ value: 3, pid: 2, id: 3 }] }]
      }
    ]
    const values: any[] = []
    forEach(tree, (node) => {
      values.push(node.value)
      return node.value === 2
    })
    expect(values).toEqual([1, 2])
  })

  it('should handle custom config correctly', () => {
    const tree = [
      {
        value: 1,
        _id: 1,
        _children: [{ value: 2, _pid: 1, _id: 2, _children: [{ value: 3, _pid: 2, _id: 3 }] }]
      }
    ]
    const values: any[] = []
    forEach(
      tree,
      (node) => {
        values.push(node.value)
      },
      { id: '_id', pid: '_pid', children: '_children' }
    )
    expect(values).toEqual([1, 2, 3])
  })
})

describe('treeMap', () => {
  it('should map the tree correctly', () => {
    const tree = [
      {
        value: 1,
        id: 1,
        children: [{ value: 2, pid: 1, id: 2, children: [{ value: 3, pid: 2, id: 3 }] }]
      }
    ]
    const mappedTree = treeMap(tree, {
      conversion: (node) => {
        return { ...node, value: node.value * 2 }
      }
    })
    expect(mappedTree).toEqual([
      {
        value: 2,
        id: 1,
        children: [{ value: 4, pid: 1, id: 2, children: [{ value: 6, pid: 2, id: 3 }] }]
      }
    ])
  })

  it('should handle custom config correctly', () => {
    const tree = [
      {
        value: 1,
        _id: 1,
        _children: [{ value: 2, _pid: 1, _id: 2, _children: [{ value: 3, _pid: 2, _id: 3 }] }]
      }
    ]
    const mappedTree = treeMap(tree, {
      children: '_children',
      conversion: (node) => {
        return { ...node, value: node.value * 2 }
      }
    })
    expect(mappedTree).toEqual([
      {
        value: 2,
        _id: 1,
        _children: [{ value: 4, _pid: 1, _id: 2, _children: [{ value: 6, _pid: 2, _id: 3 }] }]
      }
    ])
  })
})

describe('eachTree', () => {
  it('should iterate over the tree correctly', () => {
    const tree = [
      {
        value: 1,
        id: 1,
        children: [{ value: 2, pid: 1, id: 2, children: [{ value: 3, pid: 2, id: 3 }] }]
      }
    ]
    const values: any[] = []
    eachTree(tree, (node) => {
      values.push(node.value)
    })
    expect(values).toEqual([1, 2, 3])
  })

  it('should handle parent node correctly', () => {
    const tree = [
      {
        value: 1,
        id: 1,
        children: [{ value: 2, pid: 1, id: 2, children: [{ value: 3, pid: 2, id: 3 }] }]
      }
    ]
    const parentValues: any[] = []
    eachTree(tree, (node, parent) => {
      parentValues.push(parent.value)
    })
    expect(parentValues).toEqual([undefined, 1, 2])
  })
})
