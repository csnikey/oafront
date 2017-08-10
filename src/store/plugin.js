export const systemWatcher = store => {
	store.subscribe(({ type, payload }, state) => {
		if(type == 'routeNavigate') {
			let matched = payload.matched
			let path = payload.path
			if(!state.currentSystem && matched[0].name){
				// 浏览器刷新时获取菜单
				store.dispatch('switchSystem', matched[0].name)
			}
			if(path == '/') {
				console.log('////asdasd')
			}
		}
		if(type == 'setSystem') {
			// setSystem提交时自动获取菜单
			store.dispatch('switchSystem', payload)
		}
	})
}