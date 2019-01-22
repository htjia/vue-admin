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
    <div class="module-container">
      <div class="module-title">
        <div class="module-title-text">报废总览</div>
      </div>
      <div class="module-content discard-overview">
        <div style="padding-right: 5px">
          <div class="discard-overview-top">
            <div class="icon-ctn">
              <svg-icon class="icon" icon-class="leiji"/>
              <span class="title">报废总量</span>
            </div>
            <div class="text-ctn">
              <div :class="{'isAll':activeTime === '0'}" class="number" v-text="anum">74,653</div>
              <div v-if="activeTime !== '0'" class="content">环比 <svg-icon :icon-class="aratio<0?'godown':'goup'" class="icon"/><span v-text="aratio">13%</span> %</div>
            </div>
          </div>
          <div class="discard-overview-btm" style="padding: 15px">
            <chart id="constitute" ref="constitute" :options="abnormalOptions" height="100%" width="100%" />
          </div>
        </div>
        <div style="padding:0 5px">
          <div class="discard-overview-top">
            <div class="icon-ctn">
              <svg-icon class="icon" icon-class="leijibf"/>
              <span class="title">报废率</span>
            </div>
            <div class="text-ctn">
              <div :class="{'isAll':activeTime === '0'}" class="number"><span v-text="lrate"/> %</div>
              <div v-if="activeTime !== '0'" class="content">环比 <svg-icon :icon-class="num<0?'godown':'goup'" class="icon"/><span v-text="lratio">13%</span> %</div>
            </div>
          </div>
          <div class="discard-overview-btm" style="border: none">
            <el-table
              :data="abnormalData"
              element-loading-text="拼命加载中"
              border>
              <el-table-column label="报废环节" align="center" prop="name"/>
              <el-table-column label="报废量" align="center" prop="num"/>
              <el-table-column label="报废率" align="center" prop="rate">
                <template slot-scope="scope">
                  {{ scope.row.rate.toFixed(2) }} %
                </template>
              </el-table-column>
              <el-table-column label="报废环比" align="center" prop="ratio">
                <template slot-scope="scope">
                  <span v-if="scope.row.ratio !== 0" :class="{'ratio-up':scope.row.ratio < 0}" class="ratio-num"><span>{{ scope.row.ratio.toFixed(2) }}</span>%</span>
                  <svg-icon v-if="scope.row.ratio !== 0" :icon-class="scope.row.ratio<0?'godown':'goup'" class="icon"/>
                  <span v-if="scope.row.ratio === 0">--</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div style="padding-left: 5px">
          <div class="discard-overview-top">
            <div class="icon-ctn">
              <svg-icon class="icon" icon-class="zonghe"/>
              <span class="title" ><span v-text="zggx"/>报废最高</span>
            </div>
            <div class="text-ctn">
              <div :class="{'isAll':activeTime === '0'}" class="number"><span v-text="zgrate"/> %</div>
              <div v-if="activeTime !== '0'" class="content">环比 <svg-icon :icon-class="zghb<0?'godown':'goup'" class="icon"/><span v-text="zghb">13%</span> %</div>
            </div>
          </div>
          <div class="discard-overview-btm" style="padding-top: 12px">
            <div class="highest">
              压铸工序 <span class="cause" v-text="yzyy[0]">缺肉</span>
              <el-tooltip v-if="yzyy.length>1" placement="top">
                <div slot="content">{{ yzyyAll }}</div>
                <span>...</span>
              </el-tooltip>
              报废占比最高(<span v-text="yznum"/>  ,<span style="padding-left: 10px" v-text="yzzb"/> %)
            </div>
            <div class="highest">
              机加工工序 <span class="cause" v-text="jjgyy[0]">缺肉</span>
              <el-tooltip v-if="jjgyy.length>1" placement="top">
                <div slot="content">{{ jjgyyAll }}</div>
                <span>...</span>
              </el-tooltip>
              报废占比最高(<span v-text="jjgnum"/>  ,<span style="padding-left: 10px" v-text="jjgrate"/> %)
            </div>
            <div class="highest">
              氧化终检工序 <span class="cause" v-text="yhyy[0]">缺肉</span>
              <el-tooltip v-if="yhyy.length>1" placement="top">
                <div slot="content">{{ yhyyAll }}</div>
                <span>...</span>
              </el-tooltip>
              报废占比最高(<span v-text="yhnum"/>  ,<span style="padding-left: 10px" v-text="yhrate"/> %)
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="discard-overview constitute">
      <div>
        <div class="module-container">
          <div class="module-title">
            <div class="module-title-text">压铸报废构成</div>
            <el-button v-if="scrapFormData.length > 0" class="view-all" size="mini" @click="viewAllYz">查看源数据<i class="el-icon-d-arrow-right el-icon--right"/></el-button>
          </div>
          <div class="module-content">
            <div v-if="scrapFormDataLoading" class="loading-text">
              正在加载 ...
            </div>
            <div v-if="scrapFormData.length === 0" class="no-data">
              <svg-icon class="no-data-icon" icon-class="noData"/>
              <div>暂无数据</div>
            </div>
            <chart v-if="scrapFormData.length > 0" id="constitute1" ref="constitute" :options="castingOptions" height="100%" width="100%" />
          </div>
        </div>
      </div>
      <div style="padding:0 10px ">
        <div class="module-container">
          <div class="module-title">
            <div class="module-title-text">机加工报废构成</div>
            <el-button v-if="scrapFormData.length > 0" class="view-all" size="mini" @click="viewAllMachine">查看源数据<i class="el-icon-d-arrow-right el-icon--right"/></el-button>
          </div>
          <div class="module-content">
            <div v-if="scrapFormDataLoading" class="loading-text">
              正在加载 ...
            </div>
            <div v-if="scrapFormData.length === 0" class="no-data">
              <svg-icon class="no-data-icon" icon-class="noData"/>
              <div>暂无数据</div>
            </div>
            <chart v-if="scrapFormData.length > 0" id="constitute2" ref="constitute" :options="machiningOptions" height="100%" width="100%" />
          </div>
        </div>
      </div>
      <div>
        <div class="module-container">
          <div class="module-title">
            <div class="module-title-text">氧化终检报废构成</div>
            <el-button v-if="scrapFormData.length > 0" class="view-all" size="mini" @click="viewAllCombustion">查看源数据<i class="el-icon-d-arrow-right el-icon--right"/></el-button>
          </div>
          <div class="module-content">
            <div v-if="scrapFormDataLoading" class="loading-text">
              正在加载 ...
            </div>
            <div v-if="scrapFormData.length === 0" class="no-data">
              <svg-icon class="no-data-icon" icon-class="noData"/>
              <div>暂无数据</div>
            </div>
            <chart v-if="scrapFormData.length > 0" id="constitute3" ref="constitute" :options="yhOptions" height="100%" width="100%" />
          </div>
        </div>
      </div>
    </div>
    <div class="module-container">
      <div class="module-title">
        <div class="module-title-text">压铸报废产品对比</div>
        <div v-if="productThanData.length > 0">
          <el-button class="view-all" size="mini" @click="viewAllProduct">查看全部<i class="el-icon-d-arrow-right el-icon--right"/></el-button>
          <el-button :type="currentNum===1?'primary':''" class="view-all" style="margin-right: 10px" size="mini" @click="switchBtn(1)">后 10<i class="el-icon-arrow-right el-icon--right"/></el-button>
          <el-button :type="currentNum===0?'primary':''" class="view-all" icon="el-icon-arrow-left" size="mini" @click="switchBtn(0)">前 10</el-button>
        </div>
      </div>
      <div class="module-content" style="height: 240px;">
        <div v-if="productThanData.length === 0" class="no-data">
          <svg-icon class="no-data-icon" icon-class="noData"/>
          <div>暂无数据</div>
        </div>
        <chart v-if="productThanData.length > 0" id="machine" ref="machine" :options="machineOptions" height="210px" width="100%" />
      </div>
    </div>
    <div class="contrast">
      <div style="padding-right: 5px">
        <div class="module-container">
          <div class="module-title">
            <div class="module-title-text">机加工产品对比</div>
            <div v-if="productThanData.length > 0">
              <el-button class="view-all" size="mini" @click="viewAllProduct">查看全部<i class="el-icon-d-arrow-right el-icon--right"/></el-button>
              <el-button :type="currentMachiningNum===1?'primary':''" class="view-all" style="margin-right: 10px" size="mini" @click="machiningSwitchBtn(1)">后 10<i class="el-icon-arrow-right el-icon--right"/></el-button>
              <el-button :type="currentMachiningNum===0?'primary':''" class="view-all" icon="el-icon-arrow-left" size="mini" @click="machiningSwitchBtn(0)">前 10</el-button>
            </div>
          </div>
          <div class="module-content" style="height: 240px;">
            <div v-if="productThanData.length === 0" class="no-data">
              <svg-icon class="no-data-icon" icon-class="noData"/>
              <div>暂无数据</div>
            </div>
            <chart v-if="productThanData.length > 0" id="machine1" ref="machine" :options="jjgContrastOptions" height="210px" width="100%" />
          </div>
        </div>
      </div>
      <div style="padding-left: 5px">
        <div class="module-container">
          <div class="module-title">
            <div class="module-title-text">氧化终检报废产品对比</div>
            <div v-if="productThanData.length > 0">
              <el-button class="view-all" size="mini" @click="viewAllProduct">查看全部<i class="el-icon-d-arrow-right el-icon--right"/></el-button>
              <el-button :type="currentInspectionNum===1?'primary':''" class="view-all" style="margin-right: 10px" size="mini" @click="inspectionSwitchBtn(1)">后 10<i class="el-icon-arrow-right el-icon--right"/></el-button>
              <el-button :type="currentInspectionNum===0?'primary':''" class="view-all" icon="el-icon-arrow-left" size="mini" @click="inspectionSwitchBtn(0)">前 10</el-button>
            </div>
          </div>
          <div class="module-content" style="height: 240px;">
            <div v-if="productThanData.length === 0" class="no-data">
              <svg-icon class="no-data-icon" icon-class="noData"/>
              <div>暂无数据</div>
            </div>
            <chart v-if="productThanData.length > 0" id="machine2" ref="machine" :options="yhContrastOptions" height="210px" width="100%" />
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="castVisible"
      :title="dialogTitle"
      class="castDialog"
      width="740px">
      <div style="text-align: center;margin-bottom: 10px;font-size: 16px">
        报废率：<span style="color: #e25d5d;font-weight: bold;margin-right: 15px"><span v-text="rate"/> %</span>
        报废量：<span style="color: #5268a5;font-weight: bold" v-text="daNum">1250</span>
      </div>
      <el-table
        v-loading="listLoading"
        :data="detailList"
        element-loading-text="拼命加载中"
        border
        fit
        stripe
        height="575px"
        highlight-current-row>
        <el-table-column align="center" label="排名" width="95">
          <template slot-scope="scope">
            {{ scope.$index+1 }}
          </template>
        </el-table-column>
        <el-table-column label="报废原因" align="center" prop="reason"/>
        <el-table-column label="报废占比" align="center" prop="rate" />
        <el-table-column label="报废量" align="center" prop="num"/>
      </el-table>
    </el-dialog>
  </PageHeaderLayout>
