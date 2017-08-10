<template>
  <div class='c-common-wrap'>
    <!--查询部分-->
  
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="部门">
        <el-cascader placeholder="选择部门" :options="departs" :props="treeprops" v-model="form.depart" @change="optionchange" :change-on-select="singSelect" filterable clearable :show-all-levels="false">
  
        </el-cascader>
      </el-form-item>
      <el-form-item label="学校名称">
  
        <el-select v-model="form.schid" multiple filterable remote placeholder="模糊搜索学校名称" :remote-method="loadschools" :multiple-limit="limit">
          <el-option v-for="item in schools" :key="item.id" :label="item.school_name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="营销员">
  
        <el-select v-model="form.creator" multiple filterable remote placeholder="搜索工号/姓名" :remote-method="loadmembers" :multiple-limit="limit">
          <el-option v-for="item in members" :key="item.id" :label="item.staffname" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目阶段">
        <el-select v-model="form.stage" placeholder="选择项目阶段" clearable>
          <el-option v-for="item in prostages" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="操作学年">
        <el-select v-model="form.term" placeholder="选择学年" clearable>
          <el-option v-for="item in terms" :key="item.id" :label="item.year" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-checkbox-group v-model="form.overdue">
          <el-checkbox label="收款逾期项目" name="type"></el-checkbox>
  
        </el-checkbox-group>
      </el-form-item>
  
      <el-form-item>
        <el-button type="primary" @click="onSubmit" style="margin-left:40px">查询</el-button>
  
        <el-button type="primary" style="margin-left:40px" @click="addproFormVisible=true">新增</el-button>
  
      </el-form-item>
    </el-form>
    <!--表格数据-->
  
    <el-table ref="multipleTable" :data="tableData3" border tooltip-effect="dark" style="width: 100%">
      <el-table-column prop="id" label="ID" width='80px'>
      </el-table-column>
      <el-table-column prop="name" label="项目" width='180px'>
      </el-table-column>
      <el-table-column prop="stage" label="项目阶段" show-overflow-tooltip width='120px'>
      </el-table-column>
      <el-table-column prop="target_sales" label="目标金额（元）" show-overflow-tooltip width='160px'>
      </el-table-column>
      <el-table-column prop="report_sales" label="报单销售额（元）" show-overflow-tooltip width='160px'>
      </el-table-column>
      <el-table-column prop="send_sales" label="发货销售额（元）" show-overflow-tooltip width='160px'>
      </el-table-column>
      <el-table-column prop="real_income" label="实收款（元）" show-overflow-tooltip width='140px'>
      </el-table-column>
      <el-table-column prop="space_income" label="差额" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="status" label="项目状态" show-overflow-tooltip width='140px'>
      </el-table-column>
      <el-table-column prop="dept_name" label="部门" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="creator" label="营销员" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="term_year" label="操作学年" show-overflow-tooltip width='140px'>
      </el-table-column>
      <el-table-column prop="create_time" label="录入时间" show-overflow-tooltip width='180px'>
      </el-table-column>
  
      <el-table-column fixed="right" label="操作" width="120px" prop="can_edit">
  
        <template scope="scope">
          <el-button v-if="scope.row.can_edit==1" type="text" size="small" @click="change(scope.row)">修改</el-button>
          <router-link :to="'infopro/'+scope.row.id">
            <el-button type="text" size="small">项目详情</el-button>
          </router-link>
          <router-link :to="'infoproUserage/'+scope.row.id">
            <el-button type="text" size="small">用户使用</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  
    <!--分页控件-->
    <div class="block" style="text-align:center;margin-top:20px">
  
      <el-pagination layout="prev, pager, next" :total="totalitems" :current-page="currentpage" :page-size="per_page" @current-change="curChange">
      </el-pagination>
    </div>
  
    <!--新增项目的弹窗-->
  
    <el-dialog title="新增项目" :visible.sync="addproFormVisible" id="addDialog">
      <el-form :model="addform" ref="addform" :rules="addrules">
        <el-form-item>
          营销员:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{addform.staff_id}}/{{addform.realname}}
        </el-form-item>
        <el-form-item label="客户名称" required prop="school_id">
          <el-select v-model="addform.school_id" placeholder="选择客户" clearable>
            <el-option v-for="item in assignschools" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品类型" required prop="product_id">
          <el-select v-model="addform.product_id" placeholder="选择产品" clearable>
            <el-option v-for="item in protypes" :key="item.id" :label="item.product_name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作学年" required prop="term_id">
          <el-select v-model="addform.term_id" placeholder="选择学年" clearable>
            <el-option v-for="item in terms" :key="item.id" :label="item.year" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作年级" required prop="grade_id">
          <el-select v-model="addform.grade_id" placeholder="选择年级" clearable>
            <el-option v-for="item in grades" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目状态" required prop="status">
          <el-radio class="radio" v-model="addform.status" label="0">正常</el-radio>
          <el-radio class="radio" v-model="addform.status" label="1">关闭</el-radio>
        </el-form-item>
        <el-form-item label="项目描述" prop="detail">
          <el-input type="textarea" v-model="addform.detail"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addproFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addProAction('addform')">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改项目的弹窗-->
  
    <el-dialog title="修改项目" :visible.sync="editproFormVisible" id="editDialog">
      <el-form :model="editform" ref="editform" :rules="addrules">
        <el-form-item>
          营销员:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{editform.creator}}
        </el-form-item>
        <el-form-item label="客户名称" required prop="school_id">
          <el-select v-model="editform.school_id" placeholder="选择客户" clearable>
            <el-option v-for="item in assignschools" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品类型" required prop="product_id">
          <el-select v-model="editform.product_id" placeholder="选择产品" clearable>
            <el-option v-for="item in protypes" :key="item.id" :label="item.product_name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作学年" required prop="term_id">
          <el-select v-model="editform.term_id" placeholder="选择学年" clearable>
            <el-option v-for="item in terms" :key="item.id" :label="item.year" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作年级" required prop="grade_id">
          <el-select v-model="editform.grade_id" placeholder="选择年级" clearable>
            <el-option v-for="item in grades" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目状态" required prop="status">
          <el-radio class="radio" v-model="editform.status" label="0">正常</el-radio>
          <el-radio class="radio" v-model="editform.status" label="1">关闭</el-radio>
        </el-form-item>
        <el-form-item label="项目描述" prop="detail">
          <el-input type="textarea" v-model="editform.detail"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editproFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveProAction('editform')">确 定</el-button>
      </div>
    </el-dialog>
  
  </div>
