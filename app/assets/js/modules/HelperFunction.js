// 定义 helper 函数
var helperFunction = (function() {
  // 引入模块
  var headModule = require("./HeaderModule");

  // sideHeader 区域
  // 获取页面头部 input 引用
  var get_input = function() {
    return document.querySelector(".site-header__search-box__input");
  };

  // 获取页面头部 level 图标引用
  var get_level = function() {
    return document.querySelector(".icon__level");
  };

  // 搜索激活状态时给搜索栏上色
  var inActColor = function(ele) {
    return ele.classList.toggle("act-color");
  }

  // 任务等级小圆点颜色、属性的切换
  var toggleLevel = function(level1, level2, attr, value) {
    get_level().classList.remove(level1);
    get_level().classList.add(level2);
    get_level().setAttribute(attr, value);
  }

  return {
    get_input,
    get_level,
    inActColor,
    toggleLevel
  };
})();

module.exports = helperFunction;