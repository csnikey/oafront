<template>
<div>
	<el-table
    :data="tableData"
    class="gaptop-lg"
    :stripe='true'
    border
    style="width: 100%">
    <el-table-column
      label="ID"
      prop="id"
      :width='100'>
    </el-table-column>
    <el-table-column
      label="组">
      <template scope="scope">
      	<span
      		style="cursor: pointer; color: blue"
      		v-for="group in scope.row.group_list">
      		<span @click="$router.push({ name: 'permission_groups_edit', query: { id: group.id } })">{{ group.title }}</span>
      		<span> | </span>
      	</span>
      </template>
    </el-table-column>
    <el-table-column
      label="登录名"
      prop="username">
    </el-table-column>
    <el-table-column
      label="真名"
      prop="realname">
    </el-table-column> 
    <el-table-column
      label="手机号"
      prop="mobile">
    </el-table-column>
    <el-table-column
      label="状态"
      prop="status"
      :formatter="statusFormat"
      :width='100'>
    </el-table-column>
    <el-table-column
      label="最近登录"
      prop="last_login"
      :formatter="lastloginFormat">
    </el-table-column>      
    <el-table-column :width="160" label="操作">
      <template scope="scope">
        <el-button
        	type="primary"
          size="small"
          @click="checkAdminDetail(scope.$index, scope.row)">查看</el-button>
        <el-button
        	type="warning"
          size="small"
          @click="$router.push({ name: 'permission_logs', query: { uid: scope.row.id } })">日志</el-button>          
      </template>
    </el-table-column>
  </el-table>

  <!-- 新增/编辑管理员信息 -->
	<el-dialog
	  title="管理员信息"
	  :visible.sync="dialogVisible"
	  size="tiny">
	  <el-input class="gaptop-lg" v-model="activateAdmin.username" placeholder="用户名"></el-input>
	  <el-input class="gaptop-lg" v-model="activateAdmin.password" placeholder="修改密码（可为空）"></el-input>
	  <div class="gaptop-lg">
		  <el-radio v-model="activateAdmin.status" label="1">启用</el-radio>
		  <el-radio v-model="activateAdmin.status" label="2">禁用</el-radio>	
	  </div>
	  <el-select class="gaptop-lg" v-model="activateAdmin.group_list" multiple placeholder="选择权限组">
	    <el-option
	      v-for="group in accessgrouplist"
	      :key="group.id"
	      :label="group.title"
	      :value="group.id">
	    </el-option>
	  </el-select>
	  <div class="gaptop-lg">
	  	<el-button @click="saveAdminInfo()" :loading="submiting" type="primary">保存</el-button>
	  </div>  
	</el-dialog>  
</div>
</template>
<script>
import Moment from 'moment'
import _ from 'lodash'
export default {
	data() {
		return {
			tableData: [],
			accessgrouplist: [],
			dialogVisible: false,
			activateAdmin: {
				id: '',
				username: '',
				password: '',
				group_list: [],
				status: ''
			},
			activateGroups: [],
			submiting: false
		}
	},
	methods: {
		fetchList() {
			this.$fetch.get('/system/system/adminlist')
			.then(res => {
				let { data: { list } } = res
				this.tableData = list
			})			
		},
		lastloginFormat(row) {
			return `${row.last_login} ${row.last_ip}`
		},
		statusFormat(row) {
			return row.status == '1' ? '正常' : '禁用'
		},
		// 查看管理员详情&修改
		checkAdminDetail(index, row) {
			this.activateAdmin.id = row.id
			this.activateAdmin.username = row.username
			this.activateAdmin.status = row.status
			this.activateAdmin.group_list = row.group_list.map(item => item.id)
			this.dialogVisible = true
		},
		// 修改管理员信息提交
		saveAdminInfo() {
			let { id, username, password, group_list, status } = this.activateAdmin
			this.submiting = true
			this.$fetch.post('/system/system/saveadmininfo', { id, username, password, group_list, status })
			.then(res => {
				this.$message('成功')
				this.dialogVisible = false
				this.fetchList()
				this.submiting = false
			})
			.catch(e => {
				this.submiting = false
        this.$notify.error({
          title: '错误',
          message: e.message
        })
			})
		}
	},
	created() {
		this.fetchList()
		// 权限组列表
		this.$fetch.get('/system/system/accessgrouplist')
		.then(res => {
			let { data } = res
			this.accessgrouplist = data
		})		
	}
}
</script>