import { EXCLUDE_PACKAGES } from '../config/index.mjs'
import fs from 'fs'
import { execa } from 'execa'

const TARGET = process.env.TARGET

const allTargets = TARGET
  ? [TARGET]
  : fs.readdirSync('packages').filter(async (f) => {
      if (EXCLUDE_PACKAGES.includes(f)) {
        return false
      }
      // 过滤掉非目录文件
      if (!fs.statSync(`packages/${f}`).isDirectory()) {
        return false
      }
      const pkg = await fs.promises.readFile('package.json', 'utf-8')
      // 过滤掉私有包
      if (pkg.private) {
        return false
      }
      return true
    })

const build = async (target) => {
  await execa('rollup', ['-c', '--environment', `TARGET:${target}`], {
    stdio: 'inherit'
  })
}

const buildAll = async () => {
  for (const target of allTargets) {
    await build(target)
  }
}
buildAll()
