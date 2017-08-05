const Container = resolve => require(['@/views/Container'], resolve)
const viewLoader = (name) => (resolve) => require([`@/views/promanage/${name}`], resolve)
export default [
   {
    path: '/promange',
    name: 'promange',
    component: Container,
    meta: {
      title: '项目管理'
    },
    children: [{
           path: 'dailyleave',
            name: 'dailyleave',
            component: viewLoader('DailyleaveManage'),
            meta: {
              title: '请假'
            },

        },
        {
           path: 'dailyout',
            name: 'dailyout',
            component: viewLoader('DailyoutManage'),
            meta: {
              title: '出差'
            },

        },
       {
        path: 'dayplan',
        name: 'dayplan',
        component: viewLoader('PlanManage'),
        meta: {
          title: '日总结计划'
        }
      },
       {
        path: 'weekplan',
        name: 'weekplan',
        component: viewLoader('PlanManage'),
        meta: {
          title: '周总结计划'
        }
      },
       {
        path: 'monthplan',
        name: 'monthplan',
        component: viewLoader('PlanManage'),
        meta: {
          title: '月总结计划'
        }
      },
    ]
  },


]