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
        <div class="module-title-text">产品总览</div>
      </div>
      <div class="module-content discard-overview">
        <div style="padding-right: 5px">
          <div class="discard-overview-top">
            <div class="icon-ctn">
              <svg-icon class="icon" icon-class="leiji"/>
              <span class="title">
                加工总量
                <el-tooltip placement="right">
                  <div slot="content">合模总数</div>
                  <svg-icon class="hint" icon-class="hint"/>
                </el-tooltip>
              </span>
            </div>
            <div class="text-ctn">
              <div :class="{'isAll':activeTime === '0'}" class="number" v-text="totaldaNum">74,653</div>
              <div class="content">
                <span v-if="activeTime !== '0'">
                  环比 <svg-icon :icon-class="daNumTerm<0?'godown':'goup'" class="icon"/>
                  <span v-text="daNumTerm">13</span><span>%</span>
                </span>
              </div>
            </div>
          </div>
          <div class="discard-overview-btm">
            <div style="padding-right: 5px">
              <div class="module-container">
                <div class="module-title">
                  <div class="module-title-text">报废最低</div>
                  <!--<svg-icon style="float: right;margin-top: 10px" icon-class="godown"/>-->
                </div>
                <div class="module-content">
                  <div class="discard-the-most-title" @click="jumpToDetail(minRejectRatioProductId)" v-text="minRejectRatioName">0001后视镜/68787-1</div>
                  <div class="discard"><span class="title">报废率：</span><span class="font-color-red"><span v-text="minRejectRatioRejectNum">2.15</span>%</span></div>
                  <div class="discard"><span class="title">报废总量：</span><span class="font-color-blue" v-text="minRejectRatioRejectRatio">654,454</span></div>
                </div>
              </div>
            </div>
            <div style="padding-left: 5px">
              <div class="module-container">
                <div class="module-title">
                  <div class="module-title-text">报废最高</div>
                  <!--<svg-icon style="float: right;margin-top: 10px" icon-class="goup"/>-->
                </div>
                <div class="module-content">
                  <div class="discard-the-most-title" @click="jumpToDetail(maxRejectRatioProductId)" v-text="maxRejectRatioName">0001后视镜/68787-1</div>
                  <div class="discard"><span class="title">报废率：</span><span class="font-color-red"><span v-text="maxRejectRatioRejectNum">2.15</span>%</span></div>
                  <div class="discard"><span class="title">报废总量：</span><span class="font-color-blue" v-text="maxRejectRatioRejectRatio">654,454</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="padding:0 5px">
          <div class="discard-overview-top">
            <div class="icon-ctn">
              <svg-icon class="icon" icon-class="leijibf"/>
              <span class="title">报废总量</span>
            </div>
            <div class="text-ctn">
              <div :class="{'isAll':activeTime === '0'}" class="number" v-text="totalRejectNum">74,653</div>
              <div class="content">
                <span v-if="activeTime !== '0'">
                  环比 <svg-icon :icon-class="rejectNumTerm<0?'godown':'goup'" class="icon"/>
                  <span v-text="rejectNumTerm">13</span><span>%</span>
                </span>
              </div>
            </div>
          </div>
          <div class="discard-overview-btm">
            <div style="padding-right: 5px">
              <div class="module-container">
                <div class="module-title">
                  <div class="module-title-text">产量最高</div>
                  <!--<svg-icon style="float: right;margin-top: 10px" icon-class="godown"/>-->
                </div>
                <div class="module-content">
                  <div class="discard-the-most-title" @click="jumpToDetail(maxProductId)" v-text="maxProductName">0001后视镜/68787-1</div>
                  <div class="discard"><span class="title">报废率：</span><span class="font-color-red"><span v-text="maxProductRejectRatio">2.15</span>%</span></div>
                  <div class="discard"><span class="title">报废总量：</span><span class="font-color-blue" v-text="maxProductRejectNum">654,454</span></div>
                </div>
              </div>
            </div>
            <div style="padding-left: 5px">
              <div class="module-container">
                <div class="module-title">
                  <div class="module-title-text">产量最低</div>
                  <!--<svg-icon style="float: right;margin-top: 10px" icon-class="goup"/>-->
                </div>
                <div class="module-content">
                  <div class="discard-the-most-title" @click="jumpToDetail(minProductId)" v-text="minProductName">0001后视镜/68787-1</div>
                  <div class="discard"><span class="title">报废率：</span><span class="font-color-red"><span v-text="minProductRejectRatio">2.15</span>%</span></div>
                  <div class="discard"><span class="title">报废总量：</span><span class="font-color-blue" v-text="minProductRejectNum">654,454</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="padding-left: 5px">
          <div class="discard-overview-top">
            <div class="icon-ctn">
              <svg-icon class="icon" icon-class="zonghe"/>
              <span class="title">平均报废率</span>
            </div>
            <div class="text-ctn">
              <div :class="{'isAll':activeTime === '0'}" class="number"><span v-text="totalRejectRatio">234</span>%</div>
              <div class="content">
                <span v-if="activeTime !== '0'">
                  环比 <svg-icon :icon-class="rejectRatioTerm<0?'godown':'goup'" class="icon"/>
                  <span v-text="rejectRatioTerm">13</span><span>%</span>
                </span>
              </div>
            </div>
          </div>
          <div class="discard-overview-btm">
            <div style="padding-right: 5px">
              <div class="module-container">
                <div class="module-title">
                  <div class="module-title-text">稳定性好</div>
                  <!--<svg-icon style="float: right;margin-top: 10px" icon-class="godown"/>-->
                </div>
                <div class="module-content">
                  <div class="discard-the-most-title" @click="jumpToDetail(mostStableProductId)" v-text="mostStableName">0001后视镜/68787-1</div>
                  <div class="discard"><span class="title">报废率：</span><span class="font-color-red"><span v-text="mostStableRejectRatio">2.15</span>%</span></div>
                  <div class="discard"><span class="title">报废总量：</span><span class="font-color-blue" v-text="mostStableRejectNum">654,454</span></div>
                </div>
              </div>
            </div>
            <div style="padding-left: 5px">
              <div class="module-container">
                <div class="module-title">
                  <div class="module-title-text">稳定性差</div>
                  <!--<svg-icon style="float: right;margin-top: 10px" icon-class="goup"/>-->
                </div>
                <div class="module-content">
                  <div class="discard-the-most-title" @click="jumpToDetail(mostUnStableProductId)" v-text="mostUnStableName">0001后视镜/68787-1</div>
                  <div class="discard"><span class="title">报废率：</span><span class="font-color-red"><span v-text="mostUnStableRejectNum">2.15</span>%</span></div>
                  <div class="discard"><span class="title">报废总量：</span><span class="font-color-blue" v-text="mostUnStableRejectRatio">654,454</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="module-container">
      <div class="module-title">
        <div class="module-title-text">
          产品趋势
          <el-tooltip placement="right">
            <div slot="content">说明：<br>此模块表示所有产品报废率和加工量的日趋势</div>
            <svg-icon class="hint" icon-class="hint"/>
          </el-tooltip>
        </div>
        <el-button v-if="productTrendData.length !== 0" class="view-all" size="mini" @click="viewTendencyAll">查看源数据<i class="el-icon-d-arrow-right el-icon--right"/></el-button>
      </div>
      <div class="module-content" style="height: 290px;">
        <div v-if="productTrendDataLoading" class="loading-text">
          正在加载 ...
        </div>
        <div v-if="productTrendData.length === 0" class="no-data">
          <svg-icon class="no-data-icon" icon-class="noData"/>
          <div>暂无数据</div>
        </div>
        <chart v-if="productTrendData.length !== 0" id="machine" ref="machine" :options="productTrendOptions" height="260px" width="100%" />
      </div>
    </div>
    <div class="contrast" style="margin-bottom: 10px">
      <div style="padding-right: 5px">
        <div class="module-container">
          <div class="module-title">
            <div class="module-title-text">前10名产品报废率排名</div>
            <el-button class="view-all" size="mini" @click="viewAllProductList">查看全部<i class="el-icon-d-arrow-right el-icon--right"/></el-button>
          </div>
          <div class="module-content">
            <chart id="top" :options="topOptions" height="210px" width="100%" @barClick="barClick"/>
          </div>
        </div>
      </div>
      <div style="padding-left: 5px">
        <div class="module-container">
          <div class="module-title">
            <div class="module-title-text">后10名产品报废率排名</div>
            <el-button class="view-all" size="mini" @click="viewAllProductList">查看全部<i class="el-icon-d-arrow-right el-icon--right"/></el-button>
          </div>
          <div class="module-content">
            <chart id="btm" :options="btmOptions" height="210px" width="100%" @barClick="barClick"/>
          </div>
        </div>
      </div>
    </div>
    <div class="contrast">
      <div style="padding-right: 5px">
        <div class="module-container">
          <div class="module-title">
            <div class="module-title-text">
              前10名产品报废稳定性排名
              <el-tooltip placement="right">
                <div slot="content">稳定性衡量方法：<br>报废率标准方差，即工单报废率的波动程序<br>标准方差越小，表示工单报废率波动越小</div>
                <svg-icon class="hint" icon-class="hint"/>
              </el-tooltip>
            </div>
            <el-button class="view-all" size="mini" @click="viewAllProductList">查看全部<i class="el-icon-d-arrow-right el-icon--right"/></el-button>
          </div>
          <div class="module-content">
            <chart id="top2" :options="stabilityOptions" height="210px" width="100%" />
          </div>
        </div>
      </div>
      <div style="padding-left: 5px">
        <div class="module-container">
          <div class="module-title">
            <div class="module-title-text">
              后10名产品报废稳定性排名
              <el-tooltip placement="right">
                <div slot="content">稳定性衡量方法：<br>报废率标准方差，即工单报废率的波动程序<br>标准方差越小，表示工单报废率波动越小</div>
                <svg-icon class="hint" icon-class="hint"/>
              </el-tooltip>
            </div>
            <el-button class="view-all" size="mini" @click="viewAllProductList">查看全部<i class="el-icon-d-arrow-right el-icon--right"/></el-button>
          </div>
          <div class="module-content">
            <chart id="bot2" :options="stabilityOptionsBtm" height="210px" width="100%" />
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
        报废率：<span style="color: #e25d5d;font-weight: bold;margin-right: 15px">39.3%</span>
        报废量：<span style="color: #5268a5;font-weight: bold">1250</span>
      </div>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="拼命加载中"
        border
        fit
        stripe
        highlight-current-row>
        <el-table-column align="center" label="排名" width="95">
          <template slot-scope="scope">
            {{ scope.$index+1 }}
          </template>
        </el-table-column>
        <el-table-column label="报废原因" align="center" prop="oee"/>
        <el-table-column label="报废占比" align="center" prop="bfl" />
        <el-table-column label="报废量" align="center" prop="oee"/>
      </el-table>
    </el-dialog>
  </PageHeaderLayout>
