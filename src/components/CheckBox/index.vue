<template>
  <div
    class="checkbox-component"
    @mouseenter="setActive(true)"
    @mouseleave="setActive(false)"
    :style="normalizeStyle(groupTheme('background'))"
  >
    <el-checkbox
      v-if="isShow"
      v-model="value"
      @change="handleChange"
      :label="task.id"
      text-color="#000"
      fill="#fff"
    ></el-checkbox>
  </div>
</template>
<script lang="ts">
import { isEqual, uniq } from "lodash";
import Vue from "vue";
import group from "@/mixins/group";
enum widthSize {
  hidden = 8,
  visible = 34,
}
export default Vue.extend({
  name: "checkbox-component",
  mixins: [group],
  props: {
    selecteds: {
      default: () => [],
      type: Array,
    },
    task: {
      required: true,
      type: Object,
    },
  },
  computed: {
    isShow(): boolean {
      return Boolean(this.selecteds.length) || this.isActive;
    },
    normalizeStyle(): (style: { background: string }) => unknown {
      const width = this.isShow ? widthSize.visible : widthSize.hidden;
      return (style) => {
        const themeBackground = style.background;
        return { width: `${width}px`, background: themeBackground };
      };
    },
  },
  data() {
    return {
      isActive: false,
      value: this.selecteds,
    };
  },
  methods: {
    handleChange() {
      if (this.value.includes(this.task.id)) {
        return this.$emit("change", uniq(this.selecteds.concat(this.value)));
      }
      return this.$emit(
        "change",
        this.selecteds.filter((id) => !isEqual(this.task.id, id))
      );
    },
    setActive(value: boolean) {
      this.isActive = value;
    },
  },
});
</script>
<style lang="less" scoped>
@deep:~ '>>>';
.checkbox-component {
  width: 34px;
  min-height: 34px;
  background: red;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: width 0.5s cubic-bezier(0, 0, 0.35, 1);
  @{deep} .el-checkbox__label {
    display: none;
  }
  @{deep} .el-checkbox__inner {
    &:hover {
      background: #fff;
      border-color: #fff;
    }
  }
  @{deep} .el-checkbox__input.is-checked .el-checkbox__inner {
    background: #fff;
    border-color: #fff;
    &::after {
      border-color: #333;
    }
  }
  @{deep} .el-checkbox__input.is-focus .el-checkbox__inner {
    background: #fff;
    border-color: #fff;
    &::after {
      border-color: #333;
    }
  }
}
</style>
