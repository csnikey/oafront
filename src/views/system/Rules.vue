<template>
<div>
	<div>
	  <el-alert
	    title="本页仅供开发人员使用, 当您新功能上线后, 请第一时间添加权限以免忘记"
	    type="info"
	    show-icon>
	  </el-alert>	
	</div>
	<div class="gaptop-md">
		<el-button plain @click="$router.push({ name: 'permission_rules_edit' })">
			<i class="el-icon-plus"></i> 新增菜单
		</el-button>
	</div>
	<div class="gaptop-lg">
	  <el-tabs v-model="activeModule" type="border-card">
	    <el-tab-pane v-for="(module, $index) in moduleList"
	    	:key="module.module_name"
	    	:label="module.module_name"
	    	:name="module.module_name">
<!--     			<el-button @click="$router.push({ name: 'permission_rules_add'})">
						<i class="el-icon-plus"></i> 新增模块
					</el-button> -->
	    		<tag-gallary
						:menu="module.menu"
						:module-name="module.module_name">
					</tag-gallary>	
	    </el-tab-pane>
	  </el-tabs>	
<!-- 		<el-row :gutter="16" v-for="(chunk, $index) in moduleList" :key="$index">
			<el-col :span="12" v-for="module in chunk" :key="module.module_name">
				<tag-gallary
					:menu="module.menu"
					:module-name="module.module_name">
				</tag-gallary>				
			</el-col>
		</el-row> -->
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
			moduleList: [],
			activeModule: ''
		}
	},
	created() {
		this.$fetch.get('/system/system/getallrules')
			.then(res => {
				let { data } = res
				this.moduleList = data
				this.activeModule = data[0] ? data[0].module_name : ''
			})
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
</style>