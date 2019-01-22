<template>
  <PageHeaderLayout :has_back = "true">
    <div class="header-search-add">
      <el-select v-model="equipment" filterable placeholder="请选择设备" size="medium" style="width: 300px;">
        <el-option
          v-for="item in equipmentOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-button type="primary" icon="el-icon-search" size="medium" @click="handleSearch">搜索</el-button>
    </div>
    <div class="forecast-container">
      <div class="module-container outcome">
        <div class="module-title">
          <div class="module-title-text">预测结果</div>
        </div>
        <div class="module-content">
          <div class="outcome-text">
            <div style="color: #536aa1;font-size: 18px;font-weight: bold">IKD-03/YZ-08</div>
            <div>2018.11.1至2018.11.15，</div>
            <div>共计预测班次报废率<span style="color:#de525f;font-size: 18px;font-weight: bold">40</span>次，</div>
            <div>其中 <span style="color:#de525f;font-size: 18px;font-weight: bold">20</span>次预测成功，</div>
            <div>预测成功率为<span style="color:#009494;font-size: 18px;font-weight: bold">88.6%</span></div>
          </div>
          <div class="outcome-chart">
            <chart id="outcome" ref="outcome" :options="outcomeOptions" height="100%" width="100%" />
          </div>
        </div>
      </div>
      <div class="module-container tendency">
        <div class="module-title">
          <div class="module-title-text">预测趋势</div>
        </div>
        <div class="module-content">
          <chart id="tendency" ref="tendency" :options="options" height="100%" width="100%" />
        </div>
      </div>
    </div>
    <div class="module-container">
      <div class="module-title">
        <div class="module-title-text">预测列表</div>
        <el-date-picker
          v-model="forecastTime"
          type="date"
          range-separator="至"
          placeholder="选择日期"
          size="small"
          class="forecastDatePicker"/>
      </div>
      <div class="module-content">
        <el-table
          v-loading="listLoading"
          :data="list"
          element-loading-text="拼命加载中"
          border
          fit
          stripe
          highlight-current-row>
          <el-table-column align="center" label="班次" width="95">
            <template slot-scope="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>
          <el-table-column label="预测时间范围" align="center">
            <template slot-scope="scope">
              {{ scope.row.tableName }}
            </template>
          </el-table-column>
          <el-table-column label="产品" align="center">
            <template slot-scope="scope">
              {{ scope.row.uploadDate }}
            </template>
          </el-table-column>
          <el-table-column label="模具" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.uploadState === 0" type="success" size="small">成功</el-tag>
              <el-tag v-if="scope.row.uploadState === 1" type="danger" size="small">失败</el-tag>
              <el-tag v-if="scope.row.uploadState === 2" type="warning" size="small">未找到文件</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="预测报废率" align="center">
            <template slot-scope="scope">
              {{ scope.row.tableName }}
            </template>
          </el-table-column>
          <el-table-column label="实际报废率" align="center">
            <template slot-scope="scope">
              {{ scope.row.uploadDate }}
            </template>
          </el-table-column>
          <el-table-column label="预测是否准确" align="center">
            <template slot-scope="scope">
              {{ scope.row.uploadDate }}
            </template>
          </el-table-column>
        </el-table>
        <div class="time-btn-group">
          <el-button type="primary" icon="el-icon-arrow-left" size="small" @click="before">前一天</el-button>
          <el-button type="primary" size="small" @click="after">后一天<i class="el-icon-arrow-right el-icon--right"/></el-button>
        </div>
      </div>
    </div>
  </PageHeaderLayout>
</template>
<script src="./forecastDetail.js"></script>
<style scoped>
  .forecast-container{
    display: flex;
    flex-direction: row;
  }
  .forecast-container .module-content{
    height: 240px;
  }
  .outcome{
    width: 500px;
  }
  .outcome .module-content{
    display: flex;
    flex-direction: row;
  }
  .outcome .module-content .outcome-text{
    width: 220px;
    padding: 20px 0 0 30px;
    line-height: 30px;
  }
  .outcome .module-content .outcome-chart{
    flex-grow: 1;
    padding-top: 10px;
  }
  .tendency{
    flex-grow: 1;
    margin-bottom: 10px;
    margin-left: 10px;
  }
  .forecastDatePicker{
    float: right;
  }
  .time-btn-group{
    float: right;
    margin-top: 15px;
  }
</style>

