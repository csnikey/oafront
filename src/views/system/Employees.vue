<template>
<div>
  <!-- 查询 -->
  <el-form :inline="true" :model="searchForm">
    <el-form-item style="margin-right: 40px">
      <el-button type="success" @click="handleAdd()">新增员工</el-button>
    </el-form-item>  
    <el-form-item label="工号:">
      <el-input v-model="searchForm.staff_id" placeholder="工号"></el-input>
    </el-form-item>
    <el-form-item label="姓名:">
      <el-input v-model="searchForm.realname" placeholder="姓名"></el-input>
    </el-form-item>    
    <el-form-item label="部门:">
      <el-select v-model="searchForm.department_id" placeholder="部门">
        <el-option
          label="全部"
          :value="''">
        </el-option>      
        <el-option
          v-for="department in departmentlist"
          :key="department.id"
          :label="department.department_name"
          :value="department.id">
        </el-option>
      </el-select>
    </el-form-item>    
    <el-form-item>
      <el-button type="primary" @click="fetchList()">查询</el-button>
    </el-form-item>
  </el-form>  
  <!-- 分页 -->
  <div>
    <el-pagination
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentPageChange"
      :current-page="pagination.currentPage"
      :page-sizes="pagination.pageSizes"
      :page-size="pagination.currentPageSize"
      :layout="pagination.layout"
      :total="pagination.total">
    </el-pagination>    
  </div>
  <!-- 表格 -->
  <el-table
    :data="tableData"
    class="gaptop-lg"
    border
    style="width: 100%">
    <el-table-column
      label="ID"
      prop="id"
      :width="60">
    </el-table-column>
    <el-table-column
      label="工号"
      prop="staff_id">
    </el-table-column>
    <el-table-column
      label="姓名"
      prop="realname">
    </el-table-column>
    <el-table-column
      label="性别"
      prop="gender"
      :formatter= 'genderFormat'>
    </el-table-column>
    <el-table-column
      label="部门"
      prop="department_name">
    </el-table-column> 
    <el-table-column
      label="岗位职能"
      prop="position_name">
    </el-table-column>
    <el-table-column
      label="手机号"
      prop="mobile">
    </el-table-column>
    <el-table-column
      label="电子邮箱"
      prop="email">
    </el-table-column>
    <el-table-column
      label="微信号"
      prop="wechat">
    </el-table-column>
    <el-table-column
      label="状态"
      prop="is_job_name">
    </el-table-column>
    <el-table-column
      label="操作人"
      prop="creator">
    </el-table-column>
    <el-table-column
      label="更新时间"
      prop="create_date">
    </el-table-column>          
    <el-table-column label="操作">
      <template scope="scope">
        <el-button
        	type="primary"
          size="small"
          @click="handleEdit(scope.$index, scope.row)">修改</el-button>
      </template>
    </el-table-column>    
  </el-table>
  <!--新增子部门的弹窗信息-->
  <el-dialog :title="dialogname" :visible.sync="editPopVisiable" size="tiny">
    <el-form :model="form" label-position="left">
      <el-form-item v-model="form.staff_id" :label-width="formLabelWidth" label="* 工号">
        <el-input v-model="form.staff_id"></el-input>
      </el-form-item>
      <el-form-item v-model="form.realname" :label-width="formLabelWidth" label="* 姓名">
        <el-input v-model="form.realname"></el-input>
      </el-form-item>      
      <el-form-item label="* 性别"  :label-width="formLabelWidth" v-model="form.gender">
        <el-radio-group v-model="form.gender">
          <el-radio :label="'1'">男</el-radio>
          <el-radio :label="'0'">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="* 部门" :label-width="formLabelWidth" >
        <el-select v-model="form.department_id" placeholder="部门">   
          <el-option
            v-for="department in departmentlist"
            :key="department.id"
            :label="department.department_name"
            :value="department.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="* 岗位职能" :label-width="formLabelWidth" >
        <el-select v-model="form.position_id" placeholder="岗位职能">   
          <el-option
            v-for="position in positionlist"
            :key="position.id"
            :label="position.position_name"
            :value="position.id">
          </el-option>
        </el-select>
      </el-form-item>          
      <el-form-item v-model="form.mobile" :label-width="formLabelWidth" label="* 手机号">
        <el-input v-model="form.mobile"></el-input>
      </el-form-item>
      <el-form-item v-model="form.email" :label-width="formLabelWidth" label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item v-model="form.wechat" :label-width="formLabelWidth" label="微信号">
        <el-input v-model="form.wechat"></el-input>
      </el-form-item>
      <el-form-item label="* 状态"  :label-width="formLabelWidth" v-model="form.is_job">
        <el-radio-group v-model="form.is_job">
          <el-radio :label="'1'">在职</el-radio>
          <el-radio :label="'0'">离职</el-radio>
        </el-radio-group>
      </el-form-item>                       
    </el-form>  
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelEdit()">取 消</el-button>
      <el-button type="primary" @click="handleSubmit()">保存</el-button>
    </div>

  </el-dialog>  
