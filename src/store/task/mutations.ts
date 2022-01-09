import * as TYPES from "./mutationTypes";
import { StateType } from "./state";
import vm from "vue";
import { get, isEqual, isNil } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { IAction } from "@/interface/Conditions";
export default {
  [TYPES.SET_TASK](state: StateType, payload: []) {
    state.tasks = payload;
  },
  [TYPES.ADD_TASK](state: StateType, payload: any) {
    const columns = get(state.configurations, "columns", []);
    const defaultTask = {};
    for (const column of columns) {
      const { defaultValue, code } = column;
      if (!isNil(defaultValue)) {
        vm.set(defaultTask, code, defaultValue);
      }
    }
    state.tasks.push({ ...defaultTask, ...payload, id: uuidv4() });
  },
  [TYPES.CHANGE_TASK](state: StateType, payload: any) {
    state.tasks.forEach((task) => {
      if (task.id === payload.id) {
        for (const key of Object.keys(payload.task)) {
          vm.set(task, key, get(payload.task, key));
        }
      }
    });
  },
  [TYPES.SET_ACTION](state: StateType, action: IAction) {
    const actions = state.actions;
    const { name } = action;
    const current = actions.find((actionItem: IAction) =>
      isEqual(actionItem.name, name)
    );
    if (!current) {
      state.actions.push(action);
    } else {
      for (const [key, value] of Object.entries(action)) {
        vm.set(current, key, value);
      }
    }
  },
};
