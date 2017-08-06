<template>
	<div class='c-common-wrap'>
   <!--查询部分-->
   <div class="block"> 
     <router-link :to='"dayplan"'><el-button type="primary">返回</el-button></router-link>
   <el-button type="primary" @click="save">保存</el-button>
   </div>

    <div class="block m-addplan"> 

    
  <el-form ref="form" label-width="120px"  :inline="true">
    <el-form-item label="填写人:"  >
      {{form.person}}
    </el-form-item>
 <el-form-item label="申请时间:"  >
      {{form.time}}
    </el-form-item>
   </el-form>
<el-form ref="form" label-width="120px" >
 <el-form-item label="*请假类型:">
    <el-select v-model="form.region" placeholder="请假类型"  disabled>
      <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="*紧急程度:">
    <el-select v-model="form.region" placeholder="请选择紧急程度" disabled >
      <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
    </el-select>
  </el-form-item>
    <div class="el-formli-self">
<label class="el-label">*请假时间</label>

  <el-date-picker
      v-model="value1"
      type="datetime"
      placeholder="开始日期"
      :picker-options="pickerOptions0" disabled>
    </el-date-picker>


  <el-date-picker
      v-model="value1"
      type="datetime"
      placeholder="结束日期"
      :picker-options="pickerOptions0" disabled>
    </el-date-picker>

</div>

  <div class="el-formli-self">
    <label class="el-label">*请假天数</label>
    <el-input-number v-model="days" :step="0.5" :min='min' disabled></el-input-number>&nbsp;&nbsp;(0.5天为单位)
 
</div>
<div class="el-formli-self">
    <label class="el-label">*申请描述</label>
   
    
    <el-input type="textarea" disabled>ascsdc</el-input>
 
</div>
</el-form>






</div>

 <div class="block m-addplan"> 
      <div style="padding-left:55px">当前状态：待组长审批</div>
      
      <div class="common-wrap">

         <el-steps :space="100" :active="3" finish-status="success">
           <el-step title="何申请"></el-step>
  <el-step title="组长审批"></el-step>
  <el-step title="中队长"></el-step>
  <el-step title="大队长"></el-step>
  <el-step title="hr总监"></el-step>
</el-steps>
<el-table
    :data="tableData"
    border
    style="width: 100%;margin-top:20px">
    <el-table-column
      prop="date"
      label="节点"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="状态"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="备注">
    </el-table-column>
    <el-table-column
      prop="address"
      label="时间">
    </el-table-column>
  </el-table>
      </div>

      
 </div>

</div>
</template>
<script>
// import tableData3 from '@/data/dayplanlist'
import { VueEditor } from 'vue2-editor'
  export default {
    name:'AddDailyLeave',
    data() {
      return {
        days:'0',
        min:0,
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
          content:'',
          options:[{
          value: '一般',
          label: '一般'
        }, {
          value: '紧急',
          label: '紧急'
        }],
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
<style lang="scss" scoped>
.el-formli-self{
  margin-bottom: 22px;
  padding-left:120px;
  .el-label{
    text-align: right;
    margin-left:-120px;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #48576a;
    line-height: 1;
    padding: 11px 12px 11px 0;
    box-sizing: border-box;
    width:120px;
  }
}
.c-common-wrap{
  padding:10px;
}
.m-addplan{
  margin-top: 20px;
border:1px solid #dcdcdc;
padding:20px 10px;

}


.common-wrap{
  padding-left:60px;
  padding-top:20px;
}


</style>
