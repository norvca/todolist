// 加载数据库模块
import 'babel-polyfill';
import { loginUser, visitorUser } from './User';
import pubsub from '../utils/pubsub';
import { IUser } from '../interfaces/IUser';

let user: IUser;
// 初始数据库选择：用户数据库或游客数据库
if (localStorage.getItem('DB-name') && localStorage.getItem('CouchDB-auth')) {
  user = loginUser;
} else {
  user = visitorUser;
}

function useUserDB(): void {
  user = loginUser;
}

function useVisitorDB(): void {
  user = visitorUser;
  user.deleteAllTasks();
}

// 定义接口
const backendDB = {
  user,
  // 添加任务
  addTask(): void {
    user.addTask();
  },

  // 添加随机
  addRandomTask(): void {
    user.addRandomTask();
  },

  // 按任务类型分类
  async searchByTaskType(value: string): Promise<void> {
    const taskArr = await user.searchByTaskType(value);
    pubsub.emit('renderByTaskType', taskArr);
  },

  // 按任务类型分类
  async searchByTaskLevel(value: string): Promise<void> {
    const taskArr = await user.searchByTaskLevel(value);
    pubsub.emit('renderByTaskLevel', taskArr);
  },

  // 搜索任务
  async renderBySearch(input: string): Promise<void> {
    const result = await user.searchAll();
    pubsub.emit('renderBySearch', { input, result });
  },

  // 修改任务
  modifyTask(idNum: string, attr: string, value: string): void {
    user.modifyTask(idNum, attr, value);
  },

  // 展示任务详情
  async showDetail(idNum: string): Promise<void> {
    const detail = await user.searchDetail(idNum);
    pubsub.emit('showDetail', detail);
  },

  // 删除全部任务
  deleteAllTasks(): void {
    user.deleteAllTasks();
    pubsub.emit('deleteAllTasks');
  },
};

export { backendDB, useUserDB, useVisitorDB };
