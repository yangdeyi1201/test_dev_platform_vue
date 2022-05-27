<template>
  <div class="home_box">
    <div class="left_box">
      <leftMenu></leftMenu>
    </div>
    <div class="right_box">
      <div class="title">
        <Tags></Tags>
      </div>
      <el-card class="main_box" :body-style="{ padding: '0px' }">
        <router-view></router-view>
      </el-card>
    </div>
  </div>
</template>

<script>
import leftMenu from '../components/leftMenu'
import Tags from '../components/Tags.vue'

export default {
  components: {
    'leftMenu': leftMenu,
    'Tags': Tags
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

.right_box {
  width: calc(100vw - 201px);
}

.title {
  height: 60px;
  border-bottom: solid 1px white;
}

.main_box {
  height: calc(100vh - 61px);
  border: 0;
}

</style>