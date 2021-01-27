export interface DetailInfo {
  title: string;
  detail: string;
}

export type PromiseDetailInfo = Promise<{
  title: string;
  detail: string;
}>;
