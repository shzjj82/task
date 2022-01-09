<template>
  <div class="taskRow-create">
    <div class="taskRow-create-line" :style="groupTheme('background')"></div>
    <div class="taskRow-create-content">
      <el-input
        v-model="value"
        :placeholder="placeholder"
        @focus="toggleVisible"
        @blur="handleCreate"
        @keyup.enter.native="handleCreate"
      />
      <transition name="move">
        <el-button
          v-show="visible"
          type="primary"
          class="taskRow-create-button"
          @click="handleCreate"
          >Add</el-button
        >
      </transition>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import * as TYPES from "@/store/task/mutationTypes";
import group from "@/mixins/group";
import { get, isEmpty } from "lodash";
import { Conditions } from "@/interface";
export default Vue.extend({
  name: "createRow",
  props: {
    groupInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  mixins: [group],
  data() {
    return {
      value: "",
      visible: false,
    };
  },
  computed: {
    placeholder(): string {
      return `+ Add Row`;
    },
    displayType(): string {
      return this.getConfigurations("displayType");
    },
    getConfigurations() {
      const configurations = this.$store.getters["task/configurations"];
      return (key: string) => get(configurations, key);
    },
  },
  methods: {
    initValue() {
      this.value = "";
    },
    toggleVisible() {
      this.$nextTick(() => (this.visible = !this.visible));
    },
    handleCreate() {
      if (!isEmpty(this.value.trim())) {
        if (this.displayType === Conditions.DisplayTypes.Group) {
          this.$store.commit(`task/${TYPES.ADD_TASK}`, {
            title: this.value,
            groupId: this.groupInfo.id,
          });
        }
        if (this.displayType === Conditions.DisplayTypes.List) {
          this.$store.commit(`task/${TYPES.ADD_TASK}`, { title: this.value });
        }
      }
      this.initValue();
      this.toggleVisible();
    },
  },
});
</script>
<style lang="less" scoped>
@deep:~ ">>>";
.taskRow-create {
  display: flex;
  align-items: center;
  background: #f5f6f8;

  .taskRow-create-line {
    width: 8px;
    min-height: 34px;
  }
  .taskRow-create-content {
    display: flex;
    flex-grow: 1;
    overflow: hidden;
    .taskRow-create-button {
      height: 34px;
      line-height: 34px;
      padding: 0 12px;
      border-radius: 0;
    }
    @{deep} .el-input__inner {
      padding-left: 10px;
      border: 0;
      background: transparent;
      height: 34px;
      line-height: 34px;
    }
  }
}
.move-enter-active,
.move-leave-active {
  transition: all 0.5s;
}
.move-enter, .move-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(100%);
}
</style>
