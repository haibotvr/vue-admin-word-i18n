<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="搜索关键字" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form v-for="detail in scope.row.studyDetail" :key="detail.key" :label="detail.pos" label-position="left" inline class="demo-table-expand">
            <el-form-item label="正确答案">
              <span>{{ detail.answer }}</span>
            </el-form-item>
            <el-form-item label="输入答案">
              <span>{{ detail.writeAnswer }}</span>
            </el-form-item>
            <el-form-item label="是否提示">
              <span>{{ detail.isTip == true ? "是" : "否" }}</span>
            </el-form-item>
            <el-form-item label="是否正确">
              <span>{{ detail.isRight == true ? "是" : "否" }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="create_at" label="学习时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="教材名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.tmName }}
        </template>
      </el-table-column>
      <el-table-column label="章节名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.chapterName }}
        </template>
      </el-table-column>
      <el-table-column label="正确率" align="center">
        <template slot-scope="scope">
          {{ scope.row.correctness + "%" }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.ewStatus | statusFilter">{{ scope.row.ewStatus == 1 ? "可用" : "删除" }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <router-link v-if="row.ewStatus!=0" :to="'/study/log/chapter/'+row.chapterId">
            <el-button type="success" size="mini">
              复习
            </el-button>
          </router-link>
          <router-link v-if="row.ewStatus!=0" :to="'/study/log/chart/'+row.chapterId">
            <el-button type="warning" size="mini">
              曲线
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />

  </div>
</template>

<script>
import { selectLog } from '@/api/log'
import Pagination from '@/components/Pagination'
import waves from '@/directive/waves' // waves directive

export default {
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        0: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      listLoading: true,
      total: 100,
      listQuery: {
        page: 1,
        limit: 10,
        title: '',
        sort: '+id'
      },
      params: {
        pageNum: 1,
        pageSize: 10,
        keyWord: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      this.params.pageNum = this.listQuery.page
      this.params.pageSize = this.listQuery.limit
      this.params.keyWord = this.listQuery.title
      selectLog(this.params).then(response => {
        this.list = response.data.list
        for (const i in this.list) {
          if (this.list[i].studyDetail !== null && this.list[i].studyDetail !== undefined) {
            this.list[i].studyDetail = JSON.parse(this.list[i].studyDetail)
          } else {
            this.list[i].wordCh = []
          }
        }
        this.total = response.data.total
        this.listLoading = false
      })
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchData()
    }
  }
}
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 25%;
  }
</style>