</div>
</template>
<script>
import _ from 'lodash'
import pagination from '@/mixins/pagination'
export default {
	mixins: [pagination],
	data() {
		return {
			tableData: [],
      searchForm: {
        staff_id: '',
        realname: '',
        department_id: ''
      },
      departmentlist: [],
      positionlist: [],
      // 以下为弹窗相关数据
      dialogname: '',
      editPopVisiable: false,
      formLabelWidth: '100px',
      form: {
        id: '',
        staff_id: '',
        realname: '',
        gender: '',
        department_id: '',
        position_id: '',
        mobile: '',
        email: '',
        wechat: '',
        is_job: ''
      }
		}
	},
	methods: {
		fetchList(index) {
			this.$fetch.get('/system/member/memberlist', {
	  		currentpage: index || this.pagination.currentPage,
	  		pagesize: this.pagination.currentPageSize,
        staff_id: this.searchForm.staff_id,
        realname: this.searchForm.realname,
        department_id: this.searchForm.department_id			
			})
				.then(res => {
	  			let { data: { currentpage, list, totalitems } } = res
	  			if(currentpage == this.pagination.currentPage) {			
	  				this.tableData = list
	  				this.pagination.total = Number(totalitems)
	  			}
				})
	  		.catch(e => {
	        this.$notify.error({
	          title: '错误',
	          message: e.message
	        })
	  		})
		},
    handleAdd() {
      this.form = _.mapValues(this.form, '')
      this.editPopVisiable = true
      this.dialogname = '新增员工'
    },
    handleEdit(i, row) {
      Object.keys(this.form).forEach(key => this.form[key] = row[key])
      this.dialogname = '修改员工信息'
      this.editPopVisiable = true
    },
    cancelEdit() {
      this.editPopVisiable = false
    },
    handleSubmit() {
      this.$fetch.post('/system/member/setmember', Object.assign({}, this.form))
        .then(res => {
          this.$notify({
            type: 'success',
            title: '错误',
            message: '操作成功'
          })
          this.editPopVisiable = false
          this.fetchList()
        })
        .catch(e => {
          this.$notify.error({
            title: '错误',
            message: e.message
          })
        })
    },
    genderFormat(row, col) {
      if(row.gender == '1') return '男'
      if(row.gender == '0') return '女'
      return '其它'
    }
	},
	created() {
    // 员工列表
		this.fetchList()
    // 部门列表
    this.$fetch.get('/system/department/getalldepartment')
      .then(res => {
        let { data } = res
        this.departmentlist = data
      })
    // 岗位列表
    this.$fetch.get('/system/position/getallposition')
      .then(res => {
        let { data } = res
        this.positionlist = data
      })      
	}
}
</script>