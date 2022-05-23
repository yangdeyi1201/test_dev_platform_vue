<template>
  <div class="home_box">
    <div class="left_box">
      <div class="user_box">
        <img src="../assets/images/logo.png" class="logo" alt="logo">
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

</script>

<style scoped>
.home_box {
  height: 100vh;
  display: flex;
  background-image: linear-gradient(#55aa7f, #2abbd1);
}

.left_box {
  border-right: solid 1px white;
  width: 250px;
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
  width: calc(100vw - 251px);
}
.title {
  height: 60px;
  border-bottom: solid 1px white;
}
.main_box {
  height: calc(100vh - 61px);
}

.logo {
  width: 50px;
  height: 50px;
}
</style>