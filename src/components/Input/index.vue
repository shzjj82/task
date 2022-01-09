<template>
  <div class="input-component">
    <el-input
      v-model="value"
      class="input-component__content"
      @change="handleChange"
    ></el-input>
    <div class="input-component__action">
      <i
        class="el-icon-delete-solid icon"
        @click="handleRemove"
        v-show="normalizeAction('hover', handleAction)"
      ></i>
    </div>
  </div>
</template>
<script lang="ts">
import { IAction } from "@/interface/Conditions";
import { isEqual } from "lodash";
import Vue from "vue";
enum EmitTypes {
  Change = "change",
  Remove = "remove",
}
export default Vue.extend({
  name: "input-component",
  props: {
    title: {
      type: String,
      default: "",
    },
    task:{
      default:()=>({}),
      type:Object
    }
  },
  computed: {
    normalizeAction(): (
      name: string,
      cb: (action: IAction) => boolean
    ) => boolean {
      return (name, cb) => {
        const normalizeAction2Do =
          this.$store.getters["task/normalizeAction2Do"];
        return normalizeAction2Do(name, cb);
      };
    },
  },
  data() {
    return {
      value: this.title,
    };
  },
  methods: {
    handleChange(value: string): void {
      this.$emit(EmitTypes.Change, value);
    },
    handleRemove(): void {
      this.$emit(EmitTypes.Remove);
    },
    handleAction(action: IAction): boolean {
      return isEqual(action.id, this.task.id);
    },
  },
});
</script>
<style lang="less" scoped>
@deep:~ ">>>";
.input-component {
  display: flex;
  flex-grow: 1;
  .input-component__content {
    @{deep} .el-input__inner {
      padding-left: 10px;
      border: 0;
      background: transparent;
      height: 34px;
      line-height: 34px;
    }
  }
  .input-component__action {
    padding: 0 10px;
    display: flex;
    align-items: center;
    .icon {
      cursor: pointer;
    }
  }
}
</style>
