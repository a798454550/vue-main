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
      default: '一个Vue搭建的移动云应用。'
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
      message: "请选择组件库（建议使用Vux）",
      default: 0,
      choices: [{
        "name": "Vux",
        "value": "vux",
        "short": "活跃度高"
      }, {
        "name": "mint-ui",
        "value": "mint-ui",
        "short": "饿了么前端团队"
      }, {
        "name": "都不使用",
        "value": "none"
      }]
    },
    authentication: {
      type: 'confirm',
      message: '是否需要初始化用户登录鉴权模块?',
      default: false
    },
    registerRouters: {
      type: 'confirm',
      message: '是否需要路由动态注册模块?',
      default: false
    },
    lint: {
      type: 'confirm',
      message: '是否使用ESLint规范您的代码?',
      default: false
    },
    autobuild: {
      type: 'boolean',
      message: '自动安装依赖并运行测试',
      default: false
    }
  },
  complete: (data, helpers) => {
    const { chalk } = helpers;
    const runCommand = (cmd, args, options) => {
      return new Promise((resolve, reject) => {
        const spwan = spawn(
          cmd,
          args,
          Object.assign({
            cwd: process.cwd(),
            stdio: 'inherit',
            shell: true,
          },
            options
          )
        )
        spwan.on('exit', () => {
          resolve()
        })
      })
    };
    const msg = '   常用命令：\n\n   安装依赖：npm install\n      代码规范检测：npm run lint\n   自动修复代码规范问题：npm run fix\n   启动本地服务器：npm run dev\n   生成环境编译：npm run build:dll && npm run build'

    if(!data.authentication){
      fs.unlinkSync(path.join(data.destDirName, 'src', 'router','authentication.js'));
      fs.unlinkSync(path.join(data.destDirName, 'src', 'pages','Login.vue'));
    }

    if (!data.autobuild) {
      console.log('初始化完成！\n   cd ' + data.destDirName + '\n  npm install\n npm run build\n npm run dev')
      return;
    }

    console.log(chalk.yellow('Message:'), '开始安装依赖，安装过程大概需要4~5分钟，请耐心等候...')
    const cwd = { cwd: `${data.name}` }

    runCommand('npm', ['install'], cwd)
      .then(() => {
        console.log('\n   依赖安装完成！')
        console.log('\n   开始生成静态库...')
        runCommand('npm', ['run', 'build:dll'], cwd).then(() => {
          console.log('\n   静态库生成！');
          console.log('\n   开始启动...');
          runCommand('npm', ['run', 'dev'], cwd)
          console.log(msg)
        });
      })
  }
}
