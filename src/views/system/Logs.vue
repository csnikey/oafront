<template>
<div>
  <!-- 分页 -->
	<div>
    <el-pagination
    	@size-change="handlePageSizeChange"
      @current-change="handleCurrentPageChange"
      :current-page="pagination.currentPage"
      :page-sizes="pagination.pageSizes"
      :page-size="pagination.currentPageSize"
      :layout="pagination.layout"
      :total="pagination.total">
    </el-pagination>		
	</div>
  <!-- 表格 -->
  <el-table
    :data="tableData"
    class="gaptop-lg"
    border
    style="width: 100%">
    <el-table-column
      label="序号"
      prop="id">
    </el-table-column>
    <el-table-column
      label="管理员ID"
      prop="admin_id">
    </el-table-column>
    <el-table-column
      label="管理员"
      prop="operator">
    </el-table-column>
    <el-table-column
      label="IP"
      prop="ip">
    </el-table-column>
    <el-table-column
      label="控制器"
      prop="func">
    </el-table-column> 
    <el-table-column
      label="类型"
      prop="type"
      :formatter="typeFormat">
    </el-table-column>
    <el-table-column
      label="操作备注"
      prop="remark">
    </el-table-column>
    <el-table-column :width="120" label="提交数据">
      <template scope="scope">
        <el-button
        	type="primary"
          size="small"
          @click="checkLogDetail(scope.$index, scope.row)">查看</el-button>
      </template>
    </el-table-column>
    <el-table-column
      label="时间"
      prop="create_time"
      :formatter="createtimeFormat">
    </el-table-column>      
  </el-table>

  <!-- 查看详情模态框 -->
	<el-dialog
	  title="提交数据详情"
	  :visible.sync="dialogVisible"
	  size="small">
	  <span>{{ dialogContent }}</span>
	</el-dialog>
</div>
</template>

<script>
import Moment from 'moment'
import pagination from '@/mixins/pagination'
export default {
	mixins: [pagination],
  data() {
    return {
      tableData: [],
      uid: '',
      dialogVisible: false,
      dialogContent: ''
    }
  },
  methods: {
    typeFormat(row, col) {
    	let type
    	switch(row.type) {
    		case '1':
    			type = '日志'
    			break
    		case '2':
    			type = '错误'
    			break
    		case '3':
    			type = '警告'
    			break
    	}
    	return type
    },
    createtimeFormat(row, col) {
      return row.create_time
    },
    // 日志列表
    fetchList(index) {
	  	this.$fetch.get('/system/system/loglist', {
	  		currentpage: index || this.pagination.currentPage,
	  		pagesize: this.pagination.currentPageSize,
	  		uid: this.uid
	  	})
  		.then(res => {
  			let { data: { currentpage, list, totalitems } } = res
  			if(currentpage == this.pagination.currentPage) {			
  				this.tableData = list
  				this.pagination.total = Number(totalitems)
  			}
  		})
  		.catch(e => {
        this.$notify.error({
          title: '错误',
          message: e.message
        })
  		})
    },
    // 查看详情
    checkLogDetail(index, row) {
    	this.$fetch.get('/system/system/getlogdetails', {
    		id: row.id
    	})
    	.then(res => {
    		let { data } = res
    		this.dialogContent = data
    		this.dialogVisible = true
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
  	this.uid = this.$route.query.uid || ''
  }
}
</script>