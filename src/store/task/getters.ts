import { StateType } from "./state";
import { DisplayTypes, IAction } from "@/interface/Conditions/index";
import { isEqual, get, groupBy } from "lodash";

export const tasks = (state: StateType) => state.tasks;

export const configurations = (state: StateType) => state.configurations;

export const group = (state: StateType) => state.group;

export const normalzieList = (
  state: StateType,
  getters: { configurations: { displayType: any } }
) => {
  const displayType = getters.configurations.displayType;
  const tasks = state.tasks;
  // 分组
  if (isEqual(displayType, DisplayTypes.Group)) {
    const taskMap = groupBy(tasks, "groupId");
    return state.group.map((groupItem) => {
      const { id } = groupItem;
      return { ...groupItem, children: get(taskMap, id, []) };
    });
  }
  // 列表
  if (isEqual(displayType, DisplayTypes.List)) {
    return state.tasks;
  }
};

export const normalizeAction2Do = (state: StateType) => {
  const actions = state.actions;
  return (name: string, cb: (action: IAction) => boolean) => {
    const action = actions.find((ActionItem) => isEqual(ActionItem.name, name));
    if(!action) return false;
    return cb(action);
  };
};
