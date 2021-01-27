import { ITask } from '../interfaces/ITask';

export interface IDatabase {
  insert(task: ITask): void;
  searchByTaskType(value: string): Promise<unknown>;
  searchByTaskLevel(value: string): Promise<unknown>;
  searchAll(): Promise<unknown>;
  modifyTask(idNum: string, attr: string, value: string): void;
  searchDetail(id: string): Promise<unknown>;
  deleteAllTasks(): void;
}
