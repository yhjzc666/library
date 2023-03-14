<template>
  <el-form-item style="width: 30%; float: left; margin-top: 7px">
    <el-cascader
      :options="options"
      :props="props1"
      clearable
      style="width: 100%"
      @change="agreeChange"
    />
  </el-form-item>
  <el-form-item
    style="width: 200px; float: left; margin-top: 7px; margin-left: 20px"
  >
    <el-input
      placeholder="请输入搜索内容"
      v-model="seat.input_value"
    ></el-input>
  </el-form-item>
  <el-form-item style="float: right; margin-top: 10px">
    <el-button type="primary" @click="drawer = true">添加</el-button>
    <el-popconfirm
      confirm-button-text="是的"
      cancel-button-text="取消"
      :icon="InfoFilled"
      icon-color="#626AEF"
      title="将删除所选学生信息"
      @confirm="confirmEvent"
      @cancel="cancelEvent"
    >
      <template #reference>
        <el-button type="danger">删除</el-button>
      </template>
    </el-popconfirm>
  </el-form-item>
  <el-col
    ><div class="grid-content ep-bg-purple">
      <el-table
        :data="
          search.slice(
            (seat.currentPage - 1) * seat.pagesize,
            seat.currentPage * seat.pagesize
          )
        "
        @selection-change="handleSelectionChange"
        style="width: 100%"
      >
        <el-table-column type="selection" width="30" align="center" />
        <el-table-column
          v-for="col in tableHeader"
          :prop="col.prop"
          :label="col.label"
          :key="col.prop"
        >
        </el-table-column>
        <!-- <el-table-column
          prop="tag"
          label="Tag"
          width="100"
          :filters="[
            { text: 'Home', value: 'Home' },
            { text: 'Office', value: 'Office' },
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
        </el-table-column> -->
        <el-table-column align="right">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
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
      <div style="overflow: hidden; margintop: 20px">
        <span class="pages">
          第{{ seat.currentPage }}页 共{{
            Math.ceil(seat.total / seat.pagesize)
          }}页，共{{ seat.total }}条</span
        >
        <el-pagination
          class="fy"
          layout="prev, pager, next"
          @current-change="current_change"
          :total="seat.total"
          :page-size="seat.pagesize"
          background
        >
        </el-pagination>
      </div></div
  ></el-col>
  <el-drawer
    v-model="drawer"
    title="添加学生信息"
    direction="ltr"
    :before-close="handleClose"
  >
    <div class="demo-drawer__content">
      <div class="demo-drawer__footer" style="margin-left: 90px">
        <el-button @click="cancelForm">取消</el-button>
        <el-button type="primary" @click="insertStus">添加</el-button>
      </div>
    </div>
  </el-drawer>
</template>
    
<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import { ElMessageBox, ElDrawer, ElMessage } from "element-plus";
import { InfoFilled } from "@element-plus/icons-vue";
import { onMounted } from "@vue/runtime-core";
import { selectAllSeat, selectSomeSeat } from "../request/api";

const tableHeader = [
  { prop: "number", label: "座位号" },
  { prop: "state", label: "状态" },
  { prop: "grandPID", label: "楼宇" },
  { prop: "parentID", label: "楼层" },
];

const props1 = {
  checkStrictly: true,
};
const options = [
  {
    value: "2",
    label: "图书馆",
    children: [
      {
        value: "4",
        label: "二楼",
      },
      {
        value: "5",
        label: "三楼",
      },
      {
        value: "6",
        label: "四楼",
      },
      {
        value: "7",
        label: "五楼",
      },
    ],
  },
  {
    value: "3",
    label: "利行楼",
    children: [
      {
        value: "8",
        label: "一楼",
      },
      {
        value: "9",
        label: "二楼",
      },
      {
        value: "10",
        label: "三楼",
      },
    ],
  },
];
const agreeChange = (val) => {
  selectSomeSeat({
    parentID: val[1],
    grandPID: val[0],
  }).then((res) => {
    console.log(res);
    seat.tableData = res.seatDate;
    seat.total = res.seatDate.length;
  });
};
interface User {
  date: string;
  name: string;
  address: string;
}
const handleEdit = (index: number, row: User) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: User) => {
  console.log(index, row);
};

const seat = reactive({
  tableData: [], // 数据列表
  page: 1,
  limit: 11,
  istag: true,
  input_value: "",
  currentPage: 1, //默认开始页面
  total: 0,
  pagesize: 11, //每页的数据条数
  multipleSelection: [],
  multipleSelectAry: [],
});

onMounted(() => {
  getSeatList();
});
const getSeatList = () => {
  selectAllSeat().then((res) => {
    console.log(res.seatDate);
    seat.tableData = res.seatDate;
    seat.total = res.seatDate.length;
  });
};
const handleSelectionChange = (rows: string[]) => {
  seat.multipleSelection = rows;
  console.log(seat.multipleSelection);
};
//搜索框
const search = computed<any>(() => {
  if (seat.input_value) {
    return seat.tableData.filter((data) => {
      return Object.keys(data).some((key) => {
        return String(data[key]).toLowerCase().indexOf(seat.input_value) > -1;
      });
    });
  }
  return seat.tableData;
  // 若返回值不是 number 类型则会报错
});

//生成表格
//翻页
const current_change = (currentPage: any) => {
  seat.currentPage = currentPage;
};

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
const cancelForm = () => {
  loading.value = false;
};
const confirmEvent = () => {
  //ad
};
const cancelEvent = () => {
  console.log("cancel!");
};
</script>
