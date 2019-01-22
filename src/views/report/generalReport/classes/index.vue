<template>
  <PageHeaderLayout :has_back = "true">
    <div class="header-search-add tabs-header">
      <el-tabs v-model="activeTime" @tab-click="handleClick">
        <el-tab-pane label=" 全部 " name="0"/>
        <el-tab-pane label="近7天" name="1"/>
        <el-tab-pane label="近30天" name="2"/>
        <el-tab-pane label="近90天" name="3"/>
      </el-tabs>
    </div>
    <div class="contrast">
      <div style="padding-right: 5px">
        <div class="module-container">
          <div class="module-title">
            <div class="module-title-text">班次报废分析</div>
          </div>
          <div class="module-content classes-table">
            <el-table
              :data="classList"
              border>
              <el-table-column label="班次" align="center" prop="shiftName"/>
              <el-table-column label="报废率" align="center" prop="rejectRatio">
                <template slot-scope="scope">
                  <span :class="{'ratio-up':scope.row.ratio > 0}" class="ratio-num"><span>{{ scope.row.rejectRatio }}</span>%</span>
                  <el-tooltip v-if="scope.row.ratio !== 0" placement="right">
                    <div v-if="scope.row.ratio < 0" slot="content">较上一班次 {{ scope.row.ratio }} %</div>
                    <div v-if="scope.row.ratio > 0" slot="content">较上一班次 +{{ scope.row.ratio }} %</div>
                    <svg-icon :icon-class="scope.row.ratio<0?'godown':'goup'" class="icon"/>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="生产总数" align="center" prop="daNum" />
              <el-table-column label="报废总数" align="center" prop="rejectNum"/>
            </el-table>
          </div>
        </div>
      </div>
      <div style="padding-left: 5px">
        <div class="module-container">
          <div class="module-title">
            <div class="module-title-text">班次报废分析</div>
          </div>
          <div class="module-content">
            <chart id="machine2" ref="machine" :options="machineOptions" height="180px" width="100%" />
          </div>
        </div>
      </div>
    </div>
    <div class="discarded">
      <div style="padding-right: 5px">
        <div class="module-container">
          <div class="module-title">
            <div class="module-title-text">操作工报废最多</div>
          </div>
          <div class="module-content">
            <span class="classes" v-text="userReject.shiftName">甲班</span>
            <span v-text="formatNum(userReject.rejectNum.toString())">2866</span> 件
          </div>
        </div>
      </div>
      <div style="padding: 0 5px">
        <div class="module-container">
          <div class="module-title">
            <div class="module-title-text">冷模报废最多</div>
          </div>
          <div class="module-content">
            <span class="classes" v-text="lmReject.shiftName">甲班</span>
            <span v-text="formatNum(lmReject.rejectNum.toString())">2866</span> 件
          </div>
        </div>
      </div>
      <div style="padding: 0 5px">
        <div class="module-container">
          <div class="module-title">
            <div class="module-title-text">品管报废最多</div>
          </div>
          <div class="module-content">
            <span class="classes" v-text="checkReject.shiftName">甲班</span>
            <span v-text="formatNum(checkReject.rejectNum.toString())">2866</span> 件
          </div>
        </div>
      </div>
      <div style="padding-left: 5px">
        <div class="module-container">
          <div class="module-title">
            <div class="module-title-text">异常停机次数最多</div>
          </div>
          <div class="module-content">
            <span class="classes" v-text="mostDown.shiftName">丙班</span>
            <span v-text="formatNum(mostDown.downNum.toString())">2866</span> 起
            <div class="min">
              <span v-text="formatNum(mostDown.downTimes.toString())">23545</span> min
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="module-container">
      <div class="module-title">
        <div class="module-title-text">班次报废率趋势分析</div>
      </div>
      <div class="module-content" style="height: 290px;">
        <div v-if="everydayShiftRjectData.length === 0" class="no-data">
          <svg-icon class="no-data-icon" icon-class="noData"/>
          <div>暂无数据</div>
        </div>
        <chart v-if="everydayShiftRjectData.length !== 0" id="classes" ref="classes" :options="options" height="260px" width="100%" />
      </div>
    </div>
    <div class="module-container">
      <div class="module-title">
        <div class="module-title-text">生产总数对比</div>
      </div>
      <div class="module-content production-container">
        <div class="production-left">
          <chart id="production" ref="production" :options="classesDaNumOptions" height="100%" width="100%" @daNumClick="daNumClick"/>
        </div>
        <div class="production-right">
          <div v-if="userDaNumOptionsData.length === 0" class="no-data">
            <svg-icon class="no-data-icon" icon-class="noData"/>
            <div>暂无数据</div>
          </div>
          <chart v-if="userDaNumOptionsData.length !== 0" id="daNum" :options="userDaNumOptions" height="100%" width="100%" />
        </div>
      </div>
    </div>
    <div class="module-container">
      <div class="module-title">
        <div class="module-title-text">报废总数对比</div>
      </div>
      <div class="module-content production-container">
        <div class="production-left">
          <chart id="production_" ref="production_" :options="classesRejectNumOptions" height="100%" width="100%" @rejectNumClick="rejectNumClick"/>
        </div>
        <div class="production-right">
          <div v-if="userDaNumOptionsData.length === 0" class="no-data">
            <svg-icon class="no-data-icon" icon-class="noData"/>
            <div>暂无数据</div>
          </div>
          <chart v-if="userDaNumOptionsData.length !== 0" id="rejectNum" :options="userRejectNumOptions" height="100%" width="100%" />
        </div>
      </div>
    </div>
  </PageHeaderLayout>
</template>
<script src="./classes.js"></script>
<style scoped>
  .production-container{
    height: 300px;
  }
  .production-left{
    float: left;
    width: 500px;
    height: 100%;
    border-right: 1px solid #e2e2e2;
  }
  .production-right{
    height: 100%;
    margin-left: 500px;
  }
  .contrast{
    overflow: hidden;
  }
  .contrast>div{
    float: left;
    width: 50%;
  }
  .discarded{
    overflow: hidden;
    margin: 10px 0;
  }
  .discarded>div{
    float: left;
    width: 25%;
    height: 100%;
  }
  .discarded .module-content{
    text-align: center;
    height: 95px;
    font-weight: bold;
    font-size: 22px;
    padding-top: 34px;
    color: #e25d5d;
  }
  .discarded .module-content .classes{
    color: #009494;
    margin-right: 30px;
  }
  .discarded .module-content .min{
    font-size: 18px;
    color: #5268a5;
    text-align: right;
  }
  .classes-table{
    height: 210px;
  }
  /*// Table*/
  .classes-table>>> thead tr{
    background-color: #f2f2f2;
  }
  /*// 表头*/
  .classes-table>>> .el-table thead tr th.is-leaf{
    border-bottom: 2px solid #e2e2e2;
  }
  .classes-table>>> .el-table--border{
    border: 1px solid #e2e2e2;
    border-bottom: none;
  }
  .classes-table>>> .el-table--border td,
  .classes-table>>> .el-table--border th,
  .classes-table>>> .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
    border-color: #e2e2e2;
  }
  /*// 隔行变色*/
  .classes-table>>> .el-table--striped .el-table__body tr.el-table__row--striped td {
    background: #f5f5f5;
  }
  /*// hover*/
  .classes-table>>> .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: #f9f9f9 !important;
  }
  /*// active*/
  .classes-table>>> .el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
  .classes-table>>> .el-table__body tr.current-row>td {
    background-color: #eeeeee;
  }
  .classes-table>>> .cell{
    line-height: 43px;
  }
  .classes-table>>> td{
    height: 44px;
  }
  .ratio-num{
    color: #009494;
    display: inline-block;
    width: 80px;
    text-align: left;
  }
  .ratio-num.ratio-up{
    color: #e25d5d;
  }
</style>

