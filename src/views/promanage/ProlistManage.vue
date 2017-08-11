<template>
  <div class='c-common-wrap'>
    <!--查询部分-->
  
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="部门">
        <el-cascader placeholder="选择部门" :options="departs" :props="treeprops" v-model="form.depart" @change="optionchange" :change-on-select="singSelect" filterable clearable :show-all-levels="false">
  
        </el-cascader>
      </el-form-item>
      <el-form-item label="学校名称">
   
        <el-select v-model="form.schid" multiple filterable remote placeholder="模糊搜索学校名称" :remote-method="loadschools" :multiple-limit="limit" >
          <el-option v-for="item in schools" :key="item.id" :label="item.school_name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="营销员">
      
         <el-select v-model="form.creator" multiple filterable remote placeholder="搜索工号/姓名" :remote-method="loadmembers" :multiple-limit="limit" >
          <el-option v-for="item in members" :key="item.id" :label="item.staffname" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目阶段">
        <el-select v-model="form.stage" placeholder="选择项目阶段" clearable>
          <el-option v-for="item in prostages" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="操作学年">
        <el-select v-model="form.term" placeholder="选择学年" clearable>
          <el-option v-for="item in terms" :key="item.id" :label="item.year" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
    <el-checkbox-group v-model="form.overdue">
      <el-checkbox label="收款逾期项目" name="type"></el-checkbox>
      
    </el-checkbox-group>
  </el-form-item>
    
      <el-form-item>
        <el-button type="primary" @click="onSubmit" style="margin-left:40px">查询</el-button>
        <router-link :to="'adddayplan'" style="margin-left:40px">
          <el-button type="primary">新增</el-button>
        </router-link>
      </el-form-item>
    </el-form>
    <!--表格数据-->
  
    <el-table ref="multipleTable" :data="tableData3" border tooltip-effect="dark" style="width: 100%">
      <el-table-column prop="id" label="ID" width='80px'>
      </el-table-column>
      <el-table-column prop="name" label="项目" width='180px'>
      </el-table-column>
      <el-table-column prop="stage" label="项目阶段" show-overflow-tooltip width='120px'>
      </el-table-column>
      <el-table-column prop="target_sales" label="目标金额（元）" show-overflow-tooltip width='160px'>
      </el-table-column>
      <el-table-column prop="report_sales" label="报单销售额（元）" show-overflow-tooltip width='160px'>
      </el-table-column>
      <el-table-column prop="send_sales" label="发货销售额（元）" show-overflow-tooltip width='160px'>
      </el-table-column>
      <el-table-column prop="real_income" label="实收款（元）" show-overflow-tooltip width='140px'>
      </el-table-column>
      <el-table-column prop="space_income" label="差额" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="status" label="项目状态" show-overflow-tooltip width='140px'>
      </el-table-column>
      <el-table-column prop="dept_name" label="部门" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="creator" label="营销员" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="term_year" label="操作学年" show-overflow-tooltip width='140px'>
      </el-table-column>
      <el-table-column prop="create_time" label="录入时间" show-overflow-tooltip width='180px'>
      </el-table-column>
  
      <el-table-column fixed="right" label="操作" width="120px" prop="can_edit">
  
        <template scope="scope">
  
          <el-button v-if="scope.row.can_edit==1" type="text" size="small" @click="change(scope.row.id)">修改</el-button>
          <router-link :to="'infoplan/'+scope.row.id">
            <el-button type="text" size="small">项目详情</el-button>
          </router-link>
          <el-button v-if="scope.row.can_delete==1" type="text" size="small" @click="deleteitem(scope.$index, tableData3,scope.row.id)">用户使用</el-button>
  
        </template>
      </el-table-column>
    </el-table>
  
    <!--分页控件-->
    <div class="block" style="text-align:center;margin-top:20px">
  
      <el-pagination layout="prev, pager, next" :total="totalitems" :current-page="currentpage" :page-size="per_page" @current-change="curChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import api from '@/util/api'
export default {
  name: 'ProlistManage',
  created() {
    // 获取列表信息
    this.getData({
      pagesize: this.per_page,
      currentpage:this.currentpage

    }),
    this.getDepartData()
    this.getProstages()
    this.getProTerms()
  },
  mounted() {

  },
  data() {
    return {
      limit:1,//只允许单选
      tableData3: [],
      per_page: 10,
      currentpage: 1,
      singSelect: true,
      totalitems: 1,
      departs: [],
      prostages: [],
      terms: [],
      schools:[],
      members:[],
      treeprops: {
        label: 'department_name',
        value: 'id',
        children: 'children'
      },
      // 选中的部门
      selectedOptions: [],
      form: {
        overdue:'',
        creator:'',
        stage: '',
        schid: '',
        term: '',
        depart: [],
        selectedDepart: '',
      }
    }
  },
  methods: {
    loadmembers(query){
            if (query!= '') {
         var params={
           name:query
         }
          this.$api.getAssignMembers(params).then(
            res=>{
              if(res.error==0){
                this.members=res.data
              }else{
                // this.$message({
                //   message:res.msg,
                //   type:'warning'
                // })
              }
             
            }
          )
       }else{
         this.members=[]
       }
    },
    // 加载api请求得到学校数据  输入框的值发生改变的时候触发
    loadschools(query){
       if (query !== '') {
         var params={
            school_name:query
         }
          this.$api.getAssignSchools(params).then(
            res=>{
              if(res.error==0){
              this.schools=res.data
              }else{
              // this.$message({
              // message:res.msg,
              // type:'warning'
              // })
            }}
          )
       }else{
         this.schools=[]
       }
    },
    // 获取学年数据
    getProTerms() {
      this.$api.getSysTerms().then(
        res => {
          if (res.error == 0) {
            this.terms = res.data
          } else {
            this.$message({
              type: "warning",
              message: res.msg
            })
          }

        }
      )
    },
    // 获取项目阶段  需要转化字段为标准字段
    getProstages() {
      this.$api.getProstages().then(
        res => {
          if (res.error == 0) {
            let data = res.data;
            let cstages = []
            for (let p in data) {
              let obj = {}
              obj.label = data[p]
              obj.value = p
              cstages.push(obj)
            }
            this.prostages = cstages

          } else {
            this.$message({
              type: "warning",
              message: res.msg
            })
          }

        }
      )
    },
    // 部门选择改变触发
    optionchange(value) {
      let len = value.length
      this.form.depart = value
      this.form.selectedDepart = value[len - 1]
    },
    // 获取部门数据
    getDepartData() {
      api.getDepartList().then(
        res => {
          if (res.status == 200) {
            this.departs = res.data.data
          } else {
            this.$message({
              message: res.msg,
              type: "warning"
            })
          }

        })

    },
    curChange(pageno) {
      this.currentpage = pageno
      let params = {
          pagesize: this.per_page,
        currentpage: pageno,
        school_id:this.form.school_id==''?'':this.form.school_id,
        dept_id: this.form.selectedDepart,
        creator:this.form.creator,
        stage:this.form.stage,
        term_id:this.form.term,
        overdue:this.form.overdue?'1':'',
      }
      this.getData(params);

    },
    // 删除条目
    deleteitem(index, tableData3, id) {
      this.$confirm('删除后将不可恢复，确认要删除吗？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(id);
        this.$api.post('/daily/plan/delete', {
          id: id
        }).then(
          res => {
            if (res.error == 0) {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              tableData3.splice(index, 1);
              this.tableData3 = tableData3;
              //删除之后 刷新列表
              // this.onSubmit()
            } else {
              this.$message({
                message: res.msg,
                type: 'warning'
              });
            }
          })
      })

    },
    change(id) {

    },
    check(id) {

    },
    getData(params) {
      api.get('/project/projectinfo/getlist', params).then(
        res => {
          if (res.error == 0) {
            var list = res.data.list
             var clist =[]
             for(let p in list){
                 var item=list[p];
                 item.space_income = item.real_income-item.report_sales           
                 var statusDesc=['正常','关闭']
                 item.status=statusDesc[item.status]
                  clist.push(item)
             }
            this.tableData3 = clist
            this.totalitems = parseInt(res.data.totalitems)
          } else {
            this.$message({
                message: res.msg,
                type: 'warning'
              });
          }
        })

    },
    getdata() {
      let params = {
        type: 1,
        per_page: this.pagesize,
        currentpage: this.currentpage,
      }
      this.getApiData(params)
    },
    //查询数据
    onSubmit() {
      var params = {
        pagesize: this.per_page,
        currentpage: 1,
        school_id:this.form.schid[0],
        dept_id: this.form.selectedDepart,
        creator:this.form.creator[0],
        stage:this.form.stage,
        term_id:this.form.term,
        overdue:this.form.overdue?'1':'',
        
      }
      this.getData(params)

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
   
  }
}
</script>
<style lang="scss" scope>
.c-common-wrap {
  padding: 10px;
}
</style>
