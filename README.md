# cloudapp-fe-template

> 基于vue-cli初始化的vue项目脚手架（集成了动态路由生成、模块配置注入等功能），使用webpack来编译及测试环境搭建

> Share Vue components!

一个非常简单的[vue-cli]（https://github.com/vuejs/vue-cli）模板，可以用`.vue`组件编写和发布vue插件。


### 功能

1. 动态路由生成
2. 基础布局
3. 模块配置注入机制

## 用法

```
npm i -g vue-cli
vue init WTMR/istrong-ca-fe-template project-name
```
project-name 为你的组件名称。

### 可视化分析构建结果

``` bash
npm run report
```
方便你分析最终的构建结果，有助于你进一步地优化构建结果。

## 开发

### 安装

首次创建或克隆组件时，需要安装默认的依赖项，这里根据你自己组件的需求去修改package.json中的依赖性，然后install

```
npm install
```

### 编译

编译运行build

```
npm run build
```

### 测试

- 如果你要修改你的测试服务端口，可以修改build/devConfig.js文件。
- 如果你需要修改入口文件，可以修改build/webpack.dev.conf.js文件中的entry。

测试运行dev

```
npm run dev
```

### 常用命令

* 安装依赖：npm install
* 启动本地服务器：npm run dev
* 代码规范检测：npm run lint
* 自动修复代码规范问题：npm run fix
* 发布成npm包：npm publish
