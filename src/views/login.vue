<template>
  <div class="login_box">
    <el-form :model="loginInfo">
      <el-form-item>
        <el-input v-model="loginInfo.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="loginInfo.password" placeholder="请输入密码" type="password" @keyup.enter="loginRequest"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="loginRequest">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapMutations, mapActions} from 'vuex'

export default {
  data() {
    return {
      'loginInfo': {
        'username': '',
        'password': ''
      }
    }
  },
  methods: {
    ...mapMutations(['updateStates']),
    ...mapActions(['messageSuccess', 'messageError']),
    async loginRequest() {
      const response = await this.$api.login(this.loginInfo)
      // 登录成功处理
      if (response.status === 200) {
        // 将登录响应token保存起来(安全性考虑保存至会话存储中)
        const token = response.data.token
        const states = [
          {'name': 'isAuthorization', 'value': token},
          {'name': 'username', 'value': this.loginInfo.username}
        ]
        this.updateStates(states)
        // 路由访问项目列表首页
        await this.$router.push({name: 'all'})
        // 登录成功的消息提示
        this.messageSuccess('登录成功')
      }
      // 登录失败处理
      else {
        // 登录失败的消息提示
        this.messageError(response.data)
      }
    }
  }
}
</script>

<style scoped>
.login_box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.el-button {
  /*!important表示为css样式提升权重, 解决css样式不生效的问题*/
  color: blue !important;
}
</style>