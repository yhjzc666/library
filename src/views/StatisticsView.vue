<template>
  <div class="common-layout">
    <el-table :data="state.tableData" style="width: 100%">
      <el-table-column
        v-for="col in tableHeader"
        :prop="col.prop"
        :label="col.label"
        :key="col.prop"
      >
      </el-table-column>
    </el-table>
  </div>
</template>
    
<script lang="ts" setup>
import { onMounted } from "@vue/runtime-core";
import { reactive } from "vue";
import { selectStu } from "../request/api";
const tableHeader = [
  { prop: "stuID", label: "学号" },
  { prop: "username", label: "姓名" },
  { prop: "state", label: "状态" },
  { prop: "time", label: "时间" },
];
const state = reactive({
  tableData: [], // 数据列表
});
onMounted(() => {
  getGoodList();
});

const getGoodList = () => {
  selectStu().then((res) => {
    state.tableData = res.stuDate;
    console.log(res);
  });
};
</script>