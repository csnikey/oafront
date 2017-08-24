<template>
<div>
  <el-row :gutter="10">
    <el-col :xs="24" :sm="24" :md="12" :lg="12">
      <el-tree 
        :data="positionlist"
        :props="defaultProps"
        :default-expand-all="true"
        :render-content="renderContent" 
        @node-click="handleNodeClick"
        node-key="id">
      </el-tree>
    </el-col>
  </el-row>
  <!--新增子部门的弹窗信息-->
  <el-dialog :title="formname" :visible.sync="editPopVisiable" size="tiny">
    <el-form :model="form" label-position="left">
      <el-form-item v-model="form.id" :label-width="formLabelWidth" label="编码">
        <el-input v-model="form.id" disabled></el-input>
      </el-form-item>
      <el-form-item class="gaptop-lg" v-model="form.parent_id" :label-width="formLabelWidth" label="隶属层级">
        <el-input v-model="form.parent_name" disabled></el-input>
      </el-form-item>
      <el-form-item class="gaptop-lg" v-model="form.level" :label-width="formLabelWidth" label="岗位层级">
        <el-input v-model="form.level" disabled></el-input>
      </el-form-item>         
      <el-form-item class="gaptop-lg" label="* 岗位名称" :label-width="formLabelWidth">
        <el-input v-model="form.position_name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item class="gaptop-lg" label="* 岗位代号" :label-width="formLabelWidth">
        <el-input v-model="form.code" auto-complete="off"></el-input>
      </el-form-item>      
      <el-form-item class="gaptop-lg" label="岗位级别" :label-width="formLabelWidth">
        <el-input v-model="form.position_rank" auto-complete="off" placeholder="输入整数"></el-input>
      </el-form-item>      
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelEdit()">取 消</el-button>
      <el-button type="primary" @click="handleSubmit()">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>
<script>
export default {
  name:'DepartManage',
  data() {
    return {
      departname: '',
      form:{
        id: '',
        parent_id: '',
        parent_name: '',
        level: '',
        position_name:  '',
        position_rank: ''
      },
      formname: '',
      formLabelWidth:'100px',
      positionlist: [],
      defaultProps: {
        children: 'children',
        label: 'position_name'
      },
      editPopVisiable: false
    }
  },
  methods: {
    append(node, store, data) {
      this.formname = '新增部门'
      this.editPopVisiable = true
      this.form.id = ''
      this.form.code = ''
      this.form.parent_id = node.data.id
      this.form.parent_name = node.data.position_name
      this.form.position_rank = ''
      this.form.level = Number(node.data.level) + 1 + ''
      this.form.position_name = ''
    },

    edit(node, store, data) {
      this.formname = '修改部门信息'
      this.editPopVisiable = true
      this.form.id = node.data.id
      this.form.code = node.data.code
      this.form.parent_id = node.data.parent_id
      this.form.parent_name = node.data.parent_name
      this.form.position_name = node.data.position_name
      this.form.position_rank = node.data.position_rank
      this.form.level = node.data.level
    },
    handleSubmit() {
      this.$fetch.post('/system/position/setposition', Object.assign({}, this.form))
        .then(res => {
          this.$notify({
            type: 'success',
            message: '操作成功'
          })
          this.fetchDepartmentList()
          this.editPopVisiable = false
        })
        .catch(e => {
          this.$notify.error({
            title: '错误',
            message: e.message
          })
        })
    },
    cancelEdit() {
      this.editPopVisiable = false
    },
    renderContent(h, { node, data, store }) {
      return (
        <span>
          <span>
            <span>{node.label}</span>
          </span>
          <span style="float: right; margin-right: 20px">
            <el-button size="mini" on-click={ (event) => {event.stopPropagation(); this.append(node, store, data)} }>
              新增子节点
            </el-button>
            <el-button size="mini" on-click={ (event) => {event.stopPropagation(); this.edit(node, store, data)} }>
              修改
            </el-button>
          </span>
        </span>
      );
    },
    handleNodeClick(data) {
      
    },
    fetchDepartmentList() {
      this.$fetch.get('/system/position/positionlist')
        .then(res => {
          let { data } = res
          this.positionlist = data
        })
    }
  },
  created() {
    this.fetchDepartmentList()
  }
};
</script>
<style lang="scss">
.el-form-item__content .el-input.is-disabled .el-input__inner {
  background-color: #fcfcfc;
  color: #777;
}
</style>
