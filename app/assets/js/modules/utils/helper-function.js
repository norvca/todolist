const syncState = document.querySelector('.todolist__sync-state');
const taskLists = document.querySelector('.todolist__tasks');
const detail = document.querySelector('.detail__paragraph');
const detailTitle = document.querySelector('.detail__title');

// 定义 helper 函数
const helperFunction = {
  // sideHeader 区域
  // 获取页面头部 input 引用
  get_input_element() {
    return document.querySelector('.site-header__search-box__input');
  },

  // 获取页面头部 level 图标引用
  get_level_element() {
    return document.querySelector('.icon__level');
  },

  // 搜索激活状态时给搜索栏上色
  inActColor(ele) {
    return ele.classList.toggle('act-color');
  },

  // 清空页面
  freshPage() {
    syncState.innerText = '';
    taskLists.innerText = '';
    detailTitle.innerText = '';
    detail.innerText = '';
  },
};

export default helperFunction;
