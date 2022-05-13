## 介绍

收集整理常用的工具函数，方便统一维护管理。同时也可以当做一个学习 `rollup + typescript` 的途径。

欢迎大家贡献代码~

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

### CJS

```js
const tools = require('tool-helper')

tools.isNumber('test')
```

## 浏览器支持

支持现代浏览器及IE11，11以下的未测试。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :-: | :-: | :-: | :-: | :-: |
| support IE11 | last 2 versions | last 2 versions | last 2 versions | last 2 versions |
