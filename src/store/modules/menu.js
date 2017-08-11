import { simpleRoutes } from '@/router'

const state = {
	systems: simpleRoutes,
	menus: [],
	openeds: [],
	currentSystem: '',
	currentMenu: '',
	currentSubMenu: '',
	currentView: ''
}

const mutations = {
	routeNavigate(state, to) {
		let matched = to.matched
		state.currentSystem = matched[0] ? matched[0].name : ''
		state.currentMenu = matched[1] ? matched[1].name : ''
		state.currentSubMenu = matched[2] ? matched[2].name : ''
		state.currentView = matched[3] ? matched[3].name : ''
	},
	setSystem(state, system) {
		state.currentSystem = system
	},
	setMenus(state, menus) {
		state.menus = menus
	},
	setOpeneds(state, keyArr) {
		state.openeds = keyArr
	}
}

const actions = {
	// 顶部导航点击时dispatch
	async switchSystem({ dispatch, commit }, system) {
		let menus = await dispatch('getMenus', system)
		commit('setMenus', menus)
		commit('setOpeneds', [ menus[1].name ]) // 默认打开第一栏
	},
	async getSystems() {

	},
	// 获取左侧菜单栏数据
  getMenus({ commit }, system) {
    return new Promise((resolve, reject) => {
      let menus = simpleRoutes.find(route => route.name == system).children
      resolve(menus)
    })
  }
}

export default {
	state,
	mutations,
	actions
}