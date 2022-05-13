# tool-helper

[![license](https://img.shields.io/github/license/kailong321200875/tool-helper.svg)](LICENSE)

**English** | [中文](./README.zh-CN.md)

## Introduction

Collect and organize commonly used tool functions to facilitate unified maintenance and management. It can also be used as a way to learn `rollup + typescript`.

Welcome everyone to contribute code~

## Documentation

[Documentation Github](https://kailong321200875.github.io/tool-helper/modules.html)

[Documentation Gitee](https://kailong110120130.gitee.io/tool-helper/modules.html)

## Install

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

## Use

### ESM

```ts
import { isNumber } from 'tool-helper'

isNumber('test')
```

### CJS

```js
const tools = require('tool-helper')

tools.isNumber('test')
```

## Browser support

Support modern browsers and IE11, untested below 11.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :-: | :-: | :-: | :-: | :-: |
| support IE11 | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## How to contribute

You can [Raise an issue](https://github.com/kailong321200875/vue-element-plus-admin/issues/new) Or submit a Pull Request.

**Pull Request:**

1. Fork code
2. Create your own branch: `git checkout -b feat/xxxx`
3. Submit your changes: `git commit -am 'feat: add xxxxx'`
4. Push your branch: `git push origin feat/xxxx`
5. submit `pull request`

## Git Contribution submission specification

- `feat` New features
- `fix` Fix bugs
- `style` Format and style (changes that do not affect code operation)
- `refactor` Refactor
- `perf` Optimize related, such as improving performance and experience
- `test` Add test
- `chore` Changes in the construction process or auxiliary tools
- `workflow` Workflow improvement
- `types` type

## License

[MIT](./LICENSE)
