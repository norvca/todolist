// 加载数据库模块
import 'babel-polyfill';
import { userDB, visitorDB } from '../database/pouchDB';
import pubsub from '../utils/pubsub';
import { DBModel } from '../interfaces/DBModel';

let db: DBModel;
// 初始数据库选择：用户数据库或游客数据库
if (localStorage.getItem('DB-name') && localStorage.getItem('CouchDB-auth')) {
  db = userDB;
} else {
  db = visitorDB;
}

function useUserDB(): void {
  db = userDB;
}

function useVisitorDB(): void {
  db = visitorDB;
  db.deleteAllTasks();
}

// 定义接口
const backendDB = {
  db,
  // 添加任务
  addTask(): void {
    db.addTask();
  },

  // 添加随机
  addRandomTask(): void {
    db.addRandomTask();
  },

  // 按任务类型分类
  async sortByTaskType(value: string): Promise<void> {
    const taskArr = await db.sortByTaskType(value);
    pubsub.emit('renderByTaskType', taskArr);
  },

  // 按任务类型分类
  async renderByTaskLevel(value: string): Promise<void> {
    const taskArr = await db.renderByTaskLevel(value);
    pubsub.emit('renderByTaskLevel', taskArr);
  },

  // 搜索任务
  async renderBySearch(input: string): Promise<void> {
    const result = await db.renderBySearch();
    pubsub.emit('renderBySearch', { input, result });
  },

  // 修改任务
  modifyTask(idNum: string, attr: string, value: string): void {
    db.modifyTask(idNum, attr, value);
  },

  // 展示任务详情
  async showDetail(idNum: string): Promise<void> {
    const detail = await db.showDetail(idNum);
    pubsub.emit('showDetail', detail);
  },

  // 删除全部任务
  deleteAllTasks(): void {
    db.deleteAllTasks();
    pubsub.emit('deleteAllTasks');
  },
};

export { backendDB, useUserDB, useVisitorDB };
