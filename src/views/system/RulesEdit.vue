<template>
<div>
	<div class="gaptop-md">
		<el-button type="primary" @click="$router.push({ name: 'permission_rules' })">
			<i class="el-icon-arrow-left"></i> 返回权限列表
		</el-button>
	</div>	
	<div style="padding: 10px 10%" class="gaptop-lg">
		<!-- 权限名 -->
		<el-row class="formrow gaptop-md" :gutter="20">
		  <el-col :xs="24" :sm="6" :md="3" :lg="3">权限名：</el-col>
		  <el-col :xs="24" :sm="18" :md="9" :lg="9"><el-input v-model="title" placeholder="输入权限名"></el-input></el-col>
		</el-row>
		<!-- 是否作为菜单 -->
		<el-row class="formrow gaptop-md" :gutter="20">
		  <el-col :xs="24" :sm="6" :md="3" :lg="3">作为菜单：</el-col>
		  <el-col :xs="24" :sm="18" :md="9" :lg="9">
	  		<el-radio v-model="is_menu" label="1">是</el-radio>
			  <el-radio v-model="is_menu" label="0">否</el-radio>	
		  </el-col>
		</el-row>				
		<!-- 权限 -->
		<el-row class="formrow gaptop-md" :gutter="20">
		  <el-col :xs="24" :sm="6" :md="3" :lg="3">权限：</el-col>
		  <el-col :xs="24" :sm="18" :md="9" :lg="9" style="height: 100%">
			  <el-select v-model="selected.module" placeholder="选择模块" @change="handleModuleChange">
			    <el-option
			      v-for="module in moduleslist"
			      :key="module.key"
			      :label="module.key"
			      :value="module.key">
			    </el-option>
			  </el-select>
			  <el-select v-model="selected.controller" placeholder="选择controller" @change='switchActionList'
			  	v-show="is_menu !== '1'">
			    <el-option
			      v-for="controller in controllerslist"
			      :key="controller.name"
			      :label="controller.name"
			      :value="controller.name">
			    </el-option>
			  </el-select>
			  <el-select v-model="selected.action" placeholder="选择action"
			  	v-show="is_menu !== '1'">
			    <el-option
			      v-for="action in actionslist"
			      :key="action.name"
			      :label="action.name"
			      :value="action.name">
			    </el-option>
			  </el-select>		  	  
		  </el-col>
		</el-row>
		<!-- 路由地址 -->
		<el-row class="formrow gaptop-md" :gutter="20" v-show="is_menu === '1'">
		  <el-col :xs="24" :sm="6" :md="3" :lg="3">路由地址：</el-col>
		  <el-col :xs="24" :sm="18" :md="9" :lg="9">
				<el-input v-model="url" placeholder="输入路由地址"></el-input>	
		  </el-col>
		</el-row>		
		<!-- 父级菜单 -->
		<el-row class="formrow gaptop-md" :gutter="20">
		  <el-col :xs="24" :sm="6" :md="3" :lg="3">父级菜单：</el-col>
		  <el-col :xs="24" :sm="18" :md="9" :lg="9" style="height: 100%">
			  <el-select v-model="selected.pid" placeholder="选择父级">
			    <el-option
			      v-for="menu in menulist"
			      :key="menu.id"
			      :label="menu.menu_name"
			      :value="menu.id">
			    </el-option>
			  </el-select>
			 </el-col>
		</el-row>
		<!-- 是否启用 -->
		<el-row class="formrow gaptop-md" :gutter="20">
		  <el-col :xs="24" :sm="6" :md="3" :lg="3">是否启用：</el-col>
		  <el-col :xs="24" :sm="18" :md="9" :lg="9">
	  		<el-radio v-model="status" label="1">启用</el-radio>
			  <el-radio v-model="status" label="2">禁用</el-radio>	
		  </el-col>
		</el-row>
		<!-- 图标 -->
		<el-row class="formrow gaptop-md" :gutter="20" v-show="is_menu === '1'">
		  <el-col :xs="24" :sm="6" :md="3" :lg="3">图标：</el-col>
		  <el-col :xs="24" :sm="18" :md="9" :lg="9">
				<el-input v-model="icon" placeholder="输入icon"></el-input>	
		  </el-col>
		</el-row>
		<!-- 菜单排序 -->
		<el-row class="formrow gaptop-md" :gutter="20" v-show="is_menu === '1'">
		  <el-col :xs="24" :sm="6" :md="3" :lg="3">菜单排序：</el-col>
		  <el-col :xs="24" :sm="18" :md="9" :lg="9">
				<el-input v-model="sort_order" placeholder="输入整数，越大越靠前"></el-input>	
		  </el-col>
		</el-row>		
		<!-- 备注 -->
		<el-row class="formrow gaptop-md" :gutter="20" >
		  <el-col :xs="24" :sm="6" :md="3" :lg="3">备注：</el-col>
		  <el-col :xs="24" :sm="18" :md="9" :lg="9">
				<el-input v-model="remark" placeholder="输入备注"></el-input>	
		  </el-col>
		</el-row>
		<!-- 提交 -->
		<el-row class="formrow gaptop-lg" :gutter="20" >
		  <el-col :xs="24" :sm="6" :md="3" :lg="3"></el-col>
		  <el-col :xs="24" :sm="18" :md="9" :lg="9">
				<el-button type="primary" @click="submitEdition()">确认提交</el-button>
		  </el-col>
		</el-row>	
	</div>		 
</div>
</template>
<script>
export default {
	data() {
		return {
			lock: false, // 控制首次加载的锁
			id: '0',
			title: '',
			status: '1',
			is_menu: '1',
			url: '',
			icon: '',
			remark: '',
			sort_order: '',
			moduleslist: [],
			controllerslist: [],
			actionslist: [],
			menulist: [],
			selected: {
				module: '',
				controller: '',
				action: '',
				pid: '0'
			}
		}
	},
	methods: {
		async initData() {
			// 模块列表
			let moduleslist, accesspointInfo
			moduleslist = await this.$fetch.get('/system/system/getmoduleslist').catch(e => this.$message.error(e.message))
			this.moduleslist = moduleslist.data

			if(this.id != '0') {
				accesspointInfo = await this.$fetch.get('/system/system/getaccesspoint', {
					id: this.id
				})
			}
			
			if(accesspointInfo && accesspointInfo.data) {
				let { data } = accesspointInfo
				this.selected.module = data.module
				this.title = data.title
				this.status = data.status
				this.is_menu = data.is_menu
				this.url = data.url
				this.remark = data.remark
				this.icon = data.icon
				this.selected.pid = data.pid		
				this.selected.controller = data.contr
				this.selected.action = data.action
			} else {
				this.selected.module = this.moduleslist[0].key
			}

			// controllers列表
			let controllers = await this.$fetch.get('/system/system/getcontrollerbymodule', {
				module: this.selected.module
			})
			this.controllerslist = controllers.data
		},
		// 切换module
		handleModuleChange() {
			if(this.lock) {	
				this.selected.controller = ''
				this.selected.pid = ''
			}
			this.$fetch.get('/system/system/getmenubymodule', {
				module: this.selected.module
			})
			.then(res => {
				let { data } = res
				data.unshift({
					id: '0',
					menu_name: '#作为一级菜单#'
				})
				this.menulist = data
				this.lock = true
			})
		},
		// 切换action
		switchActionList() {
			if(this.lock) {
				this.selected.action = ''
			}
			let search = this.controllerslist.find(item => item.name == this.selected.controller)
			if(search) this.actionslist = search.action_list
		},
		// 提交
		submitEdition() {
			let params = {}
			if(this.is_menu == "1") {
				params = {
					id: this.id,
					is_menu: this.is_menu,
					title: this.title,
					module: this.selected.module,
					status: this.status,
					pid: this.selected.pid,
					url: this.url,
					sort_order: this.sort_order,
					icon: this.icon,
					remark: this.remark
				}
			} else if( this.is_menu == '0') {
				params = {
					id: this.id,
					is_menu: this.is_menu,
					title: this.title,
					module: this.selected.module,
					status: this.status,
					pid: this.selected.pid,
					contr: this.selected.controller,
					action: this.selected.action,
					remark: this.remark								
				}
			}
			this.$fetch.post('/system/system/saveaccesspoint', params)
				.then(res => {
	        this.$notify({
	        	type: 'success',
	          title: '成功',
	          message: '保存成功, 即将返回权限列表'
	        })
	        setTimeout(() => {
	        	this.$router.push({ name: 'permission_rules' })
	        },1000)
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
		let id = this.$route.query.id
		this.id = id ? id : '0'
		this.initData()
	}
}
</script>
<style lang="scss">
.formrow > div {
	height: 44px;
	line-height: 44px;
}
</style>