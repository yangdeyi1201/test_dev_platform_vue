<template>
  <div class="user_box">
    <img src="../assets/images/logo.png" class="logo" alt="logo">
    <div class="user_info">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link" style="color: white">
          <span class="el-icon-user-solid"></span>
          {{username}}
          <span class="el-icon-caret-bottom"></span>
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
  <div class="menu_box">
    <el-menu  :router="true"
              active-text-color="#ffd04b"
              default-active="1"
              text-color="white"
              style="background: none">
      <el-menu-item :index="menu.path" v-for="menu in menus">
        <span :class="menu.icon"></span>
        <span>{{menu.name}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import store from '../store/index.js'
import menus from '../components/menu.js'

export default {
  data() {
    return {
      'menus': menus
    }
  },
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
.user_box {
  height: 60px;
  border-bottom: solid 1px white;
  display: flex;
  align-items: center;
}

.logo {
  width: 40px;
  height: 40px;
  position: relative;
  left: 18px;
}

.user_info {
  flex: 1;
  text-align: center;
}

.el-dropdown-link {
  font-size: large !important;
}

.menu_box {
  height: calc(100vh - 61px);
}

.el-menu-item:focus,
.el-menu-item:hover {
  background: #328c62;
}

.el-menu-item {
  font-size: 16px;
}

.el-menu {
  border-right: 0;
}
</style>