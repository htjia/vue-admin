<template>
  <PageHeaderLayout :has_back="true">
    <div class="module-container">
      <div class="module-title">
        <div class="module-title-text">产品趋势</div>
      </div>
      <div class="module-content trend-content">
        <el-date-picker
          v-model="time"
          type="daterange"
          size="small"
          range-separator="至"
          start-placeholder="开始日期"
          style="width: 330px;height: 36px;line-height: 36px"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          @change="timeChanged"
        />
        <el-button style="margin-bottom: 15px" size="medium" type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        <el-table
          v-loading="listLoading"
          :data="list"
          tooltip-effect="dark"
          element-loading-text="拼命加载中"
          border
          fit
          stripe
          highlight-current-row>
          <el-table-column label="日期" align="center" prop="everyday" show-overflow-tooltip/>
          <el-table-column label="加工量" align="center" prop="daNum"/>
          <el-table-column label="报废率" align="center" prop="username">
            <template slot-scope="scope">{{ scope.row.rejectRatio }} %</template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="totalPage>15"
          :current-page="pageNum"
          :page-sizes="[15, 30, 40]"
          :page-size="pageSize"
          :total="totalPage"
          class="pagination"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="sizeChange"
          @current-change="currentChange"
        />
      </div>
    </div>
  </PageHeaderLayout>
</template>

<script src="./productTrend.js"></script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .trend-content{
    height: calc(100vh - 169px);
    overflow: auto;
  }
</style>
