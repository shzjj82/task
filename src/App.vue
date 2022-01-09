<template>
  <div id="app">
    <MenuComponent :basic="basic" @command="command" :advance="advance">
      <el-button type="primary">菜单</el-button>
    </MenuComponent>
    <ConditionsComponent />
    <TaskView />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import MenuComponent from "@/components/Menu/index.vue";
import ConditionsComponent from "@/components/Conditions/index.vue";
import TaskView from "@/views/Task.vue";
import { get } from "lodash";
export default Vue.extend({
  name: "app",
  components: {
    MenuComponent,
    ConditionsComponent,
    TaskView,
  },
  data() {
    return {
      basic: {
        title: "Essentials",
        children: [
          [
            { label: "Status" },
            { label: "TimeLine" },
            { label: "Date", command: "setDate" },
          ],
          [
            { label: "People" },
            { label: "Files" },
            { label: "Dropdown", command: "setDropdown" },
          ],
        ],
      },
      advance: {
        title: "Super Useful",
        children: [
          { label: "advanceStatus", command: "setStatus" },
          { label: "advanceTimeLine", command: "setTimeLine" },
          { label: "advanceDate", command: "setDate" },
          { label: "advancePeople", command: "setPeople" },
          { label: "advanceFiles", command: "setFiles" },
          { label: "advanceDropdown", command: "setDropdown" },
        ],
      },
    };
  },
  computed: {
    getConfigurations() {
      const configurations = this.$store.getters["task/configurations"];
      return (key: string) => get(configurations, key);
    },
    columns(): unknown[] {
      return this.getConfigurations("columns");
    },
  },
  methods: {
    command(name: string) {
      console.log(name);
    },
  },
});
</script>
<style lang="less">
body {
  font-family: "Roboto", helvetica, arial, sans-serif;
}
</style>
