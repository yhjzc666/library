<template>
  <div class="home">
    <el-container>
      <el-header
        ><el-row :gutter="20">
          <el-col :span="4"
            ><img src="../assets/logo.png" class="logo"
          /></el-col>
          <el-col :span="16"
            ><h2>山东青年政治学院座位预约后台管理系统</h2></el-col
          >
          <el-col :span="4" class="quit_login">
            <el-popconfirm
              confirm-button-text="Yes"
              cancel-button-text="No"
              :icon="InfoFilled"
              icon-color="#626AEF"
              title="是否要退出系统"
              @confirm="confirmEvent"
              @cancel="cancelEvent"
            >
              <template #reference>
                <el-icon color="white" :size="23"
                  ><SwitchButton /></el-icon></template
            ></el-popconfirm>
          </el-col> </el-row
      ></el-header>
      <el-container>
        <el-aside width="200px"
          ><el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            default-active="2"
            text-color="#fff"
            router
          >
            <el-menu-item
              :index="item.path"
              v-for="item in list"
              :key="item.path"
              ><el-icon>
                <component :is="item.meta.icon" />
              </el-icon>
              <span>{{ item.meta.title }}</span>
            </el-menu-item>
          </el-menu></el-aside
        >
        <el-main>
          <!-- 路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
  
<script lang="ts" setup>
import { h } from 'vue'
import { ElMessage } from 'element-plus'
import { InfoFilled } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
const router = useRouter();
const list = router.getRoutes().filter((v) => v.meta.isShow);


//确认退出系统
const confirmEvent = () => {
  router.push("/login");
  localStorage.removeItem("token");
  ElMessage({
    message: h('p', null, [
      h('span', null, '成功退出 '),
      h('i', { style: 'color: teal' }, '😂'),
    ]),
  })
};
//取消退出系统
const cancelEvent = () => {
  ElMessage({
    message: h('p', null, [
      h('span', null, '取消退出 '),
      h('i', { style: 'color: teal' }, '😂'),
    ]),
  })
};
</script>
  
  <style lang="scss" scoped>
.home {
  background-color: #f4f4f5;
}
.el-header {
  height: 80px;
  background-color: #666;
  .logo {
    height: 80px;
  }
  h2,
  .quit_login {
    text-align: center;
    line-height: 80px;
    color: white;
  }
}
.el-aside {
  .el-menu {
    height: calc(100vh - 80px);
  }
}
</style>
  