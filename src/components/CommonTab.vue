<template>
  <div class="tags">
    <el-tag
      v-for="(tag, index) in tags"
      :key="tag.name"
      :closable="tag.name !== 'home'"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="changeMenu(tag)"
      @close="closeTag(tag, index)"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const tags = store.state.tabList;

    const router = useRouter();
    const route = useRoute();
    // 跳转tags
    const changeMenu = (tag) => {
      router.push({
        name: tag.name,
      });
    };

    // 删除tags
    const closeTag = (tag, index) => {
      // 保持和索引一致
      let length = tags.length - 1;

      store.commit("closeTag", tag);

      // 如果删除的不是自己 则返回
      if (tag.name !== route.name) {
        return;
      }
      // 如果删除的是自己
      if (tag.name === tag.name) {
        // 如果在最后一个 则向前跳转
        if (index === length) {
          router.push({
            name: tags[index - 1].name,
          });
        } else {
          // 如果不在最后一个 则向后跳转
          router.push({
            name: tags[index].name,
          });
        }
      }
    };

    return {
      tags,
      changeMenu,
      closeTag,
    };
  },
};
</script>

<style lang="less" scoped>
.tags {
  width: 100%;
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>