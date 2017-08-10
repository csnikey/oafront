<template>
<div>
	<div class="gaptop-md">
		<el-button type="primary" @click="$router.push({ name: 'permission_groups' })">
			<i class="el-icon-arrow-left"></i> 返回管理组列表
		</el-button>
		<el-button type="success" :loading="submiting" @click="submitEdition()">
			保存设置
		</el-button>		
	</div>
	<div>
		<!-- 权限名 -->
		<el-row class="formrow gaptop-lg" :gutter="20">
		  <el-col :xs="24" :sm="6" :md="3" :lg="3">权限名：</el-col>
		  <el-col :xs="24" :sm="18" :md="9" :lg="9"><el-input v-model="title" placeholder="输入权限名"></el-input></el-col>
		</el-row>
		<!-- 是否作为菜单 -->
		<el-row class="formrow gaptop-lg" :gutter="20">
		  <el-col :xs="24" :sm="6" :md="3" :lg="3">是否启用：</el-col>
		  <el-col :xs="24" :sm="18" :md="9" :lg="9">
	  		<el-radio v-model="status" label="1">启用</el-radio>
			  <el-radio v-model="status" label="0">禁用</el-radio>	
		  </el-col>
		</el-row>	
	</div>
	<div class="gaptop-lg">
	  <el-tabs v-model="activeModule" type="border-card">
	    <el-tab-pane v-for="(module, $index) in moduleList"
	    	:key="module.module_name"
	    	:label="module.module_name"
	    	:name="module.module_name">
	    		<tag-gallary
	    			@updaterules="updaterules"
	    			:rules="rules"
	    			:checkboxMode="true"
						:menu="module.menu"
						:module-name="module.module_name">
					</tag-gallary>	
	    </el-tab-pane>
	  </el-tabs>
	</div>		
</div>
</template>
<script>
import _ from 'lodash'
import TagGallary from '@/components/TagGallary'
export default {
	components: {
		TagGallary
	},
	data() {
		return {
			id: '0',
			title: '',
			status: '',
			rules: [],
			rulesBuffer: {}, // 接受各个子组件冒泡的rules
			moduleList: [],
			activeModule: '',
			submiting: false
		}
	},
	methods: {
		initData() {
			if(this.id != '0') {
				this.$fetch.get('/system/system/getgrouprules', {
					id: this.id
				})
				.then(res => {
					console.log('getgrouprules', res)
					let { data } = res
					this.title = data.group_name
					this.status = data.status
					this.rules = data.rules
				})
			}

			this.$fetch.get('/system/system/getallrules')
			.then(res => {
				let { data } = res
				this.moduleList = data
				this.activeModule = data[0] ? data[0].module_name : ''
			})
		},
		updaterules(rule) {
			this.rulesBuffer[rule.name] = rule.arr // 保证接收的数据 各自独立
			this.rules = _.flatten(Object.keys(this.rulesBuffer).map(key => this.rulesBuffer[key]))
		},
		submitEdition() {
			this.submiting = true
			this.$fetch.post('/system/system/savegrouprules', {
				id: this.id,
				title: this.title,
				status: this.status,
				rules: this.rules
			})
			.then(res => {
				this.submiting = false
        this.$notify({
        	type: 'success',
          title: '成功',
          message: '保存成功'
        })	
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
		let { query } = this.$route
		this.id = query.id
		this.initData()
	}
}
</script>
<style lang="scss">
@import'../../styles/kit.scss';
.el-tabs__item {
	font-size: 18px;
	color: $major;
	height: 54px;
	line-height: 54px;
	&:hover {
		background-color: rgba(256,256,256, .5);
	}
}
.el-tabs__item.is-active {
	font-weight: bold;
	color: $major;
}
.el-tabs__active-bar {
	background-color: $strong;
}
.el-tabs--border-card {
	// box-shadow: 0 1px 1px 0 rgba(0,0,0,.12), 0 0 1px 0 rgba(0,0,0,.04);
	box-shadow: none;
}
.formrow > div {
	height: 40px;
	line-height: 40px;
}
</style>
