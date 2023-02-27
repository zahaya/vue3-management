<template>
  <el-header>
    <div class="l-content">
      <!-- 图标的展示 -->
      <el-button size="small" plain @click="handleCollapse()">
        <el-icon size="20"><Menu /></el-icon>
      </el-button>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in tabList"
          :key="item.path"
          :to="{ path: item.path }"
          class="bread"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <img class="user" src="../assets/images/head.jpg" alt="" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心 </el-dropdown-item>
            <el-dropdown-item @click="logout">退出 </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import { computed } from "@vue/runtime-core";
// 导入useStore使用mutations
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    let store = useStore();
    // 拿到vuex的面包屑数据 做循环渲染
    let tabList = store.state.tabList;
    let handleCollapse = () => {
      //调用vuex中的mutations
      store.commit("updateIsCollapse");
    };

    const current = computed(() => {
      return store.state.currentMenu;
    });

    const router = useRouter();
    const logout = () => {
      store.commit("clearMenu");
      store.commit("clearToken");
      router.push({
        name: "login",
      });
    };
    return { handleCollapse, current, tabList, logout };
  },
};
</script>

<style lang="less" scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #333;
  .l-content {
    display: flex;
    align-items: center;
    .el-button {
      margin-right: 20px;
    }
    h3 {
      color: #fff;
    }
  }
}

.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}

.bread :deep(span) {
  color: #fff !important;
  cursor: pointer !important;
}
</style>