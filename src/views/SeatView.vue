<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <div class="custom-tree-container">
        <el-tree
          :data="dataSource"
          show-checkbox
          node-key="id"
          check-strictly
          ref="tree"
          highlight-current
          default-expand-all
          accordion
        /></div
    ></el-col>
    <el-col :span="18"
      ><div class="grid-content ep-bg-purple">
        <el-table :data="filterTableData" style="width: 100%">
          <el-table-column label="Date" prop="date" />
          <el-table-column label="Name" prop="name" />
          <el-table-column align="right">
            <template #header>
              <el-input
                v-model="search"
                size="small"
                placeholder="Type to search"
              />
            </template>
            <template #default="scope">
              <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)"
                >Edit</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >Delete</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div></el-col
    >
  </el-row>
</template>
    
<script lang="ts" setup>
import { computed, ref } from "vue";
import { ElTree } from "element-plus";
interface User {
  date: string;
  name: string;
  address: string;
}
const search = ref("");
const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
);
const handleEdit = (index: number, row: User) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: User) => {
  console.log(index, row);
};

const tableData: User[] = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "John",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Morgan",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Jessy",
    address: "No. 189, Grove St, Los Angeles",
  },
];
//树形
interface Tree {
  id: number;
  label: string;
  children?: Tree[];
}
const dataSource = ref<Tree[]>([
  {
    id: 1,
    label: "选择楼层",
    children: [
      {
        id: 2,
        label: "图书馆",
        children: [
          {
            id: 4,
            label: "二楼",
          },
          {
            id: 5,
            label: "三楼",
          },
          {
            id: 6,
            label: "四楼",
          },
          {
            id: 7,
            label: "五楼",
          },
        ],
      },
      {
        id: 3,
        label: "理性楼",
        children: [
          {
            id: 8,
            label: "一楼",
          },
          {
            id: 9,
            label: "二楼",
          },
          {
            id: 10,
            label: "三楼",
          },
        ],
      },
    ],
  },
]);
</script>

<style lang="scss" scoped>
.custom-tree-node {
  font-size: 13px;
  padding-right: 1px;
}
</style>