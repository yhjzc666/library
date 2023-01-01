<template>
  <div>
    <el-container style="margin: 0px">
      <el-aside class="leftManage">
        <el-header class="head">
          <text> 系统预约开放管理 </text>
        </el-header>
        <div
          style="border-bottom: 2px solid #e9e9eb; width: 90%; margin: auto"
        ></div>
        <el-main>
          <el-row>
            <el-col :span="24">
              <text v-if="data.ruleForm.state == '1'"> 当前状态：开放 </text>
              <text v-if="data.ruleForm.state == '0'"> 当前状态：关闭 </text>
            </el-col></el-row
          >
          <el-row>
            <el-col :span="12"
              ><el-button type="success" @click="updateState(1)" class="buttons" > 开放</el-button></el-col
            >
            <el-col :span="12">
              <el-button type="danger" @click="updateState(2)" class="buttons">关闭</el-button></el-col
            >
          </el-row>
          <el-row>
            <el-col :span="24" style="margin-bottom: 10px">修改开放时间</el-col>
            <el-col :span="24">
              <div class="block">
                <span class="demonstration">预约开始时间</span>
              </div>
              <div class="example-basic">
                <el-time-picker
                  format="HH:mm"
                  value-format="HH:mm"
                  placeholder="选择开始时间"
                ></el-time-picker>
              </div>
              <div class="block">
                <span class="demonstration">预约结束时间</span>
              </div>
              <div class="example-basic">
                <el-time-picker
                  format="HH:mm"
                  value-format="HH:mm"
                  placeholder="选择结束时间"
                ></el-time-picker></div
            ></el-col>
          </el-row>
          <el-row>
            <el-col
              ><el-button type="success" style="width:100%;margin-top: -20px;">修改</el-button></el-col
            >
          </el-row>
        </el-main>
      </el-aside>
      <el-container>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang='ts' setup>
import { reactive } from "vue";
import { IndexData } from "../type/index";
import { updateStates } from "../request/api";
const data = reactive(new IndexData());

//时间选择
// const value1 = ref();
// const value2 = ref();

//修改状态
const updateState = (param: any | undefined) => {
  updateStates(param).then((res) => {
    const map = new Map(Object.entries(res));
    data.ruleForm.state = map.get("state");
    console.log(res)
  })
}
</script>
<style scoped lang='scss'>
.buttons{
  width: 90%;
}
.head {
  height: 40px;
  line-height: 40px;
  padding: 0;
  margin-left: 20px;
}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.leftManage {
  width: 260px;
  background-color: white;
  background-color: #a0cfff;
  height: calc(100vh - 120px);
}
text {
  font-size: 14px;
}
.example-basic {
  margin-bottom: 8px;
}

.block {
  margin-bottom: 2px;
}
.block .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 13px;
}
</style>