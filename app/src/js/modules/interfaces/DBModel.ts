export interface DBModel {
  db: PouchDB.Database;

  addTask(): void;
  addRandomTask(): void;
  sortByTaskType(value: string): Promise<PouchDB.Core.ExistingDocument<Record<never, never>>[]>;
  renderByTaskLevel(value: string): Promise<PouchDB.Core.ExistingDocument<Record<never, never>>[]>;
  renderByCurrentTask(): void;
  renderBySearch(): Promise<PouchDB.Core.AllDocsResponse<Record<never, never>>>;
  modifyTask(idNum: string, attr: string, value: string): void;
  showDetail(
    id: string,
  ): Promise<{
    title: string;
    detail: string;
  }>;
  deleteAllTasks(): void;
}
