// 日常办公管理菜单
const daily=[

  {
    title:'日常办公',
    subMenu:[
        {name:'请假',path:'dailyleave'},
        {name:'出差',path:'/daily/dailyout'},
    ]


  },

    {
    title:'总结计划',
    subMenu:[
        {name:'日总结计划',path:'/daily/dayplan'},
        {name:'周总结计划',path:'/daily/weekplan'},
        {name:'月总结计划',path:'/daily/monthplan'},


    ]


  },

]


const system=
[

//   {
//     title:'权限管理',
//     subMenu:[
//         {name:'功能点管理',path:'/funs'},
//         {name:'角色管理',path:'/roles'},
//     ]


//   },

    {
    title:'基础数据',
    subMenu:[
        {name:'部门管理',path:'/departs'},
        {name:'员工管理',path:'/employs'},
        {name:'职能管理',path:'/monthplan'},
        {name:'产品管理',path:'/monthplan'},
        {name:'卡类别管理',path:'/monthplan'},
        {name:'学年学期',path:'/monthplan'},
        {name:'礼品',path:'/monthplan'},
        {name:'物流快递',path:'/monthplan'},
        {name:'考勤管理',path:'/monthplan'},


    ]


  },

]


const promange=
[

//   {
//     title:'项目信息',
//     subMenu:[
//         {name:'项目信息',path:'/funs'},
//         {name:'项目日志',path:'/roles'},
//     ]


//   },
//    {
//     title:'项目费用',
//     subMenu:[
//         {name:'项目优惠',path:'/funs'},
//         {name:'客户公关',path:'/roles'},
//         {name:'客户维护',path:'/roles'},
//         {name:'抹零费用',path:'/roles'},
//         {name:'客户公关',path:'/roles'},
//     ]


//   },

    {
    title:'销售支持',
    subMenu:[
        {name:'发卡申请',path:'/departs'},
        {name:'调货申请',path:'/employs'},
        {name:'开卡申请',path:'/monthplan'},
        {name:'退卡申请',path:'/monthplan'},
        {name:'核对款项申请',path:'/monthplan'},
        {name:'返款申请',path:'/monthplan'},
        {name:'项目合作',path:'/monthplan'},
    ]


  },

]

export default{
  daily,system,promange
}