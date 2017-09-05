<template>
<div class="avatar__container">
	<el-popover
	  ref="avatarpop"
	  placement="bottom"
	  width="100"
	  trigger="click">
	  <div class="popover__button" @click="signout()">退出登录</div>
	</el-popover>

	<div class="avatar__content" v-popover:avatarpop>
		<span></span>
		<img :src="defaultAvatar" alt="">
	</div>
</div>
</template>
<script>
import { mapState } from 'vuex'
import defaultAvatar from '@/assets/logo.png'
export default {
	data() {
		return {
			defaultAvatar
		}
	},
	computed: {
		...mapState({
			username: state => state.user.username
		})
	},
	methods: {
		signout() {
      this.$confirm('是否退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
				this.$fetch.post('/system/passport/signout')
					.then(res => {
		        let signinHref = process.env == 'production'
		          ? '/system/passport/signin'
		          : 'http://oa.kaikela.dev/system/passport/signin'
		        window.location.href = signinHref
		      })
		      .catch(e => {})
      }).catch(e => {});			

		}
	}
}
</script>
<style lang="scss">
@import'../styles/kit.scss';
.avatar__container {
	position: fixed;
	top: 0;
	right: 0;
	height: 60px;
	width: 100px;
	line-height: 60px;
	text-align: center;
	cursor: pointer;
	&:hover {
		background: #dedede
	}
}
.avatar__content {
	text-overflow: ellipsis;
	font-size: 16px;
	color: #fff;
	& > img {
		width: 40px;
		vertical-align: middle;
		// border-radius: 50%;
	}
}
.popover__button {
	font-size: 16px;
	text-align: center;
	cursor: pointer;
	padding: 5px 0;
	&:hover {
		background: #dedede
	}	
}
</style>