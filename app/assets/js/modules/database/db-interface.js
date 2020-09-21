// 加载数据库模块
import 'babel-polyfill';
import {userDB, visitorDB} from '../database/pouchDB';
import pubsub from '../utils/pubsub';

let db;
// 初始数据库选择：用户数据库或游客数据库
if (localStorage.getItem('DB-name') && localStorage.getItem('CouchDB-auth')) {
  db = userDB;
} else {
  db = visitorDB;
}

function useUserDB() {
  db = userDB;
}

function useVisitorDB() {
  db = visitorDB;
  db.deleteAllTasks();
}

// 定义接口
const backendDB = {
  db,
  // 添加任务
  addTask() {
    db.addTask();
  },

  // 添加随机
  addRandomTask() {
    db.addRandomTask();
  },

  // 按任务类型分类
  async renderByTaskType(value) {
    const taskArr = await db.renderByTaskType(value);
    pubsub.emit('renderByTaskType', taskArr);
  },

  // 按任务类型分类
  async renderByTaskLevel(value) {
    const taskArr = await db.renderByTaskLevel(value);
    pubsub.emit('renderByTaskType', taskArr);
  },

  // 搜索任务
  async renderBySearch(input) {
    const result = await db.renderBySearch();
    pubsub.emit('renderByLevel', {input, result});
  },

  // 修改任务
  modifyTask(idNum, attr, value) {
    db.modifyTask(idNum, attr, value);
  },

  // 展示任务详情
  async showDetail(idNum) {
    const detail = await db.showDetail(idNum);
    pubsub.emit('showDetail', detail);
  },

  // 删除全部任务
  deleteAllTasks() {
    db.deleteAllTasks();
    pubsub.emit('deleteAllTasks');
  },
};

export {backendDB, useUserDB, useVisitorDB};
