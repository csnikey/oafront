<template>
    <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'comp',
  prop:["value"]
  data () {
    return {
      options:[

       {label:1,
       value:1},
       {label:2,
       value:2},
       {label:3,
       value:3},
       {label:4,
       value:4},
     

      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
