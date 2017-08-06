<template>
	<div class='c-common-wrap'>
   <!--查询部分-->
   <div class="block"> 
     <router-link :to='"dayplan"'><el-button type="primary">返回</el-button></router-link>
   <el-button type="primary" @click="save">保存</el-button>
   </div>

    <div class="block m-addplan"> 

      
  <el-form ref="form" label-width="80px" class="" v-model="form" :inline="true">
    <el-form-item label="填写人:"  >
      {{form.person}}
    </el-form-item>
 <el-form-item label="填写时间:"  >
      {{form.time}}
    </el-form-item>
   </el-form>  
  <el-form ref="form" :model="form" label-width="80px" >

  <el-form-item label="紧急程度">
    <el-select v-model="form.region" placeholder="请选择紧急程度" disabled >
      <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
    </el-select>
  </el-form-item>
<br>
  <el-form-item label="标题" class="block">
    <el-input v-model="form.name" :disabled="true"></el-input>
  </el-form-item>
  <el-form-item label="正文" class="block">
   <vue-editor v-model="content" :disabled="true"></vue-editor>
  </el-form-item>
</el-form>

 
    </div>
   
<!--审批状态-->
    <div class="block m-addplan">
      <div style="padding-left:35px">审批状态：待审批</div>
      <br>
      <el-form  ref="ruleForm" label-width="100px" class="demo-ruleForm">
 
      <el-form-item label="*审批" prop="desc">
        <el-input type="textarea" v-model="checkdesc"></el-input>
      </el-form-item>

</el-form>


    </div>


</div>
</template>
<script>
// import tableData3 from '@/data/dayplanlist'
import { VueEditor } from 'vue2-editor'
  export default {
    name:'CheckPlan',
    data() {
      return {
          content:'ascasc',
          options:[{
          value: '一般',
          label: '一般'
        }, {
          value: '其他',
          label: '其他'
        }],
        checkdesc:'',
          form: {
          name: '',
          person:'zhangsna',
          time:'2017/7/1 14:28',
          region: '一般',
          date1: '',
          desc:'',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
    
      }
    },
    components:{
VueEditor
    },
    methods: {
      // 保存信息
     save(){

     },
     onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
<style lang="scss" scope>
.c-common-wrap{
  padding:10px;
}
.m-addplan{
  margin-top: 20px;
border:1px solid #dcdcdc;
padding:20px 10px;

}




</style>
