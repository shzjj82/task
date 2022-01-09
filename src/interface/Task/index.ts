export type textalign = "center" | "right" | "left";

export interface IColumn {
  label: string;
  code: string;
  width?: number;
  textalign?: textalign;
}

export interface ITask {
  [propName: string]: unknown;
  groupId: number;
  id: number;
  title: string;
}

export interface IGroup{
  id: number;
  name:string;
  color:string;
}