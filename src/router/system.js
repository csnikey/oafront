const scope = 'system'
const viewLoader = function (name) {
  return (resolve) => require([`@/views/${scope}/${name}`], resolve)
}

const Container = resolve => require(['@/views/Container'], resolve)
const Launch = resolve => require(['@/views/Launch'], resolve)
const Groups = resolve => require(['@/views/system/Groups'], resolve)
const GroupsEdit = resolve => require(['@/views/system/GroupsEdit'], resolve)
const Rules = resolve => require(['@/views/system/Rules'], resolve)
const RulesEdit = resolve => require(['@/views/system/RulesEdit'], resolve)
const Settings = resolve => require(['@/views/system/Settings'], resolve)
const Logs = resolve => require(['@/views/system/Logs'], resolve)
const Admins = resolve => require(['@/views/system/Admins'], resolve)

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
            path: 'settings',
            name: 'permission_settings',
            component: Settings,
            meta: {
              title: '个人设置',
              level: 2
            }
          },
          {
            path: 'groups',
            name: 'permission_groups',
            component: Groups,
            meta: {
              title: '管理组列表',
              level: 2
            }
          },
          {
            path: 'groups_edit',
            name: 'permission_groups_edit',
            component: GroupsEdit,
            meta: {
              title: '组权限设置',
              level: 2
            }
          },                
          {
            path: 'rules',
            name: 'permission_rules',
            component: Rules,
            meta: {
              title: '权限点列表',
              level: 2
            }
          },
          {
            path: 'rules_edit',
            name: 'permission_rules_edit',
            component: RulesEdit,
            meta: {
              title: '编辑权限点',
              level: 2
            }
          },
          {
            path: 'logs',
            name: 'permission_logs',
            component: Logs,
            meta: {
              title: '全局操作日志',
              level: 2
            }            
          },
          {
            path: 'admins',
            name: 'permission_admins',
            component: Admins,
            meta: {
              title: '管理员列表',
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
            name: 'permission_depart',
            component:viewLoader('DepartManage'),
            meta: {
              title: '部门管理',
              level: 2
            }
          },
          {
            path: 'positions',
            name: 'permission_positions',
            component:viewLoader('Positions'),
            meta: {
              title: '岗位职能',
              level: 2
            }
          },
          {
            path: 'employees',
            name: 'permission_employees',
            component:viewLoader('Employees'),
            meta: {
              title: '员工管理',
              level: 2
            }
          },                     
          //    {
          //   path: 'employ',
          //   name: 'employ',
          //   component: viewLoader('Groups') ,
          //   meta: {
          //     title: '人员管理',
          //     level: 2
          //   }

          //  },
          //    {
          //   path: 'duty',
          //   name: 'duty',
          //   component: viewLoader('Groups') ,
          //   meta: {
          //     title: '职能管理',
          //     level: 2
          //   }

          //  },
          //    {
          //   path: 'product',
          //   name: 'product',
          //   component: viewLoader('Groups') ,
          //   meta: {
          //     title: '产品管理',
          //     level: 2
          //   }

          //  },
          //    {
          //   path: 'cardtype',
          //   name: 'cardtype',
          //   component: viewLoader('Groups') ,
          //   meta: {
          //     title: '卡种类',
          //     level: 2
          //   }

          //  },
          //    {
          //   path: 'term',
          //   name: 'term',
          //   component: viewLoader('Groups') ,
          //   meta: {
          //     title: '学年学期',
          //     level: 2
          //   }

          //  },
          //    {
          //   path: 'gift',
          //   name: 'gift',
          //   component: viewLoader('Groups') ,
          //   meta: {
          //     title: '礼品',
          //     level: 2
          //   }

          //  },
          //    {
          //   path: 'deliver',
          //   name: 'deliver',
          //   component: viewLoader('Groups') ,
          //   meta: {
          //     title: '物流快递',
          //     level: 2
          //   }

          //  },
          //    {
          //   path: 'attence',
          //   name: 'attence',
          //   component: viewLoader('Groups') ,
          //   meta: {
          //     title: '考勤类别',
          //     level: 2
          //   }

          //  },




        ]
      }      









































































    ]
  }
]