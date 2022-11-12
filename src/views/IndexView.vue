<template>
    <div class="login-box">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon 
        :rules="rules"
        label-width="70px"
        class="demo-ruleForm"
      >
        <h2>后台管理系统</h2>
        <el-form-item label="账号：" prop="username">
          <el-input
            v-model="ruleForm.username"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            class="loginBtn"
            type="primary"
            @click="submitForm(ruleFormRef)"
            >登录</el-button
          >
          <el-button class="loginBtn" @click="resetForm(ruleFormRef)"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, reactive, toRefs, ref } from "vue";
  import { LoginData } from "../type/index";
  import type { FormInstance } from "element-plus";
  import { login } from "../request/api";
  import { useRouter } from "vue-router";
  
  export default defineComponent({
    setup() {
      const data = reactive(new LoginData());
      const rules = {
        username: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur",
          },
          {
            min: 3,
            max: 5,
            message: "Length should be 3 to 5",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 3,
            max: 5,
            message: "Length should be 3 to 5",
            trigger: "blur",
          },
        ],
      };
  
      //登录
      const ruleFormRef = ref<FormInstance>();
      const router = useRouter();
      const submitForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return;
        formEl.validate((valid) => {
          if (valid) {
            console.log("submit!");
            login(data.ruleForm).then((res) => {
              const map = new Map(Object.entries(res));
              //保存token
              localStorage.setItem("token", map.get("token"));
              //跳转首页
              router.push('/');
            });
          } else {
            console.log("error submit!");
            return false;
          }
        });
      };
  
      //重置表单
      const resetForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return;
        formEl.resetFields();
      };
      return { ...toRefs(data), rules, ruleFormRef, resetForm, submitForm };
    },
  });
  </script>
  
  <style lang='scss' scoped>
  .login-box {
    width: 100%;
    height: 100%;
    background: url("../assets/bg.jpeg");
    padding: 1px;
    text-align: center;
    .demo-ruleForm {
      width: 500px;
      margin: 200px auto;
      background-color: white;
      padding: 40px;
      border-radius: 40px;
    }
    .loginBtn {
      width: 48%;
    }
    h2 {
      margin-bottom: 20px;
    }
  }
  </style>