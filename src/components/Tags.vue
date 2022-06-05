<template>
  <div class="tags">
    <el-tag closable size="medium" type="info"
            v-for="(tag, index) in tags" :key="index"
            @close="closeTag(tag)" @click="clickTag(tag)">{{tag}}
    </el-tag>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import menus from '../components/menu.js'

export default {
  computed: {
    ...mapState(['tags']),
  },
  methods: {
    ...mapMutations(['removeTag']),

    closeTag(tagName) {
      this.removeTag(tagName)
    },
    clickTag(tagName) {
      const pathname = menus.find((value) => {return value.name === tagName}).pathname
      this.$router.push({name: pathname})
    }

  }
}

</script>

<style scoped>
  .tags {
    display: flex;
    position: relative;
    top: 27px;
  }
  .el-tag {
    margin-right: 3px;
  }
</style>