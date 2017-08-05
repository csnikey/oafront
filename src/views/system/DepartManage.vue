<template>
	
  <div>
   <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" :render-content="renderContent" 
  node-key="id"
  ></el-tree>
  <!--新增子部门的弹窗信息-->
 <el-dialog title="新增部门" :visible.sync="addDepart">
   <el-form :model="form">
     <el-form-item v-model="form.departcode" :label-width="formLabelWidth">编码：{{form.departcode}}
     </el-form-item>
      <el-form-item  v-model="form.departpar" :label-width="formLabelWidth">
        隶属层级：销售部门
     </el-form-item>
      <el-form-item  v-model="form.departlev" :label-width="formLabelWidth">
        组织层级:1
     </el-form-item>
    <el-form-item label="组织名称" label-width="100">
      <el-input v-model="form.departname" auto-complete="off"></el-input>
    </el-form-item>
    
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addDepart = false">取 消</el-button>
    <el-button type="primary" @click="addDepart = false">确 定</el-button>
  </div>
</el-dialog>
  </div>

</template>
<script>

  export default {
    name:'DepartManage',
    data() {
      return {

      departname:'',
      form:{
          departcode:'sedwse',
          departpar:'',
          departlev:'',
          dapartname:'',
      },
     formLabelWidth:'200',
      data: [{
          label: '公司',
          children: [{
            label: '开课啦事业部',
            children: [{
              label: '市场部',
              children: [{
                label: '中队1',
              }]
            }]
          },
          {
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          },{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }
          ]}]}
          ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        addDepart:false
      };
    
},
    components:{
// depart
    },
    methods: {
        append(store, data) {
          this.addDepart = true
        // store.append({ id: id++, label: 'testtest', children: [] }, data);
      },

      edit(store, data) {
        store.remove(data);
      },
       renderContent(h, { node, data, store }) {
        return (
          <span>
            <span>
              <span>{node.label}</span>
            </span>
            <span style="float: right; margin-right: 20px">
              <el-button size="mini" on-click={ (event) =>{event.stopPropagation(); this.append(store, data)} }>新增子部门</el-button>
              <el-button size="mini" on-click={ (event) => {event.stopPropagation();this.edit(store, data)} }>修改</el-button>
              
            </span>
          </span>);
      },
      handleNodeClick(data) {
        
      }
    }
  };
</script>
<style lang="scss" scoped>
.el-form-item{
  margin-bottom:0;
}

</style>
