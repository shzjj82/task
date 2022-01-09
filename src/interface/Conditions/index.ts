export enum IRelationshipTypes {
  And = 0,
  Or = 1,
}

export interface IRelationship {
  label: string;
  value: IRelationshipTypes;
}

export interface IColumnItems {
  label: string;
  value: string;
}

export interface IConditionItems {
  label: string;
  value: string;
}

export interface ICondition {
  relationship: IRelationshipTypes;
  column: string;
  condition: string;
  value: string;
}

export interface IStatus{
    theme:string;
    code:StatusTypes;
    label:string;
}

export interface IAction {
  name:string;
  id?:number;
  groupId?:number;
}

export enum StatusTypes {
    Stateless = 0,
    Delay = 1,
    Risk = 2,
    Normal = 3
}

export enum IColumnTypes {
  Relationship = "relationship",
  Column = "column",
  Condition = "condition",
  Value = "value",
}

export enum DisplayTypes {
    List = 'List',
    Group = 'Group',
}

export interface IStoreConfigurations {
  columns:IStoreColumn[];
  displayType:string;
}

export interface IStoreColumn{
  width: number;
  label: string;
  code: string;
  textalign: string;
  defaultValue: number,
}