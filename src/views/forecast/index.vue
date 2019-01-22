<template>
  <PageHeaderLayout >
    <div class="module-container">
      <div class="module-title">
        <div class="module-title-text">
          自系统上线至今，
          <span style="font-size: 18px;color: #009494">3#</span>厂压铸车间，累计预测班次报废率
          <span style="font-size: 18px;color: #e25d5d">3888次</span>，预测准确
          <span style="font-size: 18px;color: #5A6fa9">2968次</span>，整体预测准确率达到
          <span style="font-size: 18px;color: #009494">73.86%</span>
        </div>
        <div class="right-time">数据源：<span>2018-11-11</span> 至 <span>2018-12-12</span></div>
      </div>
      <div class="module-content precision">
        <div>
          <div class="title">预测准确率>60%</div>
          <div class="content">42台</div>
        </div>
        <div>
          <div class="title">预测准确率>70%</div>
          <div class="content">42台</div>
        </div>
        <div>
          <div class="title">预测准确率>80%</div>
          <div class="content">42台</div>
        </div>
        <div>
          <div class="title">预测准确率>90%</div>
          <div class="content">42台</div>
        </div>
      </div>
    </div>
    <div class="module-container forecast-container">
      <div class="module-content">
        <el-select v-model="precisionValue" class="precisionSelect" filterable placeholder="请选择产品型号" size="medium" style="width: 300px;">
          <el-option
            v-for="item in precision"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
        <el-table
          v-loading="listLoading"
          :data="list"
          element-loading-text="拼命加载中"
          border
          fit
          stripe
          highlight-current-row>
          <el-table-column align="center" label="序号" width="95">
            <template slot-scope="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>
          <el-table-column label="设备编号" align="center">
            <template slot-scope="scope">
              {{ scope.row.tableName }}
            </template>
          </el-table-column>
          <el-table-column label="预测次数" align="center">
            <template slot-scope="scope">
              {{ scope.row.uploadDate }}
            </template>
          </el-table-column>
          <el-table-column label="预测准确率" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.uploadState === 0" type="success" size="small">成功</el-tag>
              <el-tag v-if="scope.row.uploadState === 1" type="danger" size="small">失败</el-tag>
              <el-tag v-if="scope.row.uploadState === 2" type="warning" size="small">未找到文件</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" max-width="550px">
            <template slot-scope="scope">
              <el-button
                size="mini"
                icon="el-icon-edit"
                @click="viewDetails(scope.row)">查看详情</el-button>
            </template>
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
<script src="./forecast.js"></script>
<style scoped>
  .module-title{
    height: 60px;
    padding-top: 12px;
  }
  .module-title-text:before{
    margin-top: 5px;
  }
  .right-time{
    float: right;
    font-size: 14px;
    color: #009494;
    margin-top: 20px;
  }
  .precision{
    display: flex;
    flex-direction: row;
    padding: 15px 7.5px;
  }
  .precision>div{
    flex-grow: 1;
    border:1px solid #e2e2e2;
    height: 125px;
    margin: 0 7.5px;
    background: #f2f2f2;
    padding: 15px 30px;
  }
  .precision>div .title{
    font-size: 15px;
  }
  .precision>div .content{
    font-size: 36px;
    text-align: center;
    font-weight: bold;
    color: #009494;
    margin-top: 20px;
  }
  .precisionSelect{
    margin-bottom: 15px;
  }
  .forecast-container{
    height: calc(100vh - 352px);
  }
</style>

