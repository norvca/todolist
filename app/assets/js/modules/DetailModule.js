// 加载中间件模块
import {backendDB as db} from "./BackendDB";

// 定义右侧详情模块
const detailModule = {
  // 更新任务详情功能
  refreshDetail(){
    var focusTask = document.querySelector(".todolist__focus");
    var idNum = focusTask.getAttribute("idnum");
    var detailContent = this.value;
    var type = "detail";
    db.modifyTask(idNum, type, detailContent);
  }
};

export {detailModule};