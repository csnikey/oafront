export const systemWatcher = store => {
	store.subscribe(({ type, payload }, state) => {
		if(type == 'routeNavigate') {
			if(!state.currentSystem && payload[0].name){
				// 浏览器刷新时获取菜单
				store.dispatch('switchSystem', payload[0].name)
			}
		}
		if(type == 'setSystem') {
			// setSystem提交时自动获取菜单
			store.dispatch('switchSystem', payload)
		}
	})
}