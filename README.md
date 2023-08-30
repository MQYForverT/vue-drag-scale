# vue-drag-scale

[![npm](https://img.shields.io/npm/v/vue-drag-scale.svg) ![npm](https://img.shields.io/npm/dt/vue-drag-scale.svg)](https://www.npmjs.com/package/vue-drag-scale)
[![vue3](https://img.shields.io/badge/vue-3.x-brightgreen.svg)](https://cn.vuejs.org/)

Vue3 component that simulates a user typing, selecting, and erasing text.

Checkout the offical project [here](https://github.com/MQYForverT/vue-drag-scale).

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Example](#examples)

## 效果

![](https://oss-cdn.mashibing.com/default/e9d7de7eb48e7ebacfa9f4c4a6f9fa9b.gif)

# Installation

```
npm install --save vue-drag-scale
```

## Global import

Install the component:

```js
import { createApp } from 'vue' 
import vueDragScale from "vue-drag-scale";
import "vue-drag-scale/dist/style.css"; 
import App from './App.vue' 

const app = createApp(App) 
app.use(vueDragScale) 
app.mount('#app')
```

## Manual import

```html
<template>
  <div>
    <vueDragScale>
      <div class="course-view"></div>
    </vueDragScale>
  </div>
</template>

<script setup lang="ts">
import { vueDragScale } from "vue-drag-scale";
import "vue-drag-scale/dist/style.css";
</script>

<style scoped>
.course-view {
  height: 300px;
  width: 300px;
  background: red;
}
</style>
```

## Properties

你可以使用以下属性:

| 参数      | 类型         | 默认值 | 说明              |
| ------------- | ------------ | --------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| dragCode          | String |  Space       | 当按下约定拖拽键时，允许移动操作（自定义code请到[https://juejin.cn/post/7029319401178398728](#https://juejin.cn/post/7029319401178398728)查询） |
| scaleCode    | String       | Space      | 当按下约定缩放键时，允许缩放操作（自定义code请到[https://juejin.cn/post/7029319401178398728](#https://juejin.cn/post/7029319401178398728)查询）                                         |
| scalePercentage     | Number       | 0.05      | 每次缩放比例     |
| minScalePercentage | Number       | 0.1     | 最小缩放比例                                        |
| allowNativeScale    | Boolean       | false     | 是否允许原生缩放事件,比如ctrl + ,ctrl -                            |

## Slots

你能使用以下插槽:

| 插槽名称   | 说明 |
| ------ | ----------- |
| default| 内容    |

## Features

暂时没有，欢迎来访

---

# License

[MIT](http://opensource.org/licenses/MIT)
