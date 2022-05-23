<template>
  <div class="home_box">
    <div class="left_box">
      <div class="user_box">
        <img src="../assets/images/logo.png" class="logo" alt="logo">
        <div class="user_info">
          <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link" style="color: white">
          <el-icon class="el-icon--right"><UserFilled /></el-icon>
          {{username}}
          <el-icon class="el-icon--right"><CaretBottom /></el-icon>
        </span>
            <template v-slot:dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="selectProject">项目选择</el-dropdown-item>
                <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="menu_box"></div>
    </div>
    <div class="right_box">
      <div class="title"></div>
      <div class="main_box"></div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import store from '../store/index.js'
import {CaretBottom, UserFilled} from "@element-plus/icons-vue";

export default {
  components: {UserFilled, CaretBottom},
  computed: {
    username() {
      return store.state.username
    }
  },
  methods: {
    ...mapMutations(['updateState']),

    handleCommand(cmd) {
      if (cmd === 'selectProject') {
        this.$router.push({name: 'all'})
      }
      else if (cmd === 'loginOut') {
        this.$router.push({name: 'login'})
        this.updateState({
          'name': 'isAuthorization',
          'value': false
        })
      }
    }
  }
}
</script>

<style scoped>
.home_box {
  height: 100vh;
  display: flex;
  background-image: linear-gradient(#55aa7f, #2abbd1);
}

.left_box {
  border-right: solid 1px white;
  width: 200px;
}
.user_box {
  height: 60px;
  border-bottom: solid 1px white;
  display: flex;
  align-items: center;
}
.menu_box {
  height: calc(100vh - 61px);
}

.right_box {
  width: calc(100vw - 201px);
}
.title {
  height: 60px;
  border-bottom: solid 1px white;
}
.main_box {
  height: calc(100vh - 61px);
}

.logo {
  width: 40px;
  height: 40px;
}
.user_info {
  flex: 1;
  text-align: center;
}
</style>