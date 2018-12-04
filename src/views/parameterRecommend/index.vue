<template>
  <PageHeaderLayout >
    <div class="module-container">
      <div class="module-title">基本信息</div>
      <div class="module-content">
        <el-table
          v-loading="listLoading"
          :data="lists"
          element-loading-text="Loading"
          border
          fit
          stripe
          highlight-current-row>
          <el-table-column align="center" label="工单ID">
            <template slot-scope="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>
          <el-table-column label="产品型号" align="center">
            <template slot-scope="scope">
              {{ scope.row.tableName }}
            </template>
          </el-table-column>
          <el-table-column label="生产数量" align="center">
            <template slot-scope="scope">
              {{ scope.row.uploadDate }}
            </template>
          </el-table-column>
          <el-table-column label="设备编号" align="center">
            <template slot-scope="scope">
              {{ scope.row.tableName }}
            </template>
          </el-table-column>
          <el-table-column label="设备品牌" align="center">
            <template slot-scope="scope">
              {{ scope.row.uploadDate }}
            </template>
          </el-table-column>
          <el-table-column label="设备型号" align="center">
            <template slot-scope="scope">
              {{ scope.row.uploadDate }}
            </template>
          </el-table-column>
          <el-table-column label="设备吨位" align="center">
            <template slot-scope="scope">
              {{ scope.row.uploadDate }}
            </template>
          </el-table-column>
          <el-table-column label="模具型号" align="center">
            <template slot-scope="scope">
              {{ scope.row.uploadDate }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="module-container">
      <div class="module-title">参数推荐</div>
      <div class="module-content">
        <el-table
          v-loading="listLoading"
          :data="listss"
          class="parameter"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row>
          <el-table-column align="center" label="参数项" width="95">
            <template slot-scope="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>
          <el-table-column :render-header="renderHeader1" align="center">
            <template slot-scope="scope">
              {{ scope.row.tableName }}
            </template>
          </el-table-column>
          <el-table-column :render-header="renderHeader2" align="center">
            <template slot-scope="scope">
              {{ scope.row.uploadDate }}
            </template>
          </el-table-column>
          <el-table-column :render-header="renderHeader3" align="center">
            <template slot-scope="scope">
              {{ scope.row.uploadDate }}
            </template>
          </el-table-column>
          <el-table-column :render-header="renderHeader4" align="center">
            <template slot-scope="scope">
              {{ scope.row.tableName }}
            </template>
          </el-table-column>
          <el-table-column :render-header="renderHeader5" align="center">
            <template slot-scope="scope">
              {{ scope.row.uploadDate }}
            </template>
          </el-table-column>
          <el-table-column :render-header="renderHeader6" align="center">
            <template slot-scope="scope">
              {{ scope.row.uploadDate }}
            </template>
          </el-table-column>
          <el-table-column :render-header="renderHeader7" align="center">
            <template slot-scope="scope">
              {{ scope.row.uploadDate }}
            </template>
          </el-table-column>
          <el-table-column :render-header="renderHeader8" align="center">
            <template slot-scope="scope">
              {{ scope.row.uploadDate }}
            </template>
          </el-table-column>
          <el-table-column :render-header="renderHeader9" align="center">
            <template slot-scope="scope">
              {{ scope.row.uploadDate }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              {{ scope.row.uploadDate }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="module-container">
      <div class="module-title">异常分析与建议</div>
      <div class="module-content">
        <div class="module-content-left">
          <chart id="abnormal" ref="scrappage" :options="abnormalOptions" height="100%" width="100%" />
        </div>
        <div class="module-content-right">
          <el-table
            v-loading="listLoading"
            :data="lists"
            element-loading-text="Loading"
            border
            fit
            stripe
            highlight-current-row>
            <el-table-column label="异常类型" align="center">
              <template slot-scope="scope">
                <el-button @click="btnClick">修改</el-button>
              </template>
            </el-table-column>
            <el-table-column label="出现次数" align="center">
              <template slot-scope="scope">
                {{ scope.row.uploadDate }}
              </template>
            </el-table-column>
            <el-table-column label="异常占比" align="center">
              <template slot-scope="scope">
                {{ scope.row.uploadDate }}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </PageHeaderLayout>
</template>
<style>
  /*.parameter.el-table .cell{*/
    /*white-space: pre-line;*/
    /*height: 50px;*/
    /*line-height: 25px;*/
  /*}*/
  .el-table .cell p{
    height: 10px;
    line-height: 10px;
  }
</style>
<script src="./parameterRecommend.js"></script>

