<template>
  <div class="taskRow">
    <!-- <div class="taskRow-line" :style="groupTheme('background')"></div> -->
    <CheckBoxComponent
      :task="task"
      :group-info="groupInfo"
      :selecteds="selecteds"
      @change="$emit('update:selecteds', $event)"
    ></CheckBoxComponent>
    <div
      v-for="column in columns"
      :key="column.code"
      class="taskRow-item"
      :style="normalzieStyle(column)"
    >
      <!-- 标题输入 -->
      <InputComponent
        v-if="factoryComponent(column.code, 'title')"
        :group-info="groupInfo"
        :task="task"
        v-bind="{
          [column.code]: task[column.code],
        }"
        @remove="$emit('remove', task)"
        @change="$emit('change', { ...task, [column.code]: $event })"
      />
      <!-- 时间进度管理 -->
      <TimeLine
        v-if="factoryComponent(column.code, 'timeLine')"
        :startTime="task.startTime"
        :endTime="task.endTime"
        :group-info="groupInfo"
        @change="$emit('change', { ...task, ...$event })"
      />
      <!-- 流程进度管理 -->
      <ProcessLine
        v-if="factoryComponent(column.code, 'processLine')"
        @change="$emit('change', { ...task, [column.code]: $event })"
        :group-info="groupInfo"
        v-bind="{
          [column.code]: task[column.code],
        }"
      />
      <!-- 状态管理 -->
      <Status
        v-if="factoryComponent(column.code, 'status')"
        :column="column"
        :task="task"
        :group-info="groupInfo"
        :value="task[column.code]"
        v-bind="{
          [column.code]: task[column.code],
        }"
        @change="$emit('change', { ...task, [column.code]: $event })"
      />
    </div>
    <div class="taskRow-line" :style="groupTheme('background')"></div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import TimeLine from "@/components/TimeLine/index.vue";
import ProcessLine from "@/components/Process/index.vue";
import Status from "@/components/Status/index.vue";
import InputComponent from "@/components/Input/index.vue";
import CheckBoxComponent from "@/components/CheckBox/index.vue";
import group from "@/mixins/group";
import { isEqual } from "lodash";
import { IColumn } from "@/interface/Task";
export default Vue.extend({
  name: "taskRow",
  components: {
    TimeLine,
    ProcessLine,
    Status,
    InputComponent,
    CheckBoxComponent,
  },
  mixins: [group],
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    task: {
      required: true,
      type: Object,
    },
    groupInfo: {
      default: () => ({}),
      type: Object,
    },
    selecteds: {
      default: () => [],
      type: Array,
    },
  },
  computed: {
    factoryComponent(): (name: string, code: string) => boolean {
      return (name, code) => isEqual(name, code);
    },
    normalzieStyle(): (column: IColumn) => any {
      return (column: IColumn) => {
        const { width } = column;
        return Object.assign({}, width ? { width: `${width}px` } : { flex: 1 });
      };
    },
  },
  methods: {
    handleChange(): void {
      console.log("handleChange");
    },
  },
});
</script>
<style lang="less" scoped>
.taskRow {
  display: flex;
  align-items: center;
  .taskRow-line {
    width: 8px;
    min-height: 34px;
  }
  .taskRow-item {
    display: flex;
    align-items: center;
    background: #f5f6f8;
    margin-right: 1px;
    min-height: 34px;
    box-sizing: border-box;
    &:last-of-type {
      margin-right: 0;
    }
  }
}
</style>
