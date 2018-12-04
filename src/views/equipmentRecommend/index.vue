<template>
  <PageHeaderLayout >
    <div class="header-search-add">
      <span class="search-title">工单ID：</span>
      <el-input
        v-model="workOrderId"
        style="width: 170px"
        placeholder="请输入工单ID"
        clearable/>
      <span class="has-margin search-title">产品型号：</span>
      <el-input
        v-model="productModel"
        style="width: 170px"
        placeholder="请输入产品型号"
        clearable/>
      <span class="has-margin search-title">生产数量：</span>
      <el-input
        v-model="productionQuantity"
        style="width: 170px"
        placeholder="请输入生产数量"
        clearable/>
      <el-button type="primary" icon="el-icon-search" class="has-margin" @click="handleSearch">搜 索</el-button>
    </div>
    <div class="module-container">
      <div class="module-title">7321电机盖-设备报废率top5</div>
      <div class="module-content equipment-content">
        <div id="chart" ref="moduleContentLeft" class="module-content-left">
          <chart id="equipment" ref="equipmentChart" :options="options" height="100%" width="100%"/>
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
            <el-table-column align="center" label="序号" width="95">
              <template slot-scope="scope">
                {{ scope.$index+1 }}
              </template>
            </el-table-column>
            <el-table-column label="表名" align="center">
              <template slot-scope="scope">
                {{ scope.row.tableName }}
              </template>
            </el-table-column>
            <el-table-column label="上传时间" align="center">
              <template slot-scope="scope">
                {{ scope.row.uploadDate }}
              </template>
            </el-table-column>
            <el-table-column label="上传状态" align="center">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.uploadState === 0" type="success" size="small">成功</el-tag>
                <el-tag v-if="scope.row.uploadState === 1" type="danger" size="small">失败</el-tag>
                <el-tag v-if="scope.row.uploadState === 2" type="warning" size="small">未找到文件</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <svg-icon :icon-class="isUnfolded?'upward':'unfold'" class="direction-btn" @click.native="handleUnfold"/>
      </div>
    </div>
    <div class="module-container">
      <div class="module-title">7321电机盖-设备报废率top52</div>
      <div class="module-content equipment-content">
        <div id="chart2" ref="moduleContentLeft2" class="module-content-left">
          <chart id="equipment2" ref="equipmentChart2" :options="options" height="100%" width="100%" @barClick="barClick"/>
        </div>
        <div class="module-content-right">
          <el-table
            v-loading="listLoading"
            :data="listss"
            element-loading-text="Loading"
            border
            fit
            stripe
            highlight-current-row>
            <el-table-column align="center" label="序号" width="95">
              <template slot-scope="scope">
                {{ scope.$index+1 }}
              </template>
            </el-table-column>
            <el-table-column label="表名" align="center">
              <template slot-scope="scope">
                {{ scope.row.tableName }}
              </template>
            </el-table-column>
            <el-table-column label="上传时间" align="center">
              <template slot-scope="scope">
                {{ scope.row.uploadDate }}
              </template>
            </el-table-column>
            <el-table-column label="上传状态" align="center">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.uploadState === 0" type="success" size="small">成功</el-tag>
                <el-tag v-if="scope.row.uploadState === 1" type="danger" size="small">失败</el-tag>
                <el-tag v-if="scope.row.uploadState === 2" type="warning" size="small">未找到文件</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <svg-icon :icon-class="mouldIsUnfolded?'upward':'unfold'" class="direction-btn" @click.native="handleMouldUnfold"/>
      </div>
    </div>
  </PageHeaderLayout>
</template>
<style scoped>
  .equipment-content{
    padding-bottom: 40px;
  }

</style>
<script src="./equipmentRecommend.js"></script>

