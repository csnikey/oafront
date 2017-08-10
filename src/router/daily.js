const Container = resolve => require(['@/views/Container'], resolve)
const viewLoader = (name) => (resolve) => require([`@/views/daily/${name}`], resolve)

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
          path: 'addleave',
          name: 'addleave',
          component: viewLoader('AddDailyLeave'),
          meta: {
            title: '新增请假',
            level: 2
          },

        },
          {
              path: 'saveleave/:id',
              name: 'saveleave',
              component: viewLoader('SaveLeave'),
              meta: {
                  title: '修改请假',
                  level: 2
              },

          },
        {
          path: 'leavedetail/:id',
          name: 'leavedetail',
          component: viewLoader('InfoDailyLeave'),
          meta: {
            title: '请假详情',
            level: 2
          },

        },
         {
          path: 'checkdailyleave',
          name: 'checkdailyleave',
          component: viewLoader('CheckDailyLeave'),
          meta: {
            title: '审批请假',
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
          path: 'addmonthplan',
          name: 'addmonthplan',
          component: viewLoader('AddMonthPlan'),
          meta: {
            title: '添加月计划'
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
          path: 'infoplan/:id',
          name: 'infoplan',
          component: viewLoader('InfoPlan'),
          meta: {
            title: '查看计划'
          }
        },
        {
          path: 'weekplan',
          name: 'weekplan',
          component: viewLoader('WeekplanManage'),
          meta: {
            title: '周总结计划',
            level: 2
          }
        },
        {
          path: 'monthplan',
          name: 'monthplan',
          component: viewLoader('MonthplanManage'),
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