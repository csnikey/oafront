const state = {
	nickname: '',
	sex: 'm',
	age: 18,
	realname:localStorage.getItem('realname')?localStorage.getItem('realname'): '',
	staff_id:localStorage.getItem('staff_id')?localStorage.getItem('realname'): '',
	id:localStorage.getItem('id')?localStorage.getItem('realname'): '',
	status:localStorage.getItem('status')?localStorage.getItem('realname'): '',
	username:localStorage.getItem('username')?localStorage.getItem('realname'): ''
}

const mutations ={
  // 更新用户存储信息,目前的需要仅存储用户真实姓名以及工号
      updateUser(state,user){
		  localStorage.setItem('staff_id',user.staff_id)
		  this.state.staff_id=user.staff_id
		   localStorage.setItem('realname',user.realname)
		  this.state.realname=user.realname
	  }
}
const actions = {

}


export default {
	state
}