const Container = resolve => require(['@/views/Container'], resolve)
const viewLoader = (name) => (resolve) => require([`@/views/promanage/${name}`], resolve)
const scope = 'promanage'
export default [
  {
    path: `/${scope}`,
    name: scope,
    component: Container,
    meta: {
      title: '项目管理'
    },
    children: [
      {
        component: viewLoader('default'),//默认的面板
        path: `${scope}launch`,
        name: `${scope}launch`,
        meta: {
          title: '快捷面板',
          launch: true,
          level: 1
        }

      },


      {
        path: 'proinfo',
        name: 'proinfo',
        component: Container,
        meta: {
          title: '项目信息',
          level: 1
        },
        children: [
          {
            path: 'proinfomsg',
            name: 'proinfomsg',
            component: viewLoader('default'),
            meta: {
              title: '项目信息',
              level: 2
            },

          },
            {
            path: 'prolist',
            name: 'prolist',
            component: viewLoader('ProlistManage'),
            meta: {
              title: '项目操作',
              level: 2
            },

          },
          {
            path: 'prorecord',
            name: 'prorecord',
            component: viewLoader('default'),
            meta: {
              title: '项目日志',
              level: 2
            },

          },


        ]

      },
      {
        path: 'proinfo',
        name: 'proinfo',
        component: Container,
        meta: {
          title: '项目费用',
          level: 1
        },
        children: [
          {
            path: 'proinfomsg',
            name: 'proinfomsg',
            component: viewLoader('default'),
            meta: {
              title: '项目优惠',
              level: 2
            },

          },
          {
            path: 'prorecord',
            name: 'prorecord',
            component: viewLoader('default'),
            meta: {
              title: '客户公关',
              level: 2
            },

          },
           
           {
            path: 'prorecord',
            name: 'prorecord',
            component: viewLoader('default'),
            meta: {
              title: '客户维护',
              level: 2
            },

          },
          {
            path: 'prorecord',
            name: 'prorecord',
            component: viewLoader('default'),
            meta: {
              title: '抹零费用',
              level: 2
            },

          },
         

        ]

      },
      {
        path: 'proinfo',
        name: 'proinfo',
        component: Container,
        meta: {
          title: '销售支持',
          level: 1
        },
        children: [
          {
            path: 'proinfomsg',
            name: 'proinfomsg',
            component: viewLoader('default'),
            meta: {
              title: '发货申请',
              level: 2
            },

          },
          {
            path: 'prorecord',
            name: 'prorecord',
            component: viewLoader('default'),
            meta: {
              title: '调货申请',
              level: 2
            },

          },
            {
            path: 'proinfomsg',
            name: 'proinfomsg',
            component: viewLoader('default'),
            meta: {
              title: '开卡申请',
              level: 2
            },

          },
          {
            path: 'prorecord',
            name: 'prorecord',
            component: viewLoader('default'),
            meta: {
              title: '退卡申请',
              level: 2
            },

          },
            {
            path: 'proinfomsg',
            name: 'proinfomsg',
            component: viewLoader('default'),
            meta: {
              title: '核对款项申请',
              level: 2
            },

          },
          {
            path: 'prorecord',
            name: 'prorecord',
            component: viewLoader('default'),
            meta: {
              title: '返款项申请',
              level: 2
            },

          },
          {
            path: 'prorecord',
            name: 'prorecord',
            component: viewLoader('default'),
            meta: {
              title: '项目合作',
              level: 2
            },

          },


        ]

      },
     

    ]}


]