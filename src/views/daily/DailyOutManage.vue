<template>
	<div class='c-common-wrap'>
   <!--查询部分-->
  <el-form :inline="true"  class="demo-form-inline">
      <el-form-item label="紧急程度">
      <el-select v-model="form.depart" placeholder="紧急程度">
        <el-option label="一般" value="shanghai"></el-option>
        <el-option label="紧急" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="审批状态">
      <el-select v-model="form.depart" placeholder="审批状态">
        <el-option label="审批中" value="shanghai"></el-option>
        <el-option label="审批通过" value="beijing"></el-option>
         <el-option label="退回" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  
     
    <el-form-item label="申请日期">
      <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
      </el-col>
      <el-col class="line" :span="1" >&nbsp;~&nbsp;</el-col>
     <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%;"></el-date-picker>
      </el-col>
  </el-form-item>
  <el-form-item label="申请人">
      <el-input v-model="form.keyword" placeholder="工号或姓名"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit" style="margin-left:40px">查询</el-button>
      <router-link :to="'adddayplan'" style="margin-left:40px"><el-button type="primary">新增</el-button></router-link>
    </el-form-item>
  </el-form>
<!--表格数据-->

 
  <el-table ref="multipleTable" :data="tableData3" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
     <el-table-column prop="title" label="紧急程度" width="120">
    </el-table-column>
    <el-table-column prop="realname" label="出差目的" width="120">
    </el-table-column>
   
    <el-table-column prop="create_time" label="开始时间" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="status" label="结束时间" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="approver" label="审批状态" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="approve_time" label="当前流程" show-overflow-tooltip>
    </el-table-column>
     <el-table-column prop="approve_time" label="申请人" show-overflow-tooltip>
    </el-table-column>
     <el-table-column prop="approve_time" label="申请时间" show-overflow-tooltip>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="120">
      <template scope="scope">
        <el-button type="text" size="small">修改</el-button>
        <el-button type="text" size="small">查看</el-button>
        <el-button type="text" size="small">删除</el-button>
        <el-button type="text" size="small">审批</el-button>
      </template>
    </el-table-column>
  </el-table>


<!--分页控件-->
   <div class="block" style="text-align:center;margin-top:20px">

  <el-pagination
    layout="prev, pager, next"
    :total="1000">
  </el-pagination>
</div>
  </div>
</template>
<script>
// import tableData3 from '@/data/dayplanlist'
  export default {
    name:'DailyOutManage',
    created() {
      this.$fetch.get('/daily/plan/list?type=1').then(
        function(data){

         console.log(data)

        })
      .catch(e => {
      const h = this.$createElement;
      this.$notify({
        title: '请求列表数据失败',
        message: h('i', { style: 'color: teal'}, e.message)
      });
    })
   

    },
    data() {
      return {
          tableData3: [{
            title:'saecf',
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: [],


             form: {
          keyword:'',
          depart:'',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
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
.c-common-wrap{
  padding:10px;
}





</style>
