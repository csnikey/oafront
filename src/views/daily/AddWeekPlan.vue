<template>
	<div class='c-common-wrap'>
   <!--查询部分-->
   <div class="block"> 
     <router-link :to='"dayplan"'><el-button type="primary">返回</el-button></router-link>
   <el-button type="primary" @click="save">保存</el-button>
   </div>

    <div class="block m-addplan"> 

    
  <el-form ref="form" label-width="120px" class="" v-model="form" :inline="true">
    <el-form-item label="填写人:"  >
      {{form.person}}
    </el-form-item>
 <el-form-item label="填写时间:"  >
      {{form.time}}
    </el-form-item>
   </el-form>
<el-form ref="form" label-width="120px" >
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
<div class="el-formli-self">
<label class="el-label">*弘文周</label>

  <el-select v-model="form.term" placeholder="学年">
    <el-option
      v-for="item in terms"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>


  <el-select v-model="form.targetweek" placeholder="洪文周">
    <el-option
      v-for="item in weeks"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>

</div>
<div class="el-formli-self">
<label class="el-label">学年总目标:</label>
<el-table
      :data="yearData"
      >
      <el-table-column
        prop="date"
        label="个人收款额（元）"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="个人销售额（元）"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="个人操作项目数">
      </el-table-column>
       <el-table-column
        prop="address"
        label="团队收款额（元）">
      </el-table-column>
       <el-table-column
        prop="address"
        label="团队销售额（元）">
      </el-table-column>
       <el-table-column
        prop="address"
        label="团队操作项目数">
      </el-table-column>
    </el-table>
</div>
<div class="el-formli-self">
<label class="el-label">本周情况:</label>
   <el-table
      :data="yearData"
      >
      <el-table-column
        prop="date"
        label=""
       >
      </el-table-column>
      <el-table-column
        prop="name"
        label="本周个人目标"
       >
      </el-table-column>
      <el-table-column
        prop="address"
        label="本周个人实际完成情况" >
      </el-table-column>
       <el-table-column
        prop="address"
        label="本周个人完成比">
      </el-table-column>
       <el-table-column
        prop="address"
        label="本周团队目标" >
      </el-table-column>
       <el-table-column
        prop="address"
        label="本周团队实际完成情况">
      </el-table-column>
       <el-table-column
        prop="address"
        label="本周团队完成比" >
      </el-table-column>
    </el-table>
</div>

  <el-form-item label="*本周总结分析">
    <el-input type="textarea" v-model="form.summary"  placeholder="数据分析，市场分析，团队管理，本周亮点与不足"></el-input>
  </el-form-item>


  <hr>
  <h2>下周计划</h2><br>
  <h3>个人</h3>
    <div class="el-formli-self2">
      <label class="el-label">收款额（元）:</label>
      <el-input v-model="trems" placeholder="请输入内容"></el-input>
        <label class="el-label">签单数:</label>
      <el-input v-model="trems" placeholder="请输入内容"></el-input>
        <label class="el-label">操作数:</label>
      <el-input v-model="trems" placeholder="请输入内容"></el-input>
        <label class="el-label">铺垫数:</label>
      <el-input v-model="trems" placeholder="请输入内容"></el-input>
        <label class="el-label">维护数:</label>
      <el-input v-model="trems" placeholder="请输入内容"></el-input>
       
  </div>

  <h3>团队</h3>
    <div class="el-formli-self2">
      <label class="el-label">收款额（元）:</label>
      <el-input v-model="trems" placeholder="请输入内容"></el-input>
        <label class="el-label">签单数:</label>
      <el-input v-model="trems" placeholder="请输入内容"></el-input>
        <label class="el-label">操作数:</label>
      <el-input v-model="trems" placeholder="请输入内容"></el-input>
        <label class="el-label">铺垫数:</label>
      <el-input v-model="trems" placeholder="请输入内容"></el-input>
        <label class="el-label">维护数:</label>
      <el-input v-model="trems" placeholder="请输入内容"></el-input>
       
  </div>
  <el-form-item label="*下周工作思路" label-width="120px">
    <el-input type="textarea" v-model="form.summary"  placeholder="数据分析，市场分析，团队管理，本周亮点与不足"></el-input>
  </el-form-item>

</el-form>

 

 
    </div>
   
  </div>
</template>
<script>
// import tableData3 from '@/data/dayplanlist'
import { VueEditor } from 'vue2-editor'
  export default {
    name:'AddDayPlan',
    data() {
      return {
          content:'',
          terms:[
           {
          value: '学年',
          label: '学年'
        }, {
          value: '学年',
          label: '学年'
        }


          ],
           weeks:[
           {
          value: '洪文周',
          label: '洪文周'
        }, {
          value: '洪文周',
          label: '洪文周'
        }
          ],
          options:[{
          value: '一般',
          label: '一般'
        }, {
          value: '紧急',
          label: '紧急'
        }],
        yearData:[



        ],
          form: {
            summary:'',
            targetweek:"洪文周",
            term:'学年',
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
.el-formli-self2{
   margin: 15px 0;
   padding-left:20px;
  .el-input{
    width:100px;
    margin-right:10px;
  }
   .el-label{
    text-align: right;
    margin-bottom:20px;
    vertical-align: middle;
    font-size: 14px;
    color: #48576a;
    line-height: 1;
    padding: 11px 12px 11px 0;
    box-sizing: border-box;
    width:120px;
  }

}
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




</style>
