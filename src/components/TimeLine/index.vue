<template>
  <div class="timeLine-component">
    <el-date-picker
      v-model="value"
      @change="handleChange"
      type="daterange"
      :format="format"
      :default-time="['00:00:00', '23:59:59']"
    >
    </el-date-picker>
    <div
      class="timeLine-component__content"
      v-if="isNotEmpty"
      :style="intervalStyle(groupTheme('background'))"
    >
      <span class="content-format">{{ formatDate }}</span>
      <span class="content-interval">{{ dateInterval }} 天</span>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import group from "@/mixins/group";
import dayjs, { Dayjs, OpUnitType } from "dayjs";
enum EmitTypes {
  Change = "change",
}
export default Vue.extend({
  name: "time-line",
  mixins: [group],
  props: {
    format: {
      type: String,
      default: "MM/DD",
    },
    startTime: Date,
    endTime: Date,
  },
  data() {
    return {
      value: [this.startTime, this.endTime],
    };
  },
  computed: {
    isNotEmpty(): boolean {
      return this.value.every((date) => date && dayjs(date).isValid());
    },
    formatDate(): string {
      let [startTime, endTime] = this.value;
      // 相同日期只展示一天
      if (this.isSame("date")) return this.handleFormat(startTime, this.format);
      // 相同月展示 月 开始-结束
      if (this.isSame("month"))
        return `${this.handleFormat(startTime, "MM月 DD")}-${this.handleFormat(
          endTime,
          "DD"
        )}`;
      // 不同月、不同日 展示所有
      return `${this.handleFormat(
        startTime,
        this.format
      )} - ${this.handleFormat(endTime, this.format)}`;
    },
    isSame(): (conditions: OpUnitType) => boolean {
      let [startTime, endTime] = this.value;
      return (conditions) =>
        dayjs(startTime).isSame(dayjs(endTime), conditions);
    },
    dateInterval(): number {
      const [startTime, endTime] = this.value;
      return Math.abs(
        this.handleInterval(dayjs(startTime), dayjs(endTime), "day")
      );
    },
    rateInterval(): number {
      const [startTime] = this.value;
      const interval = Math.abs(
        this.handleInterval(dayjs(startTime), dayjs(), "day")
      );
      return Math.min(Math.max(interval / this.dateInterval, 0), 1);
    },
    intervalStyle(): unknown {
      return (theme: { background: string }) => {
        const { background } = theme;
        return {
          background: `linear-gradient(to right, ${background} ${
            this.rateInterval * 100
          }%, rgb(28, 31, 59) ${this.rateInterval * 100}%`,
        };
      };
    },
  },
  methods: {
    handleFormat(date: string, format: string): string {
      return dayjs(date).format(format);
    },
    handleInterval(start: Dayjs, end: Dayjs, unit: OpUnitType): number {
      return start.diff(end, unit);
    },
    handleChange(values: Date[]): void {
      const [startTime, endTime] = values;
      this.$emit(EmitTypes.Change, { startTime, endTime });
    },
  },
});
</script>
<style lang="less" scoped>
@deep: ~">>>";

.timeLine-component {
  background: #c4c4c4;
  display: flex;
  align-items: center;
  border-radius: 11px;
  color: #fff;
  position: relative;
  overflow: hidden;
  margin: 0 16px;
  &:hover {
    .content-format {
      display: none;
    }
    .content-interval {
      display: inline;
    }
  }
  .content-interval {
    display: none;
  }
  &__content {
    position: absolute;
    background: #1c1f3b;
    color: #fff;
    width: 100%;
    height: 22px;
    line-height: 22px;
    font-size: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
  }
  @{deep} .el-input__inner {
    border: 0;
    height: 22px;
    line-height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: transparent;
    padding: 0 10px;
  }
  @{deep} .el-range-separator {
    display: flex;
    width: auto;
    align-items: center;
    color: #fff;
    font-size: 13px;
  }
  @{deep} .el-input__icon {
    display: none;
  }
  @{deep} .el-range-input {
    background: transparent;
    color: #fff;
    font-size: 13px;
  }
}
</style>
