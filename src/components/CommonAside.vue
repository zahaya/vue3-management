<template>
  <el-aside :width="$store.state.isCollapse ? '180px' : '64px'">
    <el-menu class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
      :collapse="!$store.state.isCollapse" :collapse-transition="false">
      <h3>{{ !$store.state.isCollapse ? "后台" : "通用后台管理系统" }}</h3>
      <!-- 函数需要执行noChildren() -->
      <el-menu-item :index="item.path" v-for="item in noChildren()" :key="item.path" @click="clickMenu(item)">
        <el-icon>
          <component class="icons" :is="item.icon"></component>
        </el-icon>
        <span>{{ item.label }}</span>
      </el-menu-item>
      <el-sub-menu :index="item.label" v-for="item in hasChildren()" :key="item.label">
        <template #title>
          <el-icon>
            <component class="icons" :is="item.icon"></component>
          </el-icon>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="subItem.path" v-for="(subItem, subIndex) in item.children" :key="subIndex"
            @click="clickMenu(subItem)">
            <el-icon>
              <component class="icons" :is="subItem.icon"></component>
            </el-icon>
            <span>{{ subItem.label }}</span></el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script>
// 导入useRouter使用路由跳转
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    const menuList = store.state.menu;

    const noChildren = () => {
      return menuList.filter((item) => !item.children);
    };
    const hasChildren = () => {
      return menuList.filter((item) => item.children);
    };
    // 路由跳转
    const router = useRouter();
    const clickMenu = (item) => {
      router.push({
        name: item.name,
      });

      // 点击Menu后提交menu的name到vuex
      store.commit("selectMenu", item);
    };

    return {
      noChildren,
      hasChildren,
      clickMenu,
    };
  },
};
</script>

<style lang="less" scoped>
.el-menu {
  height: 100vh;
  border-right: none;

  h3 {
    text-align: center;
    line-height: 48px;
    color: #fff;
    font-size: 16px;
    font-weight: 400;
  }
}

.icons {
  width: 18px;
  height: 18px;
}
</style>