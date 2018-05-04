// 有疑问！

// 定义 helper 函数
var helperFunction = (function() {
  // 获取页面头部 input 引用
  var get_input = function() {
    return document.querySelector('.site-header__search-box__input');
  }

  // 获取页面头部 level 图标引用
  var get_level = function() {
    return document.querySelector('.icon__level');
  }

  return {
    get_input,
    get_level
  }
})();

module.exports = helperFunction;