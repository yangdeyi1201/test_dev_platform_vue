<template>
  <div class="projects_lists">
    <!--标题部门-->
    <div class="title">
      <span>项目列表</span>
      <el-button @click="handAdd" type="success" icon="el-icon-plus" style="float: right">添加项目</el-button>
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
            <el-button @click="handleEdit(scope.row)" type="success" icon="el-icon-edit-outline" plain>编辑</el-button>
            <el-button @click="handDelete(scope.row.id)" type="danger" icon="el-icon-delete" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--编辑项目对话框-->
    <el-dialog v-model="dialogFormVisible" title="编辑">
      <el-form :model="editForm">
        <el-form-item label="项目名称" :label-width="140">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目描述" :label-width="140">
          <el-input v-model="editForm.desc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template v-slot:footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button @click="updateProject(editProjectId)" type="primary">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <!--新增项目对话框-->
    <el-dialog v-model="dialogFormAddVisible" title="新增">
      <el-form :model="addForm">
        <el-form-item label="项目名称" :label-width="140">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目描述" :label-width="140">
          <el-input v-model="addForm.desc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template v-slot:footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormAddVisible = false;">取消</el-button>
          <el-button @click="addProject" type="primary">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {ElMessageBox} from 'element-plus'
import {mapActions} from 'vuex'

export default {
  data() {
    return {
      'projects_list': [],
      'dialogFormVisible': false,
      'dialogFormAddVisible': false,
      'editForm': {},
      'addForm': {},
      'editProjectId': ''
    }
  },
  methods: {
    ...mapActions(['messageSuccess', 'messageError', 'messageInfo']),

    async getAllProjects() {
      const response = await this.$api.getProjects()
      console.log('项目列表接口返回结果', response)
      if (response.status === 200) {
        this.projects_list = response.data
      }
    },
    // 新增项目相关
    handAdd() {
      this.dialogFormAddVisible = true
      this.addForm = {
        'name': '',
        'desc': ''
      }
    },
    async addProject() {
      const response = await this.$api.addProject(this.addForm)
      this.dialogFormAddVisible = false
      if (response.status === 201) {
        await this.getAllProjects()
        this.messageSuccess('新增成功')
      }
      else {
        this.messageError(response.data)
      }
    },
    // 修改项目相关
    handleEdit(row) {
      this.dialogFormVisible = true
      this.editForm = {
        'name': row.name,
        'desc': row.desc
      }
      this.editProjectId = row.id
    },
    async updateProject(project_id) {
      const response = await this.$api.updateProject(project_id, this.editForm)
      this.dialogFormVisible = false
      if (response.status === 200) {
        await this.getAllProjects()
        this.messageSuccess('修改成功')
      }
      else {
        this.messageError(response.data)
      }
    },
    // 删除项目相关
    async delProject(project_id) {
      const response = await this.$api.delProject(project_id)
      if (response.status === 204) {
        await this.getAllProjects()
        this.messageSuccess('删除成功')
      }
      else {
        this.messageError(response.data)
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
              this.delProject(project_id)
            })
            .catch(() => {
              this.messageInfo('已取消删除')
            })
    },
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