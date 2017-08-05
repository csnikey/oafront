const Container = resolve => require(['@/views/Container'], resolve)
const Launch = resolve => require(['@/views/Launch'], resolve)
const viewLoader = (name) => (resolve) => require([`@/views/system/${name}`], resolve)

const scope = 'system'

export default [
  {
    path: `/${scope}`,
    name: scope,
    component: Container,
    meta: {
      title: '系统管理',
      level: 0
    },
    children: [
      {
        component:Launch,
        path: `${scope}launch`,
        name: `${scope}launch`,
        meta: {
          title: '快捷面板',
          launch: true,
          level: 1
        }
      
      },
      {
        path: 'permission',
        name: 'permission',
        component: Container,
        meta: {
          title: '权限管理',
          level: 1
        },
        children: [
          {
            path: 'account',
            name: 'account',
            component:viewLoader('AccountManage') ,
            meta: {
              title: '账号管理',
              level: 2
            }
          }        
        ]
      },
      {
        path: 'data',
        name: 'data',
        component: Container,
        meta: {
          title: '基础数据',
          level: 1
        },
        children: [      

           {
            path: 'depart',
            name: 'depart',
            component:viewLoader('DepartManage'),
            meta: {
              title: '部门管理',
              level: 2
            }

           },
             {
            path: 'employ',
            name: 'employ',
            component: viewLoader('AccountManage') ,
            meta: {
              title: '人员管理',
              level: 2
            }

           },
             {
            path: 'duty',
            name: 'duty',
            component: viewLoader('AccountManage') ,
            meta: {
              title: '职能管理',
              level: 2
            }

           },
             {
            path: 'product',
            name: 'product',
            component: viewLoader('AccountManage') ,
            meta: {
              title: '产品管理',
              level: 2
            }

           },
             {
            path: 'cardtype',
            name: 'cardtype',
            component: viewLoader('AccountManage') ,
            meta: {
              title: '卡种类',
              level: 2
            }

           },
             {
            path: 'term',
            name: 'term',
            component: viewLoader('AccountManage') ,
            meta: {
              title: '学年学期',
              level: 2
            }

           },
             {
            path: 'gift',
            name: 'gift',
            component: viewLoader('AccountManage') ,
            meta: {
              title: '礼品',
              level: 2
            }

           },
             {
            path: 'deliver',
            name: 'deliver',
            component: viewLoader('AccountManage') ,
            meta: {
              title: '物流快递',
              level: 2
            }

           },
             {
            path: 'attence',
            name: 'attence',
            component: viewLoader('AccountManage') ,
            meta: {
              title: '考勤类别',
              level: 2
            }

           },




        ]
      }      









































































    ]
  }
]