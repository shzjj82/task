import {
  DisplayTypes,
  IAction,
  IStoreConfigurations,
} from "@/interface/Conditions";
import { IGroup, ITask } from "@/interface/Task";
const state = {
  configurations: {
    columns: [
      {
        label: "任务名称",
        code: "title",
        textalign: "left",
      },
      { width: 180, label: "时间进度", code: "timeLine", textalign: "center" },
      {
        width: 200,
        label: "任务进度",
        code: "processLine",
        textalign: "center",
        defaultValue: 0,
      },
      {
        width: 140,
        label: "状态",
        code: "status",
        textalign: "center",
      },
    ],
    displayType: DisplayTypes.Group,
  },
  tasks: [
    {
      id: 1,
      groupId: 1,
      processLine: 10,
    },
    {
      id: 2,
      groupId: 1,
      processLine: 10,
    },
  ],
  actions: [],
  group: [
    {
      id: 0,
      name: "Get started with the basics",
      color: "#ff1582",
    },
    {
      id: 1,
      name: "Get started with the basics",
      color: "#7f5347",
    },
    {
      id: 2,
      name: "Get started with the basics",
      color: "#579BFC",
    },
    {
      id: 3,
      name: "Get started with the basics",
      color: "#333333",
    },
  ],
};

export type StateType = {
  configurations: IStoreConfigurations;
  tasks: ITask[];
  group: IGroup[];
  actions: IAction[];
};

export default state;