</template>
<script>
import api from '@/util/api'
export default {
  name: 'ProlistManage',
  created() {
    // 获取列表信息
    this.getData({
      pagesize: this.per_page,
      currentpage: this.currentpage

    }),
      this.getDepartData()
    this.getProstages()
    this.getProTerms()
    this.getAllGrades()
    this.loadassignschools()
    this.loadProtypes()
  },
  mounted() {

  },
  data() {
    return {
      // 增加项目相关字段
      addproFormVisible: false,
      addform: {
        realname: localStorage.getItem('realname') ? localStorage.getItem('realname') : '',
        staff_id: localStorage.getItem('staff_id') ? localStorage.getItem('staff_id') : '',
        school_id: '',
        product_id: '',
        term_id: '',
        grade_id: '',
        status: '0',
        detail: '',
      },
      addrules: {
        school_id: [
          { required: true, message: '请选择客户', trigger: 'change' },
          { required: true, message: '请选择客户', trigger: 'blur' }
        ],
        product_id: [
          { required: true, message: '请选择产品类型', trigger: 'change' },
          { required: true, message: '请选择产品类型', trigger: 'blur' }
        ],
        term_id: [
          { required: true, message: '请选择学年', trigger: 'change' },
          { required: true, message: '请选择学年', trigger: 'blur' }
        ],
        grade_id: [
          { required: true, message: '请选择年级', trigger: 'change' },
          { required: true, message: '请选择年级', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择项目状态', trigger: 'blur' },
        ],
        detail: [
          { required: false, message: '请填写项目描述', trigger: 'blur' },
        ]


      },
      // 修改项目相关字段
      editproFormVisible: false,
      editform: {
        id: '',
        realname: localStorage.getItem('realname') ? localStorage.getItem('realname') : '',
        staff_id: localStorage.getItem('staff_id') ? localStorage.getItem('staff_id') : '',
        school_id: '',
        product_id: '',
        term_id: '',
        grade_id: '',
        status: '0',
        detail: '',
      },
      grades: [],
      protypes: [],
      limit: 1,//只允许单选
      tableData3: [],
      per_page: 10,
      currentpage: 1,
      singSelect: true,
      totalitems: 1,
      departs: [],
      prostages: [],
      terms: [],
      schools: [],
      assignschools: [],
      members: [],
      treeprops: {
        label: 'department_name',
        value: 'id',
        children: 'children'
      },
      // 选中的部门
      selectedOptions: [],
      form: {
        overdue: '',
        creator: '',
        stage: '',
        schid: '',
        term: '',
        depart: [],
        selectedDepart: '',
      }
    }
  },
  methods: {
    // 保存项目的异步请求
    saveProAction(formname) {
      let params = {
        id: this.editform.id,
        school_id: this.editform.school_id,
        product_id: this.editform.product_id,
        term_id: this.editform.term_id,
        grade_id: this.editform.grade_id,
        status: this.editform.status,
        detail: this.editform.detail,
      }

      // 数据验证 如果验证通过提交
      this.$refs[formname].validate((valid) => {
        if (valid) {
          this.$api.post('/project/projectinfo/opt', params).then(res => {
            {
              var type = res.error == 0 ? 'success' : 'warning'
              this.$message({
                message: res.msg,
                type: type
              })
              this.editproFormVisible = false
            }
          })
        } else {
          this.$message({
            message: '仍有必填字段未填',
            type: 'warning'
          })
          return false;
        }
      });
    },
    // 新增项目的异步请求 后台请求数据 关闭弹窗 清空已选择数据
    addProAction(formname) {
      let params = {
        school_id: this.addform.school_id,
        product_id: this.addform.product_id,
        term_id: this.addform.term_id,
        grade_id: this.addform.grade_id,
        status: this.addform.status,
        detail: this.addform.detail,
      }

      // 数据验证 如果验证通过提交
      this.$refs[formname].validate((valid) => {
        if (valid) {
          this.$api.post('/project/projectinfo/opt', params).then(res => {
            {
              var type = res.error == 0 ? 'success' : 'warning'
              this.$message({
                message: res.msg,
                type: type
              })
              this.addproFormVisible = false
              this.$refs[formname].resetFields();
              this.$router.go(0)
            }
          })


        } else {
          this.$message({
            message: '仍有必填字段未填',
            type: 'warning'
          })
          return false;
        }
      });
    },
    // 获取所有的年级  需要转化数据为需要的列表类型
    getAllGrades() {
      this.$api.getAllGrades().then(res => {
        let data = res.data
        if (res.error == 0) {
          let list = []
          for (let p in data) {
            let obj = {};
            obj['label'] = data[p]
            obj['value'] = p
            list.push(obj)
          }
          this.grades = list
        } else {

        }
      })
    },
    // 获取所有的产品类型
    loadProtypes() {
      this.$api.getAllProtypes().then(
        res => {
          if (res.error == 0) {
            this.protypes = res.data
          } else {
            // this.$message({
            // message:res.msg,
            // type:'warning'
            // })
          }
        }
      )
    },
    loadmembers(query) {
      if (query != '') {
        var params = {
          name: query
        }
        this.$api.getAssignMembers(params).then(
          res => {
            if (res.error == 0) {
              this.members = res.data
            } else {
              // this.$message({
              //   message:res.msg,
              //   type:'warning'
              // })
            }

          }
        )
      } else {
        this.members = []
      }
    },
    // 获取自己匹配学校
    loadassignschools() {
      this.$api.getAssignSchools().then(
        res => {
          if (res.error == 0) {
            this.assignschools = res.data
          } else {
            // this.$message({
            // message:res.msg,
            // type:'warning'
            // })
          }
        }
      )
    },
    // 加载api请求得到学校数据  输入框的值发生改变的时候触发
    loadschools(query) {
      if (query !== '') {
        var params = {
          school_name: query
        }
        this.$api.getAllSchools(params).then(
          res => {
            if (res.error == 0) {
              this.schools = res.data
            } else {
              // this.$message({
              // message:res.msg,
              // type:'warning'
              // })
            }
          }
        )
      } else {
        this.schools = []

      }
    },
    // 获取学年数据
    getProTerms() {
      this.$api.getSysTerms().then(
        res => {
          if (res.error == 0) {
            this.terms = res.data
          } else {
            this.$message({
              type: "warning",
              message: res.msg
            })
          }

        }
      )
    },
    // 获取项目阶段  需要转化字段为标准字段
    getProstages() {
      this.$api.getProstages().then(
        res => {
          if (res.error == 0) {
            let data = res.data;
            let cstages = []
            for (let p in data) {
              let obj = {}
              obj.label = data[p]
              obj.value = p
              cstages.push(obj)
            }
            this.prostages = cstages

          } else {
            this.$message({
              type: "warning",
              message: res.msg
            })
          }

        }
      )
    },
    // 部门选择改变触发
    optionchange(value) {
      let len = value.length
      this.form.depart = value
      this.form.selectedDepart = value[len - 1]
    },
    // 获取部门数据
    getDepartData() {
      api.getDepartList().then(
        res => {
          if (res.status == 200) {
            this.departs = res.data.data
          } else {
            this.$message({
              message: res.msg,
              type: "warning"
            })
          }

        })

    },
    curChange(pageno) {
      this.currentpage = pageno
      let params = {
        pagesize: this.per_page,
        currentpage: pageno,
        school_id: this.form.school_id == '' ? '' : this.form.school_id,
        dept_id: this.form.selectedDepart,
        creator: this.form.creator,
        stage: this.form.stage,
        term_id: this.form.term,
        overdue: this.form.overdue ? '1' : '',
      }
      this.getData(params);

    },
    // 删除条目
    deleteitem(index, tableData3, id) {
      this.$confirm('删除后将不可恢复，确认要删除吗？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(id);
        this.$api.post('/daily/plan/delete', {
          id: id
        }).then(
          res => {
            if (res.error == 0) {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              tableData3.splice(index, 1);
              this.tableData3 = tableData3;
              //删除之后 刷新列表
              // this.onSubmit()
            } else {
              this.$message({
                message: res.msg,
                type: 'warning'
              });
            }
          })
      })

    },
    // 结构赋值 吧需要的值结构给editform
    change(pro) {
      // 查询到项目的详情
      this.editproFormVisible = true
      this.editform.id = pro.id
      this.editform.creator = pro.creator
      this.editform.product_id = pro.product_id
      this.editform.school_id = pro.school_id
      this.editform.term_id = pro.term_id
      this.editform.grade_id = pro.grade_id
      let status = pro.status == '正常' ? 0 : 1
      this.editform.status = status + ""
      this.editform.detail = pro.detail
    },
    check(id) {

    },
    getData(params) {
      api.get('/project/projectinfo/getlist', params).then(
        res => {
          if (res.error == 0) {
            var list = res.data.list
            var clist = []
            for (let p in list) {
              var item = list[p];
              item.space_income = item.real_income - item.report_sales
              var statusDesc = ['正常', '关闭']
              item.status = statusDesc[item.status]
              clist.push(item)
            }
            this.tableData3 = clist
            this.totalitems = parseInt(res.data.totalitems)
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        })

    },
    //查询数据
    onSubmit() {
      var params = {
        pagesize: this.per_page,
        currentpage: 1,
        school_id: this.form.schid[0],
        dept_id: this.form.selectedDepart,
        creator: this.form.creator[0],
        stage: this.form.stage,
        term_id: this.form.term,
        overdue: this.form.overdue ? '1' : '',

      }
      this.getData(params)

    },
    // 切换选择
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

  }
}
</script>
<style lang="scss" scope>
.c-common-wrap {
  padding: 10px;
}

.el-dialog__wrapper {
  .el-dialog {
    margin-top: -2%
  }
  .el-form-item {}
}
</style>
