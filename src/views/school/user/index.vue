<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="用户姓名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        新增
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
      <el-table-column label="用户姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.realName }}
        </template>
      </el-table-column>
      <el-table-column label="手机号码" align="center">
        <template slot-scope="scope">
          {{ scope.row.userPhone }}
        </template>
      </el-table-column>
      <el-table-column label="登录账号" align="center">
        <template slot-scope="scope">
          {{ scope.row.loginName }}
        </template>
      </el-table-column>
      <el-table-column label="邮箱" align="center">
        <template slot-scope="scope">
          {{ scope.row.userEmail }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.ewStatus | statusFilter">{{ scope.row.ewStatus == 1 ? "可用" : "删除" }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="create_at" label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button v-if="row.ewStatus!=0" size="mini" type="primary" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-if="row.ewStatus!=0" size="mini" type="danger" @click="handleDelete(row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="150px" style="width: 400px; margin-left:130px;">
        <el-form-item label="用户姓名" prop="realName">
          <el-input v-model="temp.realName" />
        </el-form-item>
        <el-form-item label="用户手机号码" prop="userPhone">
          <el-input v-model="temp.userPhone" />
        </el-form-item>
        <el-form-item v-show="dialogStatus==='create'" label="登录账号" prop="loginName">
          <el-input v-model="temp.loginName" />
        </el-form-item>
        <el-form-item v-show="dialogStatus==='create'" label="登录密码" prop="loginPassword">
          <el-input v-model="temp.loginPassword" />
        </el-form-item>
        <el-form-item label="角色" prop="roles">
          <el-select v-model="temp.role" multiple placeholder="请选择角色">
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" prop="userEmail">
          <el-input v-model="temp.userEmail" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确定
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { createUser, updateUser, delUser, selectUser } from '@/api/user'
import { findRoles } from '@/api/role'
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
      roles: null,
      listLoading: true,
      total: 100,
      listQuery: {
        page: 1,
        limit: 5,
        title: '',
        sort: '+id'
      },
      params: {
        pageNum: 1,
        pageSize: 5,
        realName: ''
      },
      temp: {
        id: undefined,
        realName: '',
        userPhone: '',
        loginName: '',
        loginPassword: '',
        userEmail: '',
        schoolId: undefined,
        role: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      rules: {
        realName: [{ required: true, message: '请填写用户姓名', trigger: 'blur' }],
        userPhone: [{ required: true, message: '请填写手机号码', trigger: 'blur' }],
        loginName: [{ required: true, message: '请填写登录账号', trigger: 'blur' }]
      },
      schoolId: undefined
    }
  },
  created() {
    this.schoolId = this.$route.params.id
    this.fetchData()
    this.getRoles()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      this.params.pageNum = this.listQuery.page
      this.params.pageSize = this.listQuery.limit
      this.params.realName = this.listQuery.title
      this.params.schoolId = this.schoolId
      selectUser(this.params).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    getRoles() {
      findRoles().then(response => {
        this.roles = response.data
        console.log(this.roles)
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        realName: '',
        userPhone: '',
        loginName: '',
        loginPassword: '',
        userEmail: '',
        schoolId: this.schoolId,
        role: undefined
      }
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
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createUser(this.temp).then(response => {
            this.resetTemp()
            this.fetchData()
            this.dialogFormVisible = false
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.loginPassword = undefined
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.loginPassword = undefined
          updateUser(this.temp).then(response => {
            this.resetTemp()
            this.fetchData()
            this.dialogFormVisible = false
          })
        }
      })
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delUser(id).then(response => {
          this.fetchData()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