</template>
<script src="./abnormal.js"></script>
<style scoped>
  .contrast{
    height: 200px;
  }
  .contrast>div{
    float: left;
    width: 50%;
  }
  .discard-overview{
    padding: 10px 15px;
    overflow: hidden;
  }
  .constitute{
    padding: 0;
    margin-bottom: 10px;
  }
  .constitute .module-content{
    height: 290px;
  }
  .discard-overview>div{
    float: left;
    width: 33.33%;
  }
  .discard-overview-top{
    width: 100%;
    height: 100px;
    border:1px solid #e2e2e2;
    background: #f2f2f2;
  }
  .discard-overview-btm{
    width: 100%;
    height: 198px;
    border:1px solid #e2e2e2;
    margin-top: 10px;
  }
  .discard-overview-top .icon-ctn{
    float: left;
    width: 50%;
  }
  .discard-overview-top .icon-ctn .icon{
    font-size: 35px;
    margin-top: 32px;
    margin-left: 25%;
    vertical-align: middle;
  }
  .discard-overview-top .icon-ctn .title{
    color: #666;
    font-weight: bold;
    display: inline-block;
    vertical-align: -18px;
    margin-left: 10%;
    /*width: 120px;*/
  }
  .discard-overview-top .text-ctn{
    float: left;
    width: 50%;
    padding-left: 5%;
  }
  .discard-overview-top .text-ctn .number{
    width: 100%;
    font-size: 30px;
    margin-top: 15px;
    color: #009494;
    font-weight: bold;
  }
  .discard-overview-top .text-ctn .number.isAll{
    margin-top: 32px;
  }
  .discard-overview-top .text-ctn .content{
    margin-top: 15px;
    margin-left: 4px;
    font-size: 16px;
  }
  .discard-overview-top .text-ctn .icon{
    margin: 0 20px;
  }
  .discard-overview-btm>>>.el-table .cell{
    line-height: 48px;
  }
  .discard-overview-btm>>>.el-table td{
    height: 49px;
  }
  /*// Table*/
  .discard-overview-btm>>> thead tr{
    background-color: #f2f2f2;
  }
  /*// 表头*/
  .discard-overview-btm>>> .el-table thead tr th.is-leaf{
    border-bottom: 2px solid #e2e2e2;
  }
  .discard-overview-btm>>> .el-table--border{
    border: 1px solid #e2e2e2;
    border-bottom: none;
  }
  .discard-overview-btm>>> .el-table--border td,
  .discard-overview-btm>>> .el-table--border th,
  .discard-overview-btm>>> .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
    border-color: #e2e2e2;
  }
  /*// 隔行变色*/
  .discard-overview-btm>>> .el-table--striped .el-table__body tr.el-table__row--striped td {
    background: #f5f5f5;
  }
  /*// hover*/
  .discard-overview-btm>>> .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: #f9f9f9 !important;
  }
  /*// active*/
  .discard-overview-btm>>> .el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
  .discard-overview-btm>>> .el-table__body tr.current-row>td {
    background-color: #eeeeee;
  }
  .highest{
    line-height: 30px;
    /*border-bottom: 1px dotted #e2e2e2;*/
    width: 80%;
    margin: 20px auto;
  }
  .highest:before{
    display: inline-block;
    content: '';
    width: 8px;
    height: 8px;
    background: #009494;
    margin-right: 8px;
    border-radius: 50%;
  }
  .discard-overview-btm .cause{
    color: #5268a5;
    font-weight: bold;
    font-size: 22px;
  }
  .castDialog>>>.el-dialog__body {
    padding: 15px;
    color: #606266;
    font-size: 14px;
  }
  .ratio-num{
    color: #e25d5d;
    display: inline-block;
    width: 80px;
  }
  .ratio-up{
    color: #009494;
  }
</style>

