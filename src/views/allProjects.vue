<template>
  <div class="projects_lists">
    <!--标题部门-->
    <div class="title">
      <span>项目列表</span>
      <el-button type="success" icon="el-icon-plus" style="float: right">添加项目</el-button>
    </div>
    <!--表格部分-->
    <div class="table">
      <el-table :data="projects_list">
        <el-table-column label="项目 ID" prop="id" min-width="170"></el-table-column>
        <el-table-column label="项目名称" prop="name" min-width="170"></el-table-column>
        <el-table-column label="负责人" prop="leader" min-width="170"></el-table-column>
        <el-table-column label="项目描述" prop="desc" min-width="170" show-overflow-tooltip></el-table-column>
        <el-table-column label="创建时间" min-width="170">
          <template v-slot:default="scope">
            {{$tools.rTime(scope.row.c_time)}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="340">
          <template v-slot:default="scope">
            <el-button type="success" icon="el-icon-view" plain>进入项目</el-button>
            <el-button @click="handleEdit()" type="success" icon="el-icon-edit-outline" plain>编辑</el-button>
            <el-button @click="handDelete(scope.row.id)" type="danger" icon="el-icon-delete" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {ElMessage, ElMessageBox} from 'element-plus'

export default {
  data() {
    return {
      'projects_list': []
    }
  },
  methods: {
    async getAllProjects() {
      const response = await this.$api.getProjects()
      console.log('项目列表接口返回结果', response)
      if (response.status === 200) {
        this.projects_list = response.data
      }
    },
    handleEdit(project_id, infos) {

    },
    async delProject(project_id) {
      const response = await this.$api.delProject(project_id)
      if (response.status === 204) {
        await this.getAllProjects()
      }
    },
    handDelete(project_id) {
        ElMessageBox.confirm(
            '确认删除?',
            '提示',
            {
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              type: 'warning',
            }
        )
            .then(() => {
              ElMessage({
                type: 'success',
                message: '删除成功',
                duration: 1500,
                center: true
              })
              this.delProject(project_id)
            })
            .catch(() => {
              ElMessage({
                type: 'info',
                message: '已取消删除',
                duration: 1500,
                center: true
              })
            })
    },
    addProject() {

    }
  },
  created() {
    this.getAllProjects()
  }
}
</script>

<style scoped>
  .projects_lists {
    margin: 20px 150px 0 150px;
  }
  .title {
    height: 40px;
    border-bottom: solid 3px limegreen;
    font-size: 23px;
    color: limegreen;
  }
</style>