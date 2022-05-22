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
            <el-button @click="clickEnter(scope.row)" type="success" icon="el-icon-view" plain>进入项目</el-button>
            <el-button @click="handleEdit(scope.row)" type="success" icon="el-icon-edit-outline" plain>编辑</el-button>
            <el-button @click="handDelete(scope.row.id)" type="danger" icon="el-icon-delete" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--编辑项目对话框-->
<<<<<<< HEAD
    <el-dialog v-model="dialogFormVisible" :title="'编辑 id 为 '+editProjectId+' 的项目'">
=======
    <el-dialog v-model="dialogFormVisible" :title="'编辑 id 为 '+editProjectId+' 的项目'" width="30%">
>>>>>>> tmp
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
    <el-dialog v-model="dialogFormAddVisible" title="新增" width="30%">
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
import {mapActions, mapMutations} from 'vuex'

export default {
  data() {
    return {
      'projects_list': [],
      'dialogFormVisible': false,
      'dialogFormAddVisible': false,
      'editForm': {
        'name': '',
        'desc': ''
      },
      'addForm': {
        'name': '',
        'desc': ''
      },
      'editProjectId': ''
    }
  },
  methods: {
    ...mapActions(['messageSuccess', 'messageError', 'messageInfo']),
    ...mapMutations(['saveProjectInfo']),

    // 获取项目列表
    async getAllProjects() {
      const response = await this.$api.getProjects()
      console.log('项目列表接口返回结果', response)
      if (response.status === 200) {
        this.projects_list = response.data
      }
      else {
        this.messageError(response.data)
      }
    },
    // 点击进入项目按钮时执行
    clickEnter(project_info) {
      this.$router.push({name: 'home'})
      this.saveProjectInfo(project_info)
    },
    // 新增项目相关
    handAdd() {
      // 点新增项目按钮时执行
      this.dialogFormAddVisible = true
      this.addForm = {
        'name': '',
        'desc': ''
      }
    },
    async addProject() {
      // 点击新增对话框内确认按钮时执行
      const response = await this.$api.addProject(this.addForm)
      if (response.status === 201) {
        await this.getAllProjects()
        this.dialogFormAddVisible = false
        this.messageSuccess('新增成功')
      }
      else {
        this.messageError(response.data)
      }
    },
    // 修改项目相关
    handleEdit(row) {
      // 点编辑按钮时执行
      this.dialogFormVisible = true
      this.editForm = {
        'name': row.name,
        'desc': row.desc
      }
      this.editProjectId = row.id
    },
    async updateProject(project_id) {
      // 点编辑对话框内确认按钮时执行
      const response = await this.$api.updateProject(project_id, this.editForm)
      if (response.status === 200) {
        await this.getAllProjects()
        this.dialogFormVisible = false
        this.messageSuccess('修改成功')
      }
      else {
        this.messageError(response.data)
      }
    },
    // 删除项目相关
    handDelete(project_id) {
        // 点删除按钮时执行
        ElMessageBox.confirm(
            `确认删除 id 为 ${project_id} 的项目?`,
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
            // .catch(() => {
            //   this.messageInfo('已取消删除')
            // })
    },
    async delProject(project_id) {
      // 点击删除弹框内确认按钮时执行
      const response = await this.$api.delProject(project_id)
      if (response.status === 204) {
        await this.getAllProjects()
        this.messageSuccess('删除成功')
      }
      else {
        this.messageError(response.data)
      }
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