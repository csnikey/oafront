<template>
  <div id="app">

    <div class="layout__sidebar">
      <div class="layout__sidebar_logo">开课啦OA系统</div>
      <!-- 左侧菜单栏开始 -->
      <el-menu mode="vertical" theme="dark"
        :default-active="currentSubMenu"
        :default-openeds='openeds'
        @select="routeChange">
        <!-- 一级菜单栏 -->
        <el-submenu

          v-for="menu in menus"
          v-if="!menu.meta.launch"
          :key="menu.name"
          :index="menu.name">
          <template slot="title">
            <i class="fa fa-camera-retro"></i>
            {{ menu.meta.title }}
          </template>
          <!-- 二级菜单栏 -->
          <el-menu-item
            v-for="submenu in menu.children"
            :index="submenu.name"
            :key="submenu.path">
            {{ submenu.meta.title }}
          </el-menu-item>
        </el-submenu>
      </el-menu>
      <!-- 左侧菜单栏END -->
    </div>

    <div class="layout__container">
      <!-- 顶部菜单栏开始 -->
      <div class="layout__container_nav">
        <el-menu theme="light" :default-active="currentSystem" mode="horizontal" @select="navChange">
          <el-menu-item
            v-for="system in systems"
            :index="system.name"
            :key="system.path">
            {{ system.meta.title }}
          </el-menu-item>
        </el-menu>
      </div>
      <!-- 顶部菜单栏END -->

      <!-- 路由内容开始 -->
      <div class="layout__container_content">
<!--         <el-breadcrumb separator="/" style="margin-bottom: 10px">
          <el-breadcrumb-item
            v-for="trace of $route.matched"
            :key="trace.name"
            :to="resolveCrumbLink(trace)">
            {{ trace.meta.title }}
          </el-breadcrumb-item>
        </el-breadcrumb> -->

        <router-view></router-view>
      </div>
      <!-- 路由内容END -->
    </div>
    
    <!-- 全局进度条 -->
    <vue-progress-bar></vue-progress-bar>

  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'app',
  data() {
    return {
      navMenu: [],
      activeNav: 'system'
    }
  },

  methods: {
    routeChange(routeName) {
      this.$router.push({ name: routeName })
    },
    navChange(system) {
      this.switchSystem(system)
      this.setSystem(system)
      this.$router.push({ name: `${system}launch` }) // 默认打开快捷面板
    },
    // 面包屑
    resolveCrumbLink(trace) {
      if(!trace.meta.level) return ''
      let destiny = ''
      switch(trace.meta.level) {
        case 0:
          break
        case 1:
          destiny = this.currentSystem + 'launch'
          break
        default:
          destiny = trace.name
          break
      }
      return {
        name: destiny
      }
    },
    ...mapActions(['switchSystem']),
    ...mapMutations(['setSystem'])
  },
  created() {
    // this.$fetch.post('/system/system/modpasswd', {
    //   old_pwd: 123456
    // })
    // .catch(e => {
    //   console.log(e)
    // })

    this.$api.getUserinfo().then(
           res=>{
             let userJson=res.data.data
             let user={
                   realname:userJson.realname,
                   staff_id:userJson.staff_id
             }
             localStorage.setItem("realname",userJson.realname)
             localStorage.setItem("staff_id",userJson.staff_id)
            //  this.$store.state.user.commit('updateUser',user)
           }


    )


    this.$fetch.post('/system/passport/signinforajax', {
      username: 'god',
      password: 'mst112233'
    })
    .catch(e => {
      const h = this.$createElement;
      this.$notify({
        title: '错误',
        message: h('i', { style: 'color: teal'}, e.message)
      });
    })

    // this.initMenu()
  },
  computed: {
    ...mapState({
      systems: state => state.menu.systems,
      menus: state => state.menu.menus,
      openeds: state => state.menu.openeds,
      currentSystem: state => state.menu.currentSystem,
      currentMenu: state => state.menu.currentMenu,
      currentSubMenu: state => state.menu.currentSubMenu,
      currentView: state => state.menu.currentView
    })
  }
}
</script>

<style lang="scss">
.layout__sidebar {
  position: fixed;
  width: 210px;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background-color: #324157;
  .el-menu-item {
    padding: 0 17px;
    height: 50px;
    line-height: 50px;
    color: #fff;
  };
  .el-menu-item.is-active {
    background-color: rgba(29,144,230, .8);
    color: #fff
  }
  .el-menu--dark .el-submenu .el-menu-item:hover {
    background-color: rgba(29,144,230, .9);
  }    
}
.layout__container {
  margin-left: 210px;
}
.layout__sidebar_logo {
  height: 60px;
  text-align: center;
  line-height: 60px;
  font-size: 22px;
  font-weight: bold;
  color: #fff;
}
.layout__container_nav {
  box-shadow: 0 1px 1px 1px rgba(0,0,0, .2);
  .el-menu-item {
    font-size: 16px;
    padding: 0 25px;
  }
  position: fixed;
  width: 100%;
  z-index: 100;
}
.layout__container_nav .el-menu-item.is-active {
  background-color: #dee1e4;
  color: #48576a;
  font-weight: bold;
  border-bottom-color: #48576a;
}
.el-menu--horizontal>.el-menu-item:hover {
  border-bottom-color: #48576a;
}
.el-menu--dark .el-submenu__title {
  background-color: rgba(0,0,0, .1);
  padding-bottom: 15px;
  // box-shadow: 0 1px 2px 0px rgba(0,0,0, .3);
  font-weight: bold;
  color: #fff;
  font-size: 14px
}
.layout__container_content {
  padding: 15px;
  padding-top: 75px;
}
.el-menu--dark .el-submenu .el-menu {
  background-color: #324157;
}
</style>
