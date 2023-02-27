<template>
  <div class="user-header">
    <el-button type="primary" @click="handleAdd">+新增</el-button>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="请输入">
        <el-input
          v-model="formInline.keyword"
          placeholder="请输入用户名"
          clearable
          @clear="clearUser"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSearch">Query</el-button>
      </el-form-item>
    </el-form>
  </div>

  <div class="table">
    <el-table :data="tabList" style="width: 100%" height="500px">
      <el-table-column
        v-for="(item, index) in tableLabel"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :width="item.width ? item.width : 125"
      />
      <el-table-column fixed="right" label="操作" min-width="180">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button type="danger" size="small" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      small
      background
      layout="prev, pager, next"
      :total="config.total"
      class="mt-4 pager"
      @current-change="changePage"
    />
  </div>

  <el-dialog
    v-model="dialogVisible"
    :title="action === 'add' ? '新增用户' : '编辑用户'"
    width="40%"
    :before-close="handleClose"
  >
    <el-form :inline="true" :model="formUser" ref="userForm" :rules="rules">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formUser.name" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="年龄" prop="age">
            <el-input v-model.number="formUser.age" placeholder="请输入年龄" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="性别" prop="sex">
            <el-select v-model="formUser.sex" placeholder="请选择性别">
              <el-option label="男" value="0" />
              <el-option label="女" value="1" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="出生日期" prop="birth">
            <el-date-picker
              v-model="formUser.birth"
              type="date"
              label="出生日期"
              placeholder="请输入出生日期"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="formUser.addr" placeholder="请输入地址" />
        </el-form-item>
      </el-row>

      <el-row style="justify-content: flex-end">
        <el-form-item>
          <el-button type="primary" @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit"> 确定 </el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import {
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
} from "@vue/runtime-core";
import { getUser, addUser, editUser, delUser } from "../../api/api.js";

export default {
  setup() {
    const { proxy } = getCurrentInstance();
    const tabList = ref([]);
    const tableLabel = reactive([
      {
        prop: "name",
        label: "姓名",
      },
      {
        prop: "age",
        label: "年龄",
      },
      {
        prop: "sexLabel",
        label: "性别",
      },
      {
        prop: "birth",
        label: "出生日期",
        width: 200,
      },
      {
        prop: "addr",
        label: "地址",
        width: 320,
      },
    ]);
    const config = reactive({
      total: 0,
      page: 1,
      limit: 10,
      name: "",
    });
    const getUserData = () => {
      getUser({
        params: config,
      }).then(({ data: res }) => {
        config.total = res.count;
        // 把tabList中的0和1转成男女
        tabList.value = res.list.map((item) => {
          item.sexLabel = item.sex === 0 ? "女" : "男";
          return item;
        });
      });
    };

    // 翻页
    const changePage = (page) => {
      config.page = page;
      getUserData();
    };

    // 搜索
    const formInline = reactive({
      keyword: "",
    });
    const handleSearch = () => {
      config.name = formInline.keyword;
      getUserData();
    };

    // 取消搜索重新获取userData
    const clearUser = () => {
      config.name = formInline.keyword;
      getUserData();
    };

    // 控制dialog的显示隐藏
    const dialogVisible = ref(false);

    // 关闭dialog
    const handleClose = (done) => {
      ElMessageBox.confirm("是否关闭?")
        .then(() => {
          proxy.$refs.userForm.resetFields();
          done();
        })
        .catch(() => {
          // catch error
        });
    };

    // 添加用户
    const formUser = reactive({
      name: "",
      age: "",
      sex: "",
      birth: "",
      addr: "",
      id: "",
    });
    // 格式化日期
    const timeFormat = (time) => {
      var time = new Date(time);
      var year = time.getFullYear();
      var month = time.getMonth() + 1;
      var date = time.getDate();
      function add(m) {
        return m < 10 ? "0" + m : m;
      }
      return year + "-" + add(month) + "-" + add(date);
    };
    const onSubmit = () => {
      // validate 验证是否输入内容
      proxy.$refs.userForm.validate((valid) => {
        if (valid) {
          // 新增用户接口
          if (action.value === "add") {
            formUser.birth = timeFormat(formUser.birth);
            addUser(formUser).then(({ data: res }) => {
              if (res.code === 200) {
                dialogVisible.value = false;
                proxy.$refs.userForm.resetFields();
                getUserData();
              }
            });
            // 修改用户接口
          } else {
            formUser.sex == "男" ? (formUser.sex = 1) : (formUser.sex = 0);
            editUser(formUser).then(({ data: res }) => {
              console.log(res);
              if (res.code === 200) {
                dialogVisible.value = false;
                proxy.$refs.userForm.resetFields();
                getUserData();
              }
            });
          }
        } else {
          ElMessage.error("请输入正确的内容");
        }
      });
    };

    // 表单验证
    const rules = reactive({
      name: [
        {
          required: true,
          message: "请输入姓名",
          trigger: "blur",
        },
      ],
      age: [
        {
          required: true,
          message: "请输入年龄",
          trigger: "blur",
        },
        {
          type: "number",
          message: "请输入数字",
        },
      ],
      sex: [
        {
          required: true,
          message: "请选择性别",
          trigger: "blur",
        },
      ],
      birth: [
        {
          type: "date",
          required: true,
          message: "请选择出生日期",
          trigger: "blur",
        },
      ],
      addr: [
        {
          required: true,
          message: "请输入地址",
          trigger: "blur",
        },
      ],
    });

    // 取消
    const handleCancel = () => {
      dialogVisible.value = false;
      proxy.$refs.userForm.resetFields();
    };

    // 定义变量 区分编辑或新增
    const action = ref("add");
    // 编辑用户
    const handleEdit = (row) => {
      dialogVisible.value = true;
      action.value = "edit";
      row.sex == 1 ? (row.sex = "男") : (row.sex = "女");
      //延迟操作
      proxy.$nextTick(() => {
        // 浅拷贝
        Object.assign(formUser, row);
      });
    };

    // 新增用户按钮
    const handleAdd = () => {
      dialogVisible.value = true;
      action.value = "add";
    };

    // 删除用户
    const handleDelete = (row) => {
      ElMessageBox.confirm("是否删除?")
        .then(() => {
          delUser({ id: row.id }).then(() => {
            ElMessage.success("删除成功");
            getUserData();
          });
        })
        .catch(() => {
          // catch error
          ElMessage.success("取消删除");
        });
    };

    onMounted(() => {
      getUserData();
    });

    return {
      tabList,
      tableLabel,
      config,
      changePage,
      formInline,
      handleSearch,
      clearUser,
      dialogVisible,
      handleClose,
      formUser,
      onSubmit,
      rules,
      handleCancel,
      handleEdit,
      action,
      handleAdd,
      handleDelete,
    };
  },
};
</script>

<style lang="less" scoped>
.user-header {
  display: flex;
  justify-content: space-between;
}
.table {
  position: relative;
  height: 520px;
  .pager {
    position: absolute;
    right: 0px;
    bottom: -20px;
  }
}
</style>