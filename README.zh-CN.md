# tool-helper

[![license](https://img.shields.io/github/license/kailong321200875/tool-helper.svg)](LICENSE)

[English](./README.md) | **中文**

## 介绍

收集整理常用的工具函数，方便统一维护管理。同时也可以当做一个学习 `rollup + typescript` 的途径。

欢迎大家贡献代码~

## 文档

[文档地址 Github](https://kailong321200875.github.io/tool-helper/modules.html)

[文档地址 Gitee](https://kailong110120130.gitee.io/tool-helper/modules.html)

## 安装

### npm

```shell
npm i tool-helper -S
```

### pnpm

```shell
pnpm i tool-helper -S
```

### yarn

```shell
yarn add tool-helper
```

## 使用

### ESM

```ts
import { isNumber } from 'tool-helper'

isNumber('test')
```

### cjs

```js
const tools = require('tool-helper')

tools.isNumber('test')
```

## 浏览器支持

支持现代浏览器及IE11，11以下的未测试。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :-: | :-: | :-: | :-: | :-: |
| support IE11 | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## 如何贡献

你可以 [提一个 issue](https://github.com/kailong321200875/tool-helper/issues/new) 或者提交一个 Pull Request。

**Pull Request:**

1. Fork 代码
2. 创建自己的分支: `git checkout -b feat/xxxx`
3. 提交你的修改: `git commit -am 'feat: add xxxxx'`
4. 推送您的分支: `git push origin feat/xxxx`
5. 提交 `pull request`

## Git 贡献提交规范

- `feat` 新功能
- `fix` 修补 bug
- `style` 格式、样式(不影响代码运行的变动)
- `refactor` 重构(即不是新增功能，也不是修改 BUG 的代码)
- `perf` 优化相关，比如提升性能、体验
- `test` 添加测试
- `chore` 构建过程或辅助工具的变动
- `workflow` 工作流改进
- `types` 类型

## 开源协议

[MIT](./LICENSE)
