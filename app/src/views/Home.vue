<template>
  <el-container>
    <el-header style="height:80px;padding:0">
      <Header></Header>
    </el-header>
    <el-main style="padding:0;">
      <el-card class="border-bottom">
        <el-image
          style="width: 100px; height: 100px"
          :src="personImg"
          fit="fill">
        </el-image>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import Header from '@/components/Header'
import personImg from '@/assets/person.jpg'

export default {
  name: 'Home',
  components: {
    Header,
  },
  data() {
    return {
      personImg: personImg,
    };
  },
  methods: {
    //
  }
}
</script>

<style lang="less">
.border-bottom{
  border-top:0;
  border-left:0;
  border-right:0;
}
</style>