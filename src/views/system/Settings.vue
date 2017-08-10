<template>
<div>
	<el-row :gutter="20">
	  <el-col :span="10" :offset="7">
	  	<h2>修改密码</h2>
			<el-input class="gaptop-lg" v-model="old_pwd" placeholder="原密码"></el-input>
			<el-input class="gaptop-lg" v-model="new_pwd" placeholder="新密码"></el-input>
			<el-input class="gaptop-lg" v-model="new_pwd_confirm" placeholder="确认密码"></el-input>
			<div class="gaptop-lg">
				<el-button type="primary" :loading="occupied" @click="submitPwdChange()">确认提交</el-button>
			</div>
	  </el-col>
	</el-row>	
</div>
</template>
<script>
export default {
  data() {
  	return {
  		old_pwd: '',
  		new_pwd: '',
  		new_pwd_confirm: '',
  		occupied: false
  	}
  },
  methods: {
  	submitPwdChange() {
  		this.occupied = true
  		this.$fetch.post('/system/system/modpasswd', {
  			old_pwd: this.old_pwd,
  			new_pwd: this.new_pwd,
  			new_pwd_confirm: this.new_pwd_confirm
  		})
  		.then(data => {
  			this.occupied = false
  			this.$message({
  				type: success,
  				message: '密码成功修改'
  			})
  		})
  		.catch(e => {
  			this.occupied = false
  			this.$message.error(e.message)
  		})
  	}
  }
}
</script>