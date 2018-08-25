// 加载各模块
import {helperFunction} from "../HelperFunction";
import {backendDB as db} from "../BackendDB";

// 搜索栏模块
class SearchBar {
  constructor() {
    this.searchBox = document.querySelector(".site-header__search-box__content");
    this.addBtn = document.querySelector(".icon__add");
    this.input = helperFunction.get_input_element();
    this.level = helperFunction.get_level_element();
    this.inActColor = helperFunction.inActColor;
    this.event();
  }

  // 初始化事件
  event() {
    this.searchBox.addEventListener("click", this.openSearchTask.bind(this));
    this.input.addEventListener("keyup", this.searchTask);
    this.input.addEventListener("keyup", this.addTask2.bind(this));
    this.addBtn.addEventListener("click", this.addTask1.bind(this));
  }

  // 开启查找任务功能
  openSearchTask(e) {
    // 获取左侧栏目对应事件类型
    const typeValue = document.querySelector(".sidebar__act").getAttribute("taskType");

    if(e.target.classList.contains("icon__search")) {
        this.inActColor(e.target);
        this.inActColor(this.input);
        this.inActColor(this.searchBox);
        this.input.focus();
        this.input.value = "";

        if(!this.input.classList.contains("act-color")) {
            db.showTask("taskType", typeValue);
        }
    }
  }

  // 查找任务功能
  searchTask(e){
      if( e.target.classList.contains("act-color") ){
          db.searchTask(this.value);
      }
  }

  // 添加任务功能
  addTask1(){
  // 获取左侧栏目对应事件类型
      const typeValue = document.querySelector(".sidebar__act").getAttribute("taskType");
      if( !this.input.value ){
          return;
      } else {
          db.addTask();
          db.showTask("taskType", typeValue);
          this.input.value = "";
      }
  }


  // 按回车键添加任务功能
  addTask2(event = window.event) {
      const key = event.which || event.keyCode || event.charCode;
      // 获取左侧栏目对应事件类型
      const typeValue = document.querySelector(".sidebar__act").getAttribute("taskType");

      // 焦点在搜索栏并按回车
      if(document.activeElement.value) {
          if (key == 13 && document.activeElement.tagName.toUpperCase() === "INPUT") {
              db.addTask();
              db.showTask("taskType", typeValue);
              this.input.value = "";
          }
      }
  }
}

export default SearchBar;