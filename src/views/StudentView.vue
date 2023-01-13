<template>
  <div class="common-layout">
    <div class="buttons">
      <el-button type="primary" @click="drawer = true">添加</el-button>
      <el-button type="danger">批量删除</el-button>
    </div>
    <div class="search">
      <!-- v-model="input_value" -->
      <el-input
        placeholder="请输入搜索内容"
        v-model="state.input_value"
      ></el-input>
      <el-button style="lineheight: 8px">搜索</el-button>
    </div>
    <!-- :data="tableData()"  -->
    <!-- search.slice(
          (states.currentPage - 1) * states.pagesize,
          states.currentPage * states.pagesize
        ) -->
    <el-table
      style="width: 100%"
      :data="
        search.slice(
          (state.currentPage - 1) * state.pagesize,
          state.currentPage * state.pagesize
        )
      "
    >
      <el-table-column
        v-for="col in tableHeader"
        :prop="col.prop"
        :label="col.label"
        :key="col.prop"
      >
      </el-table-column>
      <el-table-column align="left">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div style="overflow: hidden; margintop: 20px">
      <span class="pages">
        第{{ state.currentPage }}页 共{{
          Math.ceil(state.total / state.pagesize)
        }}页，共{{ state.total }}条</span
      >
      <el-pagination
        class="fy"
        layout="prev, pager, next"
        @current-change="current_change"
        :total="state.total"
        :page-size="state.pagesize"
        background
      >
      </el-pagination>
    </div>
    <!-- <div class="example-pagination-block">
      <div class="example-demonstration">分页</div>
      <el-pagination
        background
        layout="prev, pager, next ,total,sizes"
        :total="state.tableData.length"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div> -->
    <el-drawer
      v-model="drawer"
      title="添加学生信息"
      direction="ltr"
      :before-close="handleClose"
    >
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="学号" :label-width="formLabelWidth">
            <el-input v-model="form.stuID" autocomplete="off" />
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.username" autocomplete="off" />
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth">
            <el-select v-model="form.state" placeholder="选择学生信息状态">
              <el-option label="正常" value="正常" />
              <el-option label="暂封" value="暂封" />
            </el-select>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer" style="margin-left: 90px">
          <el-button @click="cancelForm">取消</el-button>
          <el-button type="primary" @click="insertStus">添加</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
  
  <script lang="ts" setup>
import { computed, ref, reactive } from "vue";
import { ElMessageBox, ElDrawer, ElMessage } from "element-plus";
import { insertStu, selectStu } from "../request/api";
import { onMounted } from "@vue/runtime-core";
const tableHeader = [
  { prop: "stuID", label: "学号" },
  { prop: "username", label: "姓名" },
  { prop: "state", label: "状态" },
  { prop: "time", label: "时间" },
];
const state = reactive({
  tableData: [], // 数据列表
  page: 1,
  limit: 11,
  istag: true,
  input_value: "",
  currentPage: 1, //默认开始页面
  total: 0,
  pagesize: 11, //每页的数据条数
});
onMounted(() => {
  getGoodList();
});

const getGoodList = () => {
  selectStu().then((res) => {
    state.tableData = res.stuDate;
    state.total = res.stuDate.length;
  });
};

//显示表格
interface User {
  stuID: string;
  username: string;
  state: string;
}
const arr = ref([]); //声明一个新数组
const search = computed<any>(() => {
  if (state.input_value) {
    state.tableData.filter((data) => {
      data.stuID.indexOf(state.input_value) !== -1;
      console.log(data.stuID.indexOf(state.input_value) !== -1);
    });
  }
  return state.tableData;
  // 若返回值不是 number 类型则会报错
});
// const search = () =>{
//   if (states.input_value) {
//     return states.tableData.filter((data) => {
//       return Object.keys(data).some((key) => {
//         return String(data[key]).toLowerCase().indexOf(states.input_value) > -1;
//       });
//     });
//   }
//   return states.tableData;
// };

const handleEdit = (index: number, row: User) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: User) => {
  console.log(index, row);
}; //生成表格

// const tableRowClassName = ({ rowIndex }) => {
//   if (rowIndex === 0) {
//     return "th";
//   }
//   return "";
// };
// const switchChange = () => {
//   state.istag = !state.istag;
// };

const current_change = (currentPage: any) => {
  state.currentPage = currentPage;
};
// const created = () => {
//   state.total = state.tableData.length;
// };

//添加学生信息
const form = reactive({
  username: "",
  state: "",
  stuID: "",
});
const formLabelWidth = "80px";
const drawer = ref(false);
const loading = ref(false);
const handleClose = (done: () => void) => {
  ElMessageBox.confirm("将为你提交未保存的数据后关闭此页面")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
const insertStus = () => {
  console.log(form);
  insertStu(form).then((res) => {
    const map = new Map(Object.entries(res));
    console.log();
    if (map.get("code") == 200) {
      ElMessage({
        message: "学生信息添加成功",
        type: "success",
      });
      getGoodList();
    }
    if (map.get("code") == 300) {
      ElMessage({
        message: "该学生信息已存在",
        type: "error",
      });
    }
    if (map.get("code") == 400) {
      ElMessage({
        message: "学生信息添加失败",
        type: "error",
      });
    }
  });
};

const cancelForm = () => {
  loading.value = false;
}; //添加学生信息结束
</script>
<style lang="scss" scoped>
.search {
  width: 450px;
  float: left;
  display: flex;
  margin-bottom: 10px;
  input {
    width: 290px;
    height: 26px;
    outline: none;
  }
  button {
    width: 80px;
    height: 30px;
    border: 1px solid rgb(230, 230, 230);
    background: none;
    margin-right: 4px;
  }
}
.buttons {
  float: right;
}
.pages {
  float: left;
  line-height: 30px;
  margin-right: 100px;
  margin-left: 200px;
}
</style>