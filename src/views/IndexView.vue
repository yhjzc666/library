<template>
  <div class="common-layout">
    <el-container style="margin: 0px">
      <el-aside class="leftManage">
        <el-main>
          <el-row>
            <el-col :span="24">
              <h3>系统开放管理</h3>
            </el-col></el-row
          >
          <el-row>
            <el-col :span="12"
              ><el-button type="success">开放</el-button></el-col
            >
            <el-col :span="12">
              <el-button type="danger">关闭</el-button></el-col
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
</script>
<style scoped lang='scss'>
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
  width: 200px;
  box-shadow: 1px 1px 2px #000;
  height: calc(100vh - 120px);
}
</style>