import Vue from "vue";

/**
 * 动态请求外部的js脚本，请求结束后返回js的模块 
 *  使用示例如下：
 *      dynamicRequirejs(‘./rain.js’).then(module=>{
 *        console.log(module)
 *      })
 * @param {string} url 如‘./rain.js’
 */
let dynamicRequirejs = url => {
  return new Promise(resolve => {
    requirejs([url], result => {
      resolve(result);
    });
  });
};
/**
 * 动态获取外部打包的umd格式的vue组件。外部打包是指不引入当前脚手架进行打包的vue组件。
 *  使用示例如下：
 *      dynamicsExternalComponent(‘./rain.js’).then(vueComponent=>{
 *        Vue.component('rain',vueComponent)
 *      })
 * @param {string} url 如‘./rain.js’
 */
let dynamicsExternalComponent = async url => {
  let Module = await dynamicRequirejs(url);
  return Vue.extend(Module.default);
};

export {
  dynamicRequirejs,
  dynamicsExternalComponent
}
