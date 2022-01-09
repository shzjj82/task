<template>
  <div class="task-views">
    <!-- 分组模式 -->
    <template v-if="factoryComponent(displayType, conditionsDisplayType.Group)">
      <TaskGroup
        v-for="item in normalzieList"
        :key="item.id"
        :group-info="item"
      >
        <div>
          <div class="task-columns">
            <TaskColumn
              v-for="column in columns"
              :key="column.code"
              :column="column"
            ></TaskColumn>
          </div>
          <div class="task-content">
            <template v-if="item.children.length">
              <TaskRow
                class="task-item"
                v-for="task in item.children"
                :key="task.id"
                :columns="columns"
                :task="task"
                @change="changeTask($event)"
                @remove="removeTask($event)"
                @mouseenter.native="handleAction('hover', { id: task.id })"
                @mouseleave.native="handleAction('hover', { id: '' })"
                :group-info="item"
                :selecteds.sync="selecteds"
              ></TaskRow>
            </template>

            <TaskCreate :group-info="item" />
          </div>
        </div>
      </TaskGroup>
    </template>
    <!-- 列表模式 -->
    <template v-if="factoryComponent(displayType, conditionsDisplayType.List)">
      <div class="task-columns">
        <TaskColumn
          v-for="column in columns"
          :key="column.code"
          :column="column"
        ></TaskColumn>
      </div>
      <div class="task-content">
        <TaskRow
          class="task-item"
          v-for="task in normalzieList"
          :key="task.id"
          :columns="columns"
          :task="task"
          @change="changeTask($event)"
        ></TaskRow>
        <TaskCreate />
      </div>
    </template>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import TaskRow from "@/components/Row/index.vue";
import TaskColumn from "@/components/Column/index.vue";
import TaskCreate from "@/components/Row/create.vue";
import TaskGroup from "@/components/Group/index.vue";
import * as TYPES from "@/store/task/mutationTypes";
import { Conditions } from "@/interface";
import { get, isEqual } from "lodash";
import { ITask } from "@/interface/Task";
export default Vue.extend({
  name: "task-views",
  components: { TaskRow, TaskColumn, TaskCreate, TaskGroup },
  data() {
    return {
      selecteds: [],
    };
  },
  computed: {
    normalzieList() {
      return this.$store.getters["task/normalzieList"];
    },
    tasks() {
      return this.$store.getters["task/tasks"];
    },
    displayType(): string {
      return this.getConfigurations("displayType");
    },
    getConfigurations() {
      const configurations = this.$store.getters["task/configurations"];
      return (key: string) => get(configurations, key);
    },
    columns(): unknown[] {
      return this.getConfigurations("columns");
    },
    conditionsDisplayType() {
      return Conditions.DisplayTypes;
    },
    factoryComponent(): (key: string, type: string) => boolean {
      return (key, type) => isEqual(key, type);
    },
  },
  methods: {
    changeTask(task: Record<string, unknown>) {
      const { id } = task;
      this.$store.commit(`task/${TYPES.CHANGE_TASK}`, { id, task });
    },
    removeTask(task: Record<string, unknown>) {
      const { id } = task;
      this.$store.commit(
        `task/${TYPES.SET_TASK}`,
        this.tasks.filter((taskItem: ITask) => !isEqual(taskItem.id, id))
      );
    },
    handleAction(name: string, task: ITask) {
      this.$store.commit(`task/${TYPES.SET_ACTION}`, { ...task, name });
    },
  },
});
</script>
<style lang="less" scoped>
.task-views {
  .task-columns {
    display: flex;
    align-items: center;
    margin-right: 8px;
  }
  .task-item {
    margin-bottom: 1px;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
}
</style>
