const Container = resolve => require(['@/views/Container'], resolve)
const Launch = resolve => require(['@/views/Launch'], resolve)
const Profiles = resolve => require(['@/views/client/Profiles'], resolve)

const scope = 'client'

export default [
  {
    path: `/${scope}`,
    name: scope,
    component: Container,
    meta: {
      title: '客户管理',
      level: 0
    },
    children: [
      {
        path: `${scope}launch`,
        name: `${scope}launch`,
        component: Launch,
        meta: {
          title: '快捷面板',
          launch: true,
          level: 1
        }
      },    
      {
        path: 'school',
        name: 'school',
        component: Container,
        meta: {
          title: '学校管理',
          level: 1
        },
        children: [
          {
            path: 'profile',
            name: 'profile',
            component: Profiles,
            meta: {
              title: '学校档案管理',
              level: 2
            }
          }        
        ]
      }     
    ]
  }
]