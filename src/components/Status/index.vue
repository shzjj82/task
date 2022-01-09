<template>
  <div
    class="status-component"
    v-if="automation"
    :style="{ background: current.theme }"
  >
    {{ current.label }}
  </div>
  <el-popover
    v-else
    class="status-component"
    trigger="click"
    v-model="visible"
    :append-to-body="false"
    :width="column.width"
  >
    <div class="status-list">
      <div
        class="status-item"
        :class="{ 'status-item-active': index === current.index }"
        v-for="(status, index) in defaultStatus"
        :key="status.code"
        :style="{ background: status.theme }"
        @click="handleClick(status)"
      >
        {{ status.label }}
      </div>
    </div>
    <div slot="reference">
      <div class="status-result" :style="{ background: current.theme }">
        {{ current.label }}
      </div>
    </div>
  </el-popover>
</template>
<script lang="ts">
import Vue from "vue";
import { Conditions } from "@/interface";
import { IStatus } from "@/interface/Conditions";
import dayjs, { Dayjs, OpUnitType } from "dayjs";
import { isEqual } from "lodash";
const { StatusTypes } = Conditions;
enum EmitTypes {
  Change = "change",
}
interface valueResult {
  index: number;
  label: string;
  theme: string;
  code: number;
}
export default Vue.extend({
  name: "status",
  props: {
    automation: {
      type: Boolean,
      default: false,
    },
    task: {
      required: true,
      type: Object,
    },
    status: {
      type: Number,
      default: StatusTypes.Stateless,
    },
    column: {
      default: () => ({}),
      type: Object,
    },
  },
  data() {
    return {
      visible: false,
      value: this.status,
    };
  },
  computed: {
    dateInterval(): number {
      const { startTime, endTime } = this.task;
      return Math.abs(
        this.handleInterval(dayjs(startTime), dayjs(endTime), "day")
      );
    },
    rateInterval(): number {
      const { startTime } = this.task;
      const interval = Math.abs(
        this.handleInterval(dayjs(startTime), dayjs(), "day")
      );
      return Math.min(Math.max(interval / this.dateInterval, 0), 1);
    },
    defaultStatus(): IStatus[] {
      return [
        { theme: "#C4C4C4", label: "Stateless", code: StatusTypes.Stateless },
        { theme: "#FFB1B1", label: "Delay", code: StatusTypes.Delay },
        { theme: "#FDAB3D", label: "Risk", code: StatusTypes.Risk },
        { theme: "#00C875", label: "Normal", code: StatusTypes.Normal },
      ];
    },
    current(): valueResult {
      if (this.automation) {
        return this.handleAutomationValue;
      }
      return this.normalizeValue(this.value);
    },
    handleAutomationValue(): valueResult {
      const { process, startTime, endTime } = this.task;
      const isNotEmpty = [startTime, endTime].every(
        (date) => date && dayjs(date).isValid()
      );
      if (!isNotEmpty) return this.normalizeValue(StatusTypes.Stateless);
      if (this.rateInterval <= process / 100) {
        return this.normalizeValue(StatusTypes.Normal);
      } else {
        if (this.rateInterval === 1)
          return this.normalizeValue(StatusTypes.Delay);
        return this.normalizeValue(StatusTypes.Risk);
      }
    },
  },
  methods: {
    handleInterval(start: Dayjs, end: Dayjs, unit: OpUnitType): number {
      return start.diff(end, unit);
    },
    normalizeValue(code: number): valueResult {
      const index = this.defaultStatus.findIndex((status) =>
        isEqual(status.code, code)
      );
      return {
        ...this.defaultStatus[index],
        index,
      };
    },
    toggleVisible(): void {
      this.visible = !this.visible;
    },
    handleClick(status: IStatus): void {
      const { code } = status;
      this.value = code;
      this.$emit(EmitTypes.Change, code);
      this.$nextTick(this.toggleVisible);
    },
  },
});
</script>
<style lang="less" scoped>
@deep:~ '>>>';
.status-component {
  flex-grow: 1;
  height: 34px;
  line-height: 34px;
  text-align: center;
  color: #fff;
  font-size: 12px;
  @{deep} .el-popover {
    margin: 0 !important;
    padding: 16px;
    box-sizing: border-box;
    min-width: 0px;
  }
  .status-list {
    .status-item {
      width: 100%;
      height: 32px;
      line-height: 32px;
      text-align: center;
      margin-bottom: 8px;
      border: 2px solid transparent;
      font-size: 13px;
      color: #fff;
      cursor: pointer;
      &-active {
        border-color: #0073ea;
      }
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
}
.status-result {
  flex-grow: 1;
  height: 34px;
  line-height: 34px;
  text-align: center;
  color: #fff;
  font-size: 12px;
}
</style>
