<template>
	<div class='c-common-wrap'>
   <!--查询部分-->
   <div class="block"> 
    <el-button type="primary" @click="backlist">返回</el-button>
   <el-button type="primary" @click.stop.prevent="save">保存</el-button>
   </div>

    <div class="block m-addplan"> 

    
  <el-form ref="form" label-width="80px"  :inline="true">
    <el-form-item label="填写人:"  >
      {{form.staff_id}}/{{form.realname}}
    </el-form-item>
 <el-form-item label="填写时间:"  >
      {{form.nowtime}}
    </el-form-item>
   </el-form>
<el-form  label-width="80px" :rules="rules" :model="form">
  <el-form-item label="紧急程度">
    <el-select  placeholder="请选择紧急程度" disabled v-model="form.emery" >
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
    </el-option>
    </el-select>
  </el-form-item>
<br>
  <el-form-item label="*标题" class="block" prop="title">
    <el-input v-model="form.title" ></el-input>
  </el-form-item>
  <el-form-item label="*正文" class="block" prop="content">
   <vue-editor v-model="form.content"></vue-editor>
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
    mounted(){
        this.getNowstr()
    },
   computed:{    
   },
    data() {
      return {
          options:[{
          value: '0',
          label: '一般'
        }, {
          value: '1',
          label: '紧急'
        }],
        rules:{
          title:[
           { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 1,max:30, message: '不超过30个字', trigger: 'blur' }
         ],
          content:[
            { required: true, message: '请输入内容', trigger: 'blur' },
          ]
        },

          form: {
          emery:'0',
          nowtime:'',
          name: '',
          realname:localStorage.getItem('realname')?localStorage.getItem('realname'):'',
          staff_id:localStorage.getItem('staff_id')?localStorage.getItem('staff_id'):'',
          nowtime:'',
          title:'',
          content:'',
        }
    
      }
    },
    components:{
VueEditor
    },
    methods: {
      // 返回列表数据
      backlist(){
             this.$confirm('是否放弃当前操作？', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(() => {
           this.$router.push({ name: `dayplan` })
      })
      },
      getNowstr(){
          var now=new Date();
          var year = now.getFullYear();
        var mon = now.getMonth() + 1;
        if (mon < 10) { mon = 0 + "" + mon };
         var day = now.getDate();
         if(day<10)  day=0+''+day
         var h=now.getHours();
         var min=now.getMinutes();
         var s=now.getSeconds();
         this.form.nowtime=`${year}-${mon}-${day} ${h}:${min}:${s}`

      },
      // 保存信息 新增详情
     save(){
       
        var params={
             type:1,
             title:this.form.title,
             content:this.form.content,
             create_time:this.form.nowtime,
        }
        let checkright=true
        if(params.title.trim()!=''&&params.title.trim().length<=30){

        }else{
          checkright=false
           this.$message({
          message: '请填写30字以内的标题',
          type: 'warning'
        });
        }
        if(checkright){
               this.$fetch.post('/daily/plan/save',params).then(
          res=>{
            if(res.error==0){
                    this.$message({
                  message: '添加计划成功,3s后自动返回计划列表',
                  type: 'success'
                });
                setTimeout(() =>{
                  this.$router.push({ name: `dayplan` })
                }, 3000);
            }else{
               this.$message({
                message: res.msg,
                type: 'warning'
              });
            }
          }
        )

        }
     
     },
     
    }
  }
</script>
<style lang="scss" scoped>
.c-common-wrap{
  padding:10px;
}
.m-addplan{
  margin-top: 20px;
border:1px solid #dcdcdc;
padding:20px 10px;

}




</style>
