<template>
	<div class='c-common-wrap'>
   <!--查询部分-->
  <el-form :inline="true"  class="demo-form-inline">
   
    <el-form-item label="请假类型">
      <el-select v-model="form.attendance_id" placeholder="请假类型" >
        <el-option v-for="item in leave_type_list"
                   :key="item.id"
                   :label="item.attendance_name"
                   :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="申请人">
      <el-input v-model="form.name" placeholder="工号或姓名"></el-input>
    </el-form-item>
    <el-form-item label="申请日期">
      <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.start_time" style="width: 100%;"></el-date-picker>
      </el-col>
      <el-col class="line" :span="1" >&nbsp;~&nbsp;</el-col>
     <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.end_time" style="width: 100%;"></el-date-picker>
      </el-col>
  </el-form-item>
  <el-form-item label="紧急程度">
      <el-select v-model="form.emer_status" placeholder="紧急程度">
        <el-option label="一般" value="1"></el-option>
        <el-option label="紧急" value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="审批状态">
      <el-select v-model="form.status" placeholder="审批状态">
        <el-option label="审批中" value="0"></el-option>
        <el-option label="审批通过" value="1"></el-option>
         <el-option label="退回" value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" style="margin-left:40px">查询</el-button>
      <router-link :to="'addleave'" style="margin-left:40px"><el-button type="primary">新增</el-button></router-link>
    </el-form-item>
  </el-form>
<!--表格数据-->

 
  <el-table ref="multipleTable" :data="tableData3" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
     <el-table-column prop="emer_status" label="紧急程度" width="120">
    </el-table-column>
    <el-table-column prop="leave_type" label="请假类型" width="120">
    </el-table-column>
    <el-table-column prop="leave_days" label="请假天数" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="start_time" label="开始时间" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="end_time" label="结束时间" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="workflow_status" label="审批状态" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="cur_approve_desc" label="当前流程" show-overflow-tooltip>
    </el-table-column>
     <el-table-column prop="realname" label="申请人" show-overflow-tooltip>
    </el-table-column>
     <el-table-column prop="create_time" label="申请时间" show-overflow-tooltip>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="120" >
      <template scope="scope">
        <router-link :to='"saveleave/" + scope.row.id' v-if="scope.row.can_edit" ><el-button type="text" size="small" > 修改</el-button></router-link>
        <router-link :to='"leavedetail/" + scope.row.id' ><el-button type="text" size="small" >查看</el-button></router-link>
        <el-button type="text" size="small" v-if="scope.row.can_delete" @click="deleteRow(scope.$index, tableData3, scope.row.id)">删除</el-button>
        <el-button type="text" size="small" v-if="scope.row.can_approve">审批</el-button>
      </template>
    </el-table-column>
  </el-table>


      <!--分页控件-->
      <div class="block" style="text-align:center;margin-top:20px" v-if="totalitems > per_page">

        <el-pagination layout="prev, pager, next"  :total="totalitems" :current-page="currentpage" :page-size="per_page" @current-change="curChange">
        </el-pagination>
      </div>
  </div>
</template>
<script>
// import tableData3
//import api from '@/util/api'
export default {
    name:'DailyLeaveManage',
    mounted() {
        this.getLeaveList({
            per_page: this.per_page,
            page:this.currentpage
        });
        this.getLeaveType();
    },
    data() {
        return {
            tableData3: [],
            multipleSelection: [],
            form: {
                name:'',
                attendance_id:'',
                start_time: '',
                end_time: '',
                emer_status: '',
                status: '',
            },
            per_page: 10,
            totalitems: 0,
            currentpage: 1,
            leave_type_list: []
        }
    },
    methods: {
        onSubmit() {
            this.form.page = this.currentpage;
            this.form.per_page = this.per_page;
            this.getLeaveList(this.form);
        },
        // 删除行
        deleteRow(index, tableData3, id) {
            this.$confirm('删除后将不可恢复，确认要删除吗？', '删除提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$api.post('/daily/leave/delete', {
                    id:id
                }).then(
                    res => {
                        if (res.error == 0) {
                            this.$message({
                                message: '删除请假成功',
                                type: 'success'
                            });
                            tableData3.splice(index, 1);
                            this.tableData3=tableData3;
                            //删除之后 刷新列表
                            // this.onSubmit()
                        }else{
                            this.$message({
                                message: res.data,
                                type: 'warning'
                            });
                        }
                    })
            })
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
        getLeaveList(params){
            this.$api.get('/daily/leave/list', params).then(res => {
                if(res.error == 0) {
                    var list = res.data.list;
                    var clist = list.map(obj => {
                        var status = obj.emer_status;
                        var statusS = ['', '一般', '紧急'];
                        var w_status = obj.workflow_status;
                        var w_status_s = ['审批中', '审批通过', '驳回']
                        obj.emer_status = statusS[status];
                        obj.workflow_status = w_status_s[w_status];
                        return obj
                    });
                    this.tableData3 = clist;
                    this.totalitems = parseInt(res.data.totalitems);
                } else {
                    this.$message({
                        message: res.msg,
                        type: 'warning'
                    });
                }
            })
        },
        getLeaveType(){
            this.$api.get('/daily/leave/gettype').then(res => {
                if(res.error == 0) {
                    this.leave_type_list = res.data;
                } else {
                    this.$message({
                        message: res.msg,
                        type: 'warning'
                    });
                }
            })
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        curChange(pageno) {
            this.currentpage = pageno;
            this.form.page = this.currentpage;
            this.form.per_page = this.per_page;
            this.getLeaveList(this.form);
        }
    }
}
</script>
<style lang="scss" scope>
.c-common-wrap{
  padding:10px;
}





</style>
