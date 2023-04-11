<template>
  <el-form :model="loginForm" class="login-container">
    <h3>系统登录</h3>
    <el-form-item>
      <el-input type="input" placeholder="请输入账号" v-model="loginForm.username">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" placeholder="请输入密码" v-model="loginForm.password">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login"> 登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { getMenu } from "../../api/api.js";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const loginForm = reactive({
      username: "admin",
      password: "admin",
    });

    const store = useStore();
    const router = useRouter();
    const login = () => {
      getMenu(loginForm).then(({ data: res }) => {
        if (res.code === 200) {
          store.commit("setMent", res.data.menu);
          store.commit("addMenu", router);
          store.commit("setToken", res.data.token);
          router.push({
            name: "home",
          });
        }
      });
    };

    return {
      loginForm,
      login,
    };
  },
};
</script>

<style lang="less" scoped>
.login-container {
  width: 350px;
  padding: 15px 35px 15px 35px;
  margin: 180px auto;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 15px;
  box-shadow: 0 0 25px #cacaca;

  h3 {
    margin-bottom: 20px;
    text-align: center;
    color: #505450;
  }

  :deep(.el-form-item__content) {
    justify-content: center;
  }
}
</style>