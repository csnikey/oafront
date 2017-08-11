import axios from 'axios'
import qs from 'qs'
const preurl = process.env.NODE_ENV == 'production'
  ? ''
  : '/api'
const oaurl = 'http://oa.kaikela.dev/'
export default {
  // 获取计划信息
  getPlanInfo(params) {
    return axios.get(`${preurl}/daily/plan/get`).then(d => d.data)
  },
  // 获取用户信息
  getUserinfo() {
    return axios.get(`${preurl}/daily/plan/getuserinfo`)
  },
  // 获取项目阶段
  getProstages(){
    return axios.get(`${preurl}/project/index/getallstage`).then(d => d.data)
  },
  //  获取部门列表
  getDepartList() {
    return axios.get(`${preurl}/system/department/departmentlist`)
  },
  // 获取学年信息 系统学年信息
  getSysTerms(){
    return axios.get(`${preurl}/system/term/getallterm`).then(d => d.data)
  },
    // 根据name获取操学校 （可以id或者name）
  getAssignSchools(params){
    var query = qs.stringify(params);
   return axios.get(`${preurl}/client/school/getschoolbyname?${query}`).then(d => d.data)
  },
  // 根据name获取操作者 （可以id或者name）
  getAssignMembers(params){
    var query = qs.stringify(params);
   return axios.get(`${preurl}/client/school/getmemberbyname?${query}`).then(d => d.data)
  },
  // 获取学年信息
  getTerms(){
   return axios.get(`${preurl}/daily/plan/getTerms`).then(d => d.data)

  },
  // 获取所有总结计划的接口
  getplanlist(params) {
    var query = qs.stringify(params);
    return axios.get(`${preurl}/daily/plan/list?${query}`)
  },

  post(_url, obj) {
    return axios.post(preurl + _url, qs.stringify(obj)).then(d => d.data)
  },
  //  get方式获取参数，吧参数遍历传到url中
  get(_url, params) {
    var query = qs.stringify(params);
    return axios.get(`${preurl}${_url}?${query}`).then(d => d.data)

  },
  //  get方式获取,没有参数的情况
  _getNoQs(_url) {
    axios.get(_url).then(d => d.data)
  },
  createTopic(params) {
    return axios.post(`/topics`, params)
  },



}