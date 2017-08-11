<template>
<div>
	<el-checkbox-group v-model="checkedPoints">
	<div class="tag-gallary" v-for="item in menu">
		<div class="tag-gallary__title">
			<span class="tag-gallary__title_text">{{ item.menu_name }}</span>
			<el-checkbox v-if="checkboxMode" :label="item.id"></el-checkbox>
			<!-- 跳转编辑页面 -->			
			<span style="margin-right: 35px"
				v-if="!checkboxMode"		
				@click="$router.push({ name: 'permission_rules_edit', query: { id: item.id } })"> 
				<i class="fa fa-edit"></i>
			</span>
			<span v-if="!checkboxMode"> <i class="fa fa-plus"></i> 新增下级菜单/权限</span>
		</div>
		<div class="tag-gallary__content">
			<el-checkbox-group v-model="checkedPoints">
				<div v-for="point in item.accesspoint" class="accesspoint">
					<el-checkbox v-if="checkboxMode" :label="point.id"></el-checkbox>
					<span><i :class="['fa', point.is_menu === '1' ? 'fa-navicon' : 'fa-file']"></i></span>
					<span>{{ point.title }}</span>
					<!-- 跳转编辑页面 -->
					<span style="cursor: pointer"
						v-if="!checkboxMode"
						@click="$router.push({ name: 'permission_rules_edit', query: { id: point.id } })">
						<i class="fa fa-edit"></i>
					</span>
				</div>
			</el-checkbox-group>
		</div>
	</div>
	</el-checkbox-group>
</div>
</template>
<script>
/***
 * 权限点模块组件
 *
 */
export default {
	data() {
		return {
			checkedPoints: []
		}
	},
	props: {
		moduleName: String,
		menu: Array,
		rules: Array,
		checkboxMode: {
			type: Boolean,
			default: false
		}
	},
	watch: {
		checkedPoints: function(newVal, oldVal) {
			this.$emit('updaterules', {
				name: this.moduleName,
				arr: newVal
			})
		}	
	},
	created() {
		// 过滤下发的rules, 取得该实例中包含的项
		this.rules && this.rules.forEach(rule => {
			let search = this.menu.find(item => {
				return item.id == rule || item.accesspoint.find(point => point.id == rule)
			})
			if(search) this.checkedPoints.push(rule)
		})
	}
}
</script>
<style lang="scss">
@import'../styles/kit.scss';
.tag-gallary {
	padding: 10px 0;
}
.tag-gallary__title {
	font-size: 16px;
	color: $major;
	border-bottom: 1px solid #ddd;
	& > span {
		display: inline-block;
		padding: 12px 0;
		line-height: 24px;
		vertical-align: middle;
		margin-right: 5px;
		&:nth-child(n+2) {
			cursor: pointer
		}
		&:nth-child(n+2):hover {
			color: $primary
		}
	}
}
.tag-gallary__title_text {
	border-bottom: 3px solid $major;
	font-size: 22px;
	letter-spacing: 1px;
}
.tag-gallary__content {
	display: flex;
	flex-wrap: wrap;
	padding: 10px 0;
	.el-checkbox-group {
		display: flex;
		flex-wrap: wrap;
		.el-checkbox__label {
			display: none
		}
	}
}
.accesspoint {
	flex: 0 0 auto;
	height: 30px;
	line-height: 30px;
	margin-top: 5px;
	justify-content: center;
	align-items: center;
	vertical-align: middle;
	display: flex;
	padding: 5px;
	margin-right: 6px;
	border: 1px solid $major;
	border-radius: 3px;
	& span {
		flex: 1 1 auto;
		padding: 0 3px;
	}
}
.el-checkbox__label {
	display: none;
}
</style>