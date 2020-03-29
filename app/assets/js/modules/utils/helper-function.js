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

  // 任务等级小圆点颜色、属性的切换
  toggleLevel(level1, level2, value) {
    helperFunction.get_level_element().classList.remove(level1);
    helperFunction.get_level_element().classList.add(level2);
    helperFunction.get_level_element().setAttribute('level', value);
    helperFunction.get_input_element().focus();
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