</template>
<script src="./product.js"></script>
<style scoped>
  .discard-the-most-title{
    text-align: center;
    line-height: 30px;
    font-size: 18px;
    font-weight: bold;
    color: #009494;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .discard{
    margin-left: 10%;
    line-height: 25px;
  }
  .discard .title{
    display: inline-block;
    width: 50%;
  }
  .discard .font-color-red{
    font-size: 18px;
    font-weight: bold;
    color:#e25d5d;
  }
  .font-color-blue{
    font-size: 18px;
    font-weight: bold;
    color:#5268a5;
  }
  .contrast{
    overflow: hidden;
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
    height: 200px;
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
    margin-top: 10px;
  }
  .discard-overview-btm .module-title{
    line-height: 22px;
  }
  .discard-overview-btm .module-title-text:before{
    display: none;
  }
  .discard-overview-btm>div{
    float: left;
    width: 50%;
  }
  .discard-overview-btm .module-title{
    background: #f2f2f2;
    height: 42px;
    padding: 3px 15px;
  }
  .discard-overview-btm .module-content{
    background: #f2f2f2;
  }
  .discard-overview-btm .module-container{
    border:1px solid #e2e2e2;
    box-shadow: none;
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
  .castDialog>>>.el-dialog__body {
    padding: 15px;
    color: #606266;
    font-size: 14px;
  }
  .hint{
    font-size: 18px;
    vertical-align: middle;
  }
</style>

