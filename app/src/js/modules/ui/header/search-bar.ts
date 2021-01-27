// 加载各模块
import { backendDB as db } from '../../database/db-interface';

// 搜索栏模块
class SearchBar {
  private searchBox;
  private addBtn;
  private input;

  constructor() {
    this.searchBox = document.querySelector('.site-header__search-box__content') as HTMLDivElement;
    this.addBtn = document.querySelector('.icon__add') as SVGElement;
    this.input = document.querySelector('.site-header__search-box__input') as HTMLInputElement;
  }

  // 开启查找任务功能
  openSearchTask = (e: Event) => {
    const target = e.target as SVGElement;

    if (target.classList.contains('icon__search')) {
      this.activeUI(target);
      this.input.focus();
      this.input.value = '';

      if (!this.input.classList.contains('act-color')) {
        db.searchByTaskType(this.typeValue);
      }
    }
  };

  activeUI(target: SVGElement) {
    target.classList.toggle('act-color');
    this.input.classList.toggle('act-color');
    this.searchBox.classList.toggle('act-color');
  }

  // 查找任务功能
  searchTask(e: KeyboardEvent) {
    const target = e.target as HTMLInputElement;
    if (target.classList.contains('act-color')) {
      db.renderBySearch(target.value);
    }
  }

  // 添加任务功能
  addTask1 = () => {
    if (!this.input.value) {
      return;
    } else {
      db.addTask();
      db.searchByTaskType(this.typeValue);
      this.input.value = '';
    }
  };

  // 按回车键添加任务功能
  addTask2 = (e: KeyboardEvent) => {
    const target = e.target as HTMLInputElement;

    // 焦点在搜索栏并按回车
    if (target.value) {
      if (e.key == 'Enter' && target.tagName.toUpperCase() === 'INPUT') {
        db.addTask();
        db.searchByTaskType(this.typeValue);
        this.input.value = '';
      }
    }
  };

  get typeValue() {
    const currentTaskTypeElement = document.querySelector('.sidebar__act') as HTMLLIElement;
    return currentTaskTypeElement.getAttribute('taskType') as string;
  }
}

const searchBar = new SearchBar();
export default searchBar;
