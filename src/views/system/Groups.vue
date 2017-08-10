<template>
<div>
	<div>
		<el-button
			type="primary"
			@click="$router.push({ name: 'permission_groups_edit'})">
			<i class="el-icon-plus"></i> 新增权限组</el-button>
	</div>
	<div class="gaptop-md">	
		<el-alert
	    title="无论如何授权, 上帝组用户有始终拥有全部权限. 其他组请按需求进行授权."
	    type="info"
	    show-icon>
	  </el-alert>
	</div>
  <el-table
    :data="tableData"
    class="gaptop-lg"
    border
    style="width: 100%">
    <el-table-column
      label="ID"
      prop="id">
    </el-table-column>
    <el-table-column
      label="权限组"
      prop="title">
    </el-table-column>
    <el-table-column
      label="组状态"
      prop="status"
      :formatter="statusFormat">
    </el-table-column>       
    <el-table-column label="授予权限">
      <template scope="scope">
        <el-button
        	type="primary"
          size="small"
          @click="$router.push({ name: 'permission_groups_edit', query: { id: scope.row.id } })">查看 | 授权</el-button>
      </template>
    </el-table-column>
  </el-table>

</div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    statusFormat(row) {
      return row.status == '1' ? '正常' : '禁用'
    },
    fetchList() {
      this.$fetch.get('/system/system/accessgrouplist')
        .then(res => {
          let { data } = res
          this.tableData = data
        })
        .catch(e => {
          this.$notify.error({
            title: '错误',
            message: e.message
          })
        })
    }
  },
  created() {
    this.fetchList()
  }
}
</script>