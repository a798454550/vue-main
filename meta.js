const fs = require('fs');
const path = require('path');
const { exec, spawn } = require('child_process');

module.exports = {
  helpers: {
    if_or(v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this)
      }
      return options.inverse(this)
    },
    if_equal(v1, v2, options) {
      if (v1 === v2) {
        return options.fn(this)
      }
      return options.inverse(this)
    },
    if_notequal(v1, v2, options) {
      if (v1 !== v2) {
        return options.fn(this)
      }
      return options.inverse(this)
    },
    authorFullNameFrom: function (author) {
      const startPosition = author.indexOf('<')
      return author.slice(0, startPosition - 1)
    },
    authorEmailFrom: function (author) {
      const startPosition = author.indexOf('<')
      const endPosition = author.indexOf('>')
      return author.slice(startPosition + 1, endPosition)
    },
    if_or_less: function (css, uiLibrary, options) {
        if (css === 'less' || uiLibrary === 'vux') {
            return options.fn(this);
        }
        return options.inverse(this);
    }
  },
  prompts: {
    name: {
      type: 'string',
      required: true,
      message: '项目名称'
    },
    description: {
      type: 'string',
      required: false,
      message: '项目简要概述',
      default: 'Vue主模块。'
    },
    version: {
      type: 'string',
      required: false,
      message: '版本号',
      default: '0.1.0'
    },
    author: {
      type: 'string',
      message: '作者'
    },
    uiLibrary: {
      type: "list",
      message: "请选择UI库",
      default: 0,
      choices: [{
        "name": "Vux",
        "value": "vux",
        "short": "Vux,一款基于移动端的UI框架"
      }, {
        "name": "mint-ui",
        "value": "mint-ui",
        "short": "饿了么前端团队"
      }, {
        "name": "都不使用",
        "value": "none"
      }]
    },
    ajax: {
        type: 'confirm',
        message: '是否注入$ajax对象(内部使用)?',
        default: false
    },
    lint: {
      type: 'confirm',
      message: '是否使用ESLint规范您的代码?',
      default: false
    }
  },
  complete: (data, helpers) => {
    const msg = '   常用命令：\n\n   安装依赖：npm install\n      代码规范检测：npm run lint\n   自动修复代码规范问题：npm run fix\n   启动本地服务器：npm run dev\n   生成环境编译：npm run build:dll && npm run build'
    console.log(msg);
  }
};
