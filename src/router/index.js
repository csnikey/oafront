import Vue from 'vue'
import Router from 'vue-router'
import system from '@/router/system' //系统管理
import client from '@/router/client' // 客户管理
import NotFound from '@/views/NotFound' //404
import daily from '@/router/daily'
import promange from '@/router/promange'

Vue.use(Router)

let routes = ([])
	.concat(system).concat(daily).concat(promange)
	.concat(client)

// 递归精简路由，剔除component
function convertRoutes({ path,name,meta,children }){
  const obj = { path, name, meta }
  if(children){
    const newChildren = children.map(convertRoutes)
    obj.children = newChildren
  }
  return obj 
}
const simpleRoutes = routes.map(convertRoutes)

routes.push({
	path: '*',
	name: '404',
  component: NotFound,
  meta: {
    title: '页面未找到',
    level: 1
  }	
})

const router = new Router({
  routes
})

export { router as default, simpleRoutes }
