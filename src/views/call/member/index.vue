<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.titleRealName" placeholder="姓名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.titleRealSex" placeholder="性别" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.titleJob" placeholder="职务" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.titleJobCategory" placeholder="职务类别" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.titlePhone" placeholder="手机" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.titlePhone2" placeholder="手机2" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.titleCompanyName" placeholder="公司名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.titleKeywords" placeholder="关键字" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.titleProvince" placeholder="省份" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.titleCity" placeholder="城市" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.titleIndustry" placeholder="行业" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.titleIndustryNew" placeholder="行业（新）" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.titleIndustryDetail" placeholder="细分行业" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.titleFromPerson" placeholder="来源人" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.titleDataFrom" placeholder="数据来源" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.titleDataStatus" placeholder="状态" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.titleRemark" placeholder="备注" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.titleIndustryAi" placeholder="是否AI行业" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.titleOfficeEmail" placeholder="企业邮箱" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.titleDepartment" placeholder="部门" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.titleCompanyPersonNumber" placeholder="公司人数" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.titlePcNumber" placeholder="PC数量" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.titleAnnualTurnover" placeholder="营业额" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.titleRegCapital" placeholder="注册资本" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.titleHaveOfficeEmail" placeholder="请选择是否有企业邮箱" style="width: 200px;" class="filter-item">
        <el-option label="是" value="Y" />
        <el-option label="否" value="N" />
      </el-select>
      <br>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        新增
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-refresh" @click="resetQuery">
        重置
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-download" @click="handleExport">
        导出
      </el-button>
      <el-upload
        style="float:right"
        :multiple="false"
        :auto-upload="true"
        :show-file-list="false"
        :drag="false"
        action=""
        accept="xlsAccept:'application/vnd.ms-excel'"
        :http-request="handleTarget"
      >
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-upload" :loading="uploadLoading">公司批量匹配</el-button>
      </el-upload>
      <el-upload
        style="float:right"
        :multiple="false"
        :auto-upload="true"
        :show-file-list="false"
        :drag="false"
        action=""
        accept="xlsAccept:'application/vnd.ms-excel'"
        :http-request="uploadFile"
      >
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-upload" :loading="uploadLoading">信息上传与更新</el-button>
      </el-upload>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      height="1000"
      @sort-change="sortChange"
    >
      <el-table-column align="center" label="序号" fixed>
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="create_at" label="时间" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.dataTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.realName }}
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          {{ scope.row.realSex }}
        </template>
      </el-table-column>
      <el-table-column label="部门" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.department }}
        </template>
      </el-table-column>
      <el-table-column label="职务" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.job }}
        </template>
      </el-table-column>
      <el-table-column label="职务类别" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.jobCategory }}
        </template>
      </el-table-column>
      <el-table-column label="区号" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.areaCode }}
        </template>
      </el-table-column>
      <el-table-column label="电话" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.telephone }}
        </template>
      </el-table-column>
      <el-table-column label="分机号" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.extensionNumber }}
        </template>
      </el-table-column>
      <el-table-column label="区号2" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.areaCode2 }}
        </template>
      </el-table-column>
      <el-table-column label="电话2" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.telephone2 }}
        </template>
      </el-table-column>
      <el-table-column label="分机号2" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.extensionNumber2 }}
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column label="手机号2" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.phone2 }}
        </template>
      </el-table-column>
      <el-table-column label="公司名称" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.companyName }}
        </template>
      </el-table-column>
      <el-table-column label="关键字" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.keywords }}
        </template>
      </el-table-column>
      <el-table-column label="省份" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.province }}
        </template>
      </el-table-column>
      <el-table-column label="城市" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.city }}
        </template>
      </el-table-column>
      <el-table-column label="地址" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column label="邮编" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.postCode }}
        </template>
      </el-table-column>
      <el-table-column label="行业" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.industry }}
        </template>
      </el-table-column>
      <el-table-column label="行业(新)" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.industryNew }}
        </template>
      </el-table-column>
      <el-table-column label="细分行业" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.industryDetail }}
        </template>
      </el-table-column>
      <el-table-column label="企业性质" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.companyNature }}
        </template>
      </el-table-column>
      <el-table-column label="公司人数" align="center">
        <template slot-scope="scope">
          {{ scope.row.companyPersonNumber }}
        </template>
      </el-table-column>
      <el-table-column label="PC数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.pcNumber }}
        </template>
      </el-table-column>
      <el-table-column label="年营业额" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.annualTurnover }}
        </template>
      </el-table-column>
      <el-table-column label="传真1" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.fax1 }}
        </template>
      </el-table-column>
      <el-table-column label="传真2" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.fax2 }}
        </template>
      </el-table-column>
      <el-table-column label="来源人" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.fromPerson }}
        </template>
      </el-table-column>
      <el-table-column label="数据来源" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.dataFrom }}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column label="邮箱1" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.email1 }}
        </template>
      </el-table-column>
      <el-table-column label="邮箱2" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.email2 }}
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.remark }}
        </template>
      </el-table-column>
      <el-table-column label="是否AI行业" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.industryAi }}
        </template>
      </el-table-column>
      <el-table-column label="企业邮箱" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.officeEmail }}
        </template>
      </el-table-column>
      <el-table-column label="数据更新时间" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.updateTime }}
        </template>
      </el-table-column>
      <el-table-column label="注册资本" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.regCapital }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="{row}">
          <el-button size="mini" type="primary" @click="handleUpdate(row)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="50%">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 500px; margin-left:50px;">
        <el-form-item label="姓名" prop="realName">
          <el-input v-model="temp.realName" />
        </el-form-item>
        <el-form-item label="性别" prop="realSex">
          <el-input v-model="temp.realSex" />
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="temp.department" />
        </el-form-item>
        <el-form-item label="职务" prop="job">
          <el-input v-model="temp.job" />
        </el-form-item>
        <el-form-item label="职务类别" prop="jobCategory">
          <el-input v-model="temp.jobCategory" />
        </el-form-item>
        <el-form-item label="区号" prop="areaCode">
          <el-input v-model="temp.areaCode" />
        </el-form-item>
        <el-form-item label="电话" prop="telephone">
          <el-input v-model="temp.telephone" />
        </el-form-item>
        <el-form-item label="分机号" prop="extensionNumber">
          <el-input v-model="temp.extensionNumber" />
        </el-form-item>
        <el-form-item label="区号2" prop="areaCode2">
          <el-input v-model="temp.areaCode2" />
        </el-form-item>
        <el-form-item label="电话2" prop="telephone2">
          <el-input v-model="temp.telephone2" />
        </el-form-item>
        <el-form-item label="分机号2" prop="extensionNumber2">
          <el-input v-model="temp.extensionNumber2" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="temp.phone" />
        </el-form-item>
        <el-form-item label="手机号2" prop="phone2">
          <el-input v-model="temp.phone2" />
        </el-form-item>
        <el-form-item label="公司名称" prop="companyName">
          <el-input v-model="temp.companyName" />
        </el-form-item>
        <el-form-item label="关键字" prop="keywords">
          <el-input v-model="temp.keywords" />
        </el-form-item>
        <el-form-item label="省份" prop="province">
          <el-input v-model="temp.province" />
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="temp.city" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="temp.address" />
        </el-form-item>
        <el-form-item label="邮编" prop="postCode">
          <el-input v-model="temp.postCode" />
        </el-form-item>
        <el-form-item label="行业" prop="industry">
          <el-input v-model="temp.industry" />
        </el-form-item>
        <el-form-item label="行业(新)" prop="industryNew">
          <el-input v-model="temp.industryNew" />
        </el-form-item>
        <el-form-item label="细分行业" prop="industryDetail">
          <el-input v-model="temp.industryDetail" />
        </el-form-item>
        <el-form-item label="企业性质" prop="companyNature">
          <el-input v-model="temp.companyNature" />
        </el-form-item>
        <el-form-item label="公司人数" prop="companyPersonNumber">
          <el-input v-model="temp.companyPersonNumber" />
        </el-form-item>
        <el-form-item label="PC数量" prop="pcNumber">
          <el-input v-model="temp.pcNumber" />
        </el-form-item>
        <el-form-item label="年营业额" prop="annualTurnover">
          <el-input v-model="temp.annualTurnover" />
        </el-form-item>
        <el-form-item label="传真1" prop="fax1">
          <el-input v-model="temp.fax1" />
        </el-form-item>
        <el-form-item label="传真2" prop="fax2">
          <el-input v-model="temp.fax2" />
        </el-form-item>
        <el-form-item label="来源人" prop="fromPerson">
          <el-input v-model="temp.fromPerson" />
        </el-form-item>
        <el-form-item label="数据来源" prop="dataFrom">
          <el-input v-model="temp.dataFrom" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-input v-model="temp.status" />
        </el-form-item>
        <el-form-item label="邮箱1" prop="email1">
          <el-input v-model="temp.email1" />
        </el-form-item>
        <el-form-item label="邮箱2" prop="email2">
          <el-input v-model="temp.email2" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="temp.remark" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="temp.remark" />
        </el-form-item>
        <el-form-item label="是否AI行业" prop="industryAi">
          <el-input v-model="temp.industryAi" />
        </el-form-item>
        <el-form-item label="企业邮箱" prop="officeEmail">
          <el-input v-model="temp.officeEmail" />
        </el-form-item>
        <el-form-item label="数据更新时间" prop="updateTime">
          <el-input v-model="temp.updateTime" />
        </el-form-item>
        <el-form-item label="注册资本" prop="regCapital">
          <el-input v-model="temp.regCapital" />
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
import { createCall, updateCall, delCall, selectCall, importContacts, exportContacts, exportTargetContacts } from '@/api/call'
import { parseTime } from '@/utils'
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
      uploadLoading: false,
      total: 100,
      listQuery: {
        page: 1,
        limit: 50,
        titleRealName: '',
        titleRealSex: '',
        titleJob: '',
        titleJobCategory: '',
        titlePhone: '',
        titlePhone2: '',
        titleCompanyName: '',
        titleKeywords: '',
        titleProvince: '',
        titleCity: '',
        titleIndustry: '',
        titleIndustryNew: '',
        titleIndustryDetail: '',
        titleDataFrom: '',
        titleFromPerson: '',
        titleDataStatus: '',
        titleRemark: '',
        titleIndustryAi: '',
        titleOfficeEmail: '',
        titleDepartment: '',
        titleCompanyPersonNumber: '',
        titlePcNumber: '',
        titleRegCapital: '',
        titleAnnualTurnover: '',
        titleHaveOfficeEmail: '',
        sort: '+id'
      },
      params: {
        pageNum: 1,
        pageSize: 50,
        realName: '',
        realSex: '',
        job: '',
        jobCategory: '',
        phone: '',
        phone2: '',
        companyName: '',
        keywords: '',
        province: '',
        city: '',
        industry: '',
        industryNew: '',
        industryDetail: '',
        datafrom: '',
        fromPerson: '',
        dataStatus: '',
        remark: '',
        industryAi: '',
        officeEmail: '',
        department: '',
        companyPersonNumber: '',
        pcNumber: '',
        regCapital: '',
        annualTurnover: '',
        haveOfficeEmail: ''
      },
      temp: {
        id: undefined,
        realName: '',
        realSex: '',
        department: '',
        job: '',
        jobCategory: '',
        areaCode: '',
        telephone: '',
        extensionNumber: '',
        areaCode2: '',
        telephone2: '',
        extensionNumber2: '',
        phone: '',
        phone2: '',
        companyName: '',
        keywords: '',
        province: '',
        city: '',
        address: '',
        postCode: '',
        industry: '',
        industryNew: '',
        industryDetail: '',
        companyNature: '',
        companyPersonNumber: '',
        pcNumber: '',
        annualTurnover: '',
        fax1: '',
        fax2: '',
        fromPerson: '',
        dataFrom: '',
        dataStatus: '',
        email1: '',
        email2: '',
        remark: '',
        industryAi: '',
        officeEmail: '',
        regCapital: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      rules: {
        realName: [{ required: true, message: '请填写姓名', trigger: 'blur' }]
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
      this.params.realName = this.listQuery.titleRealName
      this.params.realSex = this.listQuery.titleRealSex
      this.params.job = this.listQuery.titleJob
      this.params.jobCategory = this.listQuery.titleJobCategory
      this.params.phone = this.listQuery.titlePhone
      this.params.phone2 = this.listQuery.titlePhone2
      this.params.companyName = this.listQuery.titleCompanyName
      this.params.keywords = this.listQuery.titleKeywords
      this.params.province = this.listQuery.titleProvince
      this.params.city = this.listQuery.titleCity
      this.params.industry = this.listQuery.titleIndustry
      this.params.industryNew = this.listQuery.titleIndustryNew
      this.params.industryDetail = this.listQuery.titleIndustryDetail
      this.params.datafrom = this.listQuery.titleDataFrom
      this.params.fromPerson = this.listQuery.titleFromPerson
      this.params.dataStatus = this.listQuery.titleDataStatus
      this.params.remark = this.listQuery.titleRemark
      this.params.industryAi = this.listQuery.titleIndustryAi
      this.params.officeEmail = this.listQuery.titleOfficeEmail
      this.params.pcNumber = this.listQuery.titlePcNumber
      this.params.companyPersonNumber = this.listQuery.titleCompanyPersonNumber
      this.params.department = this.listQuery.titleDepartment
      this.params.annualTurnover = this.listQuery.titleAnnualTurnover
      this.params.regCapital = this.listQuery.titleRegCapital
      this.params.haveOfficeEmail = this.listQuery.titleHaveOfficeEmail
      selectCall(this.params).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    resetQuery() {
      this.listQuery = {
        page: 1,
        limit: 10,
        titleRealName: '',
        titleRealSex: '',
        titleJob: '',
        titleJobCategory: '',
        titlePhone: '',
        titlePhone2: '',
        titleCompanyName: '',
        titleKeywords: '',
        titleProvince: '',
        titleCity: '',
        titleIndustry: '',
        titleIndustryNew: '',
        titleIndustryDetail: '',
        titleDataFrom: '',
        titleFromPerson: '',
        titleDataStatus: '',
        titleRemark: '',
        titleIndustryAi: '',
        titleOfficeEmail: '',
        titleDepartment: '',
        titlePcNumber: '',
        titleCompanyPersonNumber: '',
        titleRegCapital: '',
        titleAnnualTurnover: '',
        titleHaveOfficeEmail: '',
        sort: '+id'
      }
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        realName: '',
        realSex: '',
        department: '',
        job: '',
        jobCategory: '',
        areaCode: '',
        telephone: '',
        extensionNumber: '',
        areaCode2: '',
        telephone2: '',
        extensionNumber2: '',
        phone: '',
        phone2: '',
        companyName: '',
        keywords: '',
        province: '',
        city: '',
        address: '',
        postCode: '',
        industry: '',
        industryNew: '',
        industryDetail: '',
        companyNature: '',
        companyPersonNumber: '',
        pcNumber: '',
        annualTurnover: '',
        fax1: '',
        fax2: '',
        fromPerson: '',
        dataFrom: '',
        dataStatus: '',
        email1: '',
        email2: '',
        remark: '',
        industryAi: '',
        officeEmail: '',
        regCapital: ''
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
          createCall(this.temp).then(response => {
            this.resetTemp()
            this.fetchData()
            this.dialogFormVisible = false
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.id = row.id
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateCall(this.temp).then(response => {
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
        delCall(id).then(response => {
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
    },
    uploadFile(item) {
      this.uploadLoading = true
      const fileObj = item.file
      const isText = fileObj.type === 'application/vnd.ms-excel'
      const isTextComputer = fileObj.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      if (!isText & !isTextComputer) {
        this.$message.warning('请上传Excel文件')
        this.uploadLoading = false
        return
      }
      const form = new FormData()
      form.append('file', fileObj)
      importContacts(form).then(response => {
        if (response.code === 200) {
          this.$message.success('文件：' + fileObj.name + '上传成功')
        } else {
          this.$message.error(response.message)
        }
        this.uploadLoading = false
      }).catch(err => {
        console.log(err)
        this.uploadLoading = false
      })
    },
    handleTarget(item) {
      this.uploadLoading = true
      const fileObj = item.file
      const isText = fileObj.type === 'application/vnd.ms-excel'
      const isTextComputer = fileObj.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      if (!isText & !isTextComputer) {
        this.$message.warning('请上传Excel文件')
        this.uploadLoading = false
        return
      }
      const form = new FormData()
      form.append('file', fileObj)
      exportTargetContacts(form).then(response => {
        if (response.code === 200) {
          this.handleDownload(response.data)
        } else {
          this.$message.error(response.message)
        }
        this.uploadLoading = false
      }).catch(err => {
        console.log(err)
        this.uploadLoading = false
      })
    },
    handleExport() {
      this.listLoading = true
      this.params.pageNum = this.listQuery.page
      this.params.pageSize = this.listQuery.limit
      this.params.realName = this.listQuery.titleRealName
      this.params.realSex = this.listQuery.titleRealSex
      this.params.job = this.listQuery.titleJob
      this.params.jobCategory = this.listQuery.titleJobCategory
      this.params.phone = this.listQuery.titlePhone
      this.params.phone2 = this.listQuery.titlePhone2
      this.params.companyName = this.listQuery.titleCompanyName
      this.params.keywords = this.listQuery.titleKeywords
      this.params.province = this.listQuery.titleProvince
      this.params.city = this.listQuery.titleCity
      this.params.industry = this.listQuery.titleIndustry
      this.params.industryNew = this.listQuery.titleIndustryNew
      this.params.industryDetail = this.listQuery.titleIndustryDetail
      this.params.datafrom = this.listQuery.titleDataFrom
      this.params.fromPerson = this.listQuery.titleFromPerson
      this.params.dataStatus = this.listQuery.titleDataStatus
      this.params.remark = this.listQuery.titleRemark
      this.params.industryAi = this.listQuery.titleIndustryAi
      this.params.officeEmail = this.listQuery.titleOfficeEmail
      this.params.pcNumber = this.listQuery.titlePcNumber
      this.params.companyPersonNumber = this.listQuery.titleCompanyPersonNumber
      this.params.department = this.listQuery.titleDepartment
      this.params.annualTurnover = this.listQuery.titleAnnualTurnover
      this.params.regCapital = this.listQuery.titleRegCapital
      this.params.haveOfficeEmail = this.listQuery.titleHaveOfficeEmail
      exportContacts(this.params).then(response => {
        this.handleDownload(response.data)
        this.listLoading = false
      })
    },
    handleDownload(params) {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['姓名', '性别', '部门', '职务', '职务类别', '区号', '电话', '分机号', '区号2', '电话2', '分机号2', '手机号', '手机号2', '公司名称', '关键字', '省份', '城市', '地址', '邮编', '行业', '行业(新)', '细分行业', '企业性质', '公司人数', 'PC数量', '年营业额', '传真1', '传真2', '数据日期', '来源人', '数据来源', '状态', '邮箱1', '邮箱2', '备注', '是否AI行业', '企业邮箱', '数据更新时间', '注册资本']
        const filterVal = ['realName', 'realSex', 'department', 'job', 'jobCategory', 'areaCode', 'telephone', 'extensionNumber', 'areaCode2', 'telephone2', 'extensionNumber2', 'phone', 'phone2', 'companyName', 'keywords', 'province', 'city', 'address', 'postCode', 'industry', 'industryNew', 'industryDetail', 'companyNature', 'companyPersonNumber', 'pcNumber', 'annualTurnover', 'fax1', 'fax2', 'dataTime', 'fromPerson', 'dataFrom', 'dataStatus', 'email1', 'email2', 'remark', 'industryAi', 'officeEmail', 'updateTime', 'regCapital']
        const list = params
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
<style scoped>
.cell {
  max-height: 23px;
  overflow: hidden;
}
</style>

