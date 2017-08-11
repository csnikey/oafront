<template>
<div>
	<div class="menu__catagory gaptop-lg" v-for="menu in menus" :key="menu.name">
		<div class="menu__catagory_title"><span>{{ menu.meta.title }}</span></div>
		<div class="menu__catagory_list gaptop-lg">
			<el-row class="link__group" :gutter="30" v-for="(links, index) in formatLink(menu)" :key="index">
			  <el-col class="link__group_item gaptop-lg" :xs="12" :sm="12" :md="6" :lg="6" v-for="link in links" :key="link.name">
			  	<div @click="$router.push({ name: link.name })">{{ link.meta.title }}</div>
			  </el-col>
			</el-row>
		</div>
	</div>
</div>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
export default {
	data() {
		return {}
	},
	computed: {
		...mapState({
			menus: state => state.menu.menus.slice(1)
		})
	},
	methods: {
		formatLink(menu) {
			return _.chunk(menu.children, 4)
		}
	}
}
</script>

<style lang="scss">
@import'../styles/kit.scss';
.menu__catagory_title {
	color: #35495e;
	font-size: 26px;
	height: 46px;
	line-height: 46px;
	border-bottom: 3px solid #ddd;
	& > span {
		padding: 5px;
		border-bottom: 3px solid #41b883;
	}
}
.link__group {

}
.link__group_item {
	& > div {
		padding: 35px 5px;
		font-size: 20px;
		border-radius: 3px;
		text-align: center;
		// border: 1px solid #ddd;
		cursor: pointer;
		background: #eef1f5;
		&:hover {
			background: #41b883;
			color: #fff;
		}
	}
}
</style>