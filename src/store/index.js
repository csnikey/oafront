import Vue from 'vue'
import Vuex from 'vuex'
import { systemWatcher } from '@/store/plugin'
import user from '@/store/modules/user'
import menu from '@/store/modules/menu'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		user,
		menu
	},
	plugins: [systemWatcher]
})

// 热重载
if(module.hot) {
	module.hot.accept(['@/store/modules/user', '@/store/modules/menu'], () => {
		const newModuleUser = require('@/store/modules/user').default
		const newModuleMenu = require('@/store/modules/menu').default
		store.hotUpdate({
			modules: {
				user: newModuleUser,
				menu: newModuleMenu
			}
		})
	})
}

export default store
