const Container = resolve => require(['@/views/Container'], resolve)
const viewLoader = (name) => (resolve) => require([`@/views/daily/${name}`], resolve)
const AccountManage = resolve => require(['@/views/system/AccountManage'], resolve)

const scope = 'daily'
export default [
  {
    path: `/${scope}`,
    name: scope,
    component: Container,
    meta: {
      title: '日常办公管理'
    },
    children: [{
      component: viewLoader('DailyManage'),//默认的面板
      path: `${scope}launch`,
      name: `${scope}launch`,
      meta: {
        title: '快捷面板',
        launch: true,
        level: 1
      }

    },
    {
      path: 'dailywork',
      name: 'dailywork',
      component: Container,
      meta: {
        title: '日常办公',
        level: 1
      },
      children: [
        {
          path: 'dailyleave',
          name: 'dailyleave',
          component: viewLoader('DailyleaveManage'),
          meta: {
            title: '请假',
            level: 2
          },

        },
        {
          path: 'dailyout',
          name: 'dailyout',
          component: viewLoader('DailyoutManage'),
          meta: {
            title: '出差',
            level: 2
          },

        },


      ]

    },
    {
      path: 'plan',
      name: 'plan',
      component: Container,
      meta: {
        title: '总结计划',
        level: 1
      },
      children: [
        {
          path: 'dayplan',
          name: 'dayplan',
          component: viewLoader('DayplanManage'),
          meta: {
            title: '日总结计划',
            level: 2
            
          }
        },
        {
          path: 'adddayplan',
          name: 'adddayplan',
          component: viewLoader('AddDayPlan'),
          meta: {
            title: '添加日计划'
          }
        },
         {
          path: 'addweekplan',
          name: 'addweekplan',
          component: viewLoader('AddWeekPlan'),
          meta: {
            title: '添加周计划'
          }
        },
        {
          path: 'checkplan',
          name: 'checkplan',
          component: viewLoader('CheckPlan'),
          meta: {
            title: '审批计划'
          }
        },
        {
          path: 'infoplan',
          name: 'infoplan',
          component: viewLoader('InfoPlan'),
          meta: {
            title: '查看计划'
          }
        },
        {
          path: 'weekplan',
          name: 'weekplan',
          component: viewLoader('PlanManage'),
          meta: {
            title: '周总结计划',
            level: 2
          }
        },
        {
          path: 'monthplan',
          name: 'monthplan',
          component: viewLoader('PlanManage'),
          meta: {
            title: '月总结计划',
            level: 2
          }
        }


      ]

    },

    ]
  },


]