<template>
  <div class='c-common-wrap'>
    <!--查询部分-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="填写人">
        <el-input v-model="form.name" placeholder="工号或姓名" ></el-input>
      </el-form-item>
      <el-form-item label="所在部门">
        <el-cascader  placeholder="所在部门" :options="departs" :props="treeprops"
    v-model="form.depart"
    @change="optionchange" :change-on-select="singSelect"  filterable clearable :show-all-levels="false">

        </el-cascader>
      </el-form-item>
  
      <el-form-item label="填写日期">
        <el-col :span="11">
          <el-date-picker type="datetime" placeholder="选择日期时间" v-model="form.start_time" style="width: 100%;" :clearable="clearable"></el-date-picker>
        </el-col>
        <el-col class="line" :span="1">&nbsp;~&nbsp;</el-col>
        <el-col :span="11">
          <el-date-picker type="datetime" placeholder="选择日期时间" v-model="form.end_time" style="width: 100%;" clearable></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" style="margin-left:40px">查询</el-button>
        <router-link :to="'adddayplan'" style="margin-left:40px">
          <el-button type="primary">新增</el-button>
        </router-link>
      </el-form-item>
    </el-form>
    <!--表格数据-->
  
    <el-table ref="multipleTable" :data="tableData3" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column prop="title" label="标题" width='80px'>
      </el-table-column>
      <el-table-column prop="realname" label="填写人" width='80px'>
      </el-table-column>
      <el-table-column prop="department" label="所在部门" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="create_time" label="填写时间" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="status" label="审批状态" show-overflow-tooltip width='100px'>
      </el-table-column>
      <el-table-column prop="approver" label="审批人" show-overflow-tooltip>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120px" prop="can_edit">
  
        <template scope="scope">
              
          <el-button  v-if="scope.row.can_edit==1" type="text" size="small" @click="change(scope.row.id)">{{scope.row.can_edit}}修改</el-button>
          <el-button type="text" size="small" @click="info(scope.row.id)">查看</el-button>
          <el-button  v-if='scope.row.can_delete==1' type="text" size="small"
           @click="delete(scope.$index, tableData3,scope.row.id)">删除</el-button>
          <el-button  v-if="scope.row.can_approve==1" type="text" size="small" @click="check(scope.row.id)">审批</el-button>
        </template>
      </el-table-column>
    </el-table>
  
    <!--分页控件-->
    <div class="block" style="text-align:center;margin-top:20px">
  
      <el-pagination layout="prev, pager, next"  :total="totalitems" :current-page="currentpage" :page-size="per_page" @current-change="curChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import api from '@/util/api'
export default {
  name: 'DayPlanManage',
  mounted() {
    // 初始获取部门信息

    this.getApiData({
      type: this.type,
      per_page: this.per_page,
      page:this.currentpage

    }),
    this.getDepartData()

  },
  data() {
    return {
      type:2,
      multipleSelection: [],
      tableData3: [],
      per_page: 10,
      currentpage: 1,
      singSelect:true,
      clearable:true,
      totalitems:1,
      departs: [],
       treeprops:{
            label:'department_name', 
            value:'id',
            children:'children'
       },
      // 选中的部门
      selectedOptions:[],
      form: {
        name: '',
        depart: [],
        selectedDepart:'',
        start_time: '',
        end_time: '',
      }
    }
  },
  methods: {
    // 部门选择改变触发
    optionchange(value){
       let len=value.length
       this.form.depart=value
        this.form.selectedDepart=value[len-1]
    },
    // 获取部门数据
    getDepartData(){
       api.getDepartList().then(
         res=>{
           if(res.status==200){
               this.departs=res.data.data
           }else{
           }
           
         })

    },
    curChange(pageno){
       let params = {
        type: this.type,
        per_page: this.per_page,
        page:pageno
      }
      this.getApiData(params);

    },
    delete(index,rows,id){
    },
      change(id){
        
    },
      info(id){
      
    },
      check(id){
      
    },
    getApiData(params) {
      api.getplanlist(params).then(
        res => {
          if (res.status == 200) {
            var list = res.data.data.list
            var clist = list.map(obj => {
              var status = obj.status
              var statusS = ['正在审核', '审核通过', '驳回']
              obj.status = statusS[status]
              return obj
            })
            this.tableData3 = clist
            this.totalitems = parseInt(res.data.data.totalitems)
          } else {

          }
        })

    },
    getdata() {
      let params = {
        type: this.type,
        per_page: this.pagesize,
        currentpage: this.currentpage,
      }
      this.getApiData(params)
    },
    //查询数据
    onSubmit() {
      var params={
        type:this.type,
        per_page:this.per_page,
        page:1,
        name:this.form.name,
        department_id:this.form.selectedDepart,
        start_time:this.form.start_time,
        end_time:this.form.end_time,

      }
      this.getApiData(params)

    },
    // 删除行
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    // 切换选择
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
}
</script>
<style lang="scss" scope>
.c-common-wrap {
  padding: 10px;
}
</style>
