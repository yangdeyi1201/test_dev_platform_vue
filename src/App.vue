<template>
  <router-view></router-view>
</template>

<script>
export default {
  created() {
      window.addEventListener('beforeunload', () => {
        // 任一页面刷新前触发beforeunload回调函数: 将vuex里刷新前的全局状态保存至sessionStorage中
        sessionStorage.setItem('messageStore', JSON.stringify(this.$store.state))
      })
      // 刷新完成后, 将vuex里的全局状态替换成: 刷新前保存到sessionStorage中的全局状态
      this.$store.replaceState(Object.assign(
          this.$store.state, JSON.parse(sessionStorage.getItem('messageStore'))
      ))
  }
}

</script>

<style scoped>

</style>
