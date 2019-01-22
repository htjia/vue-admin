<template>
  <PageHeaderLayout v-loading="isLoading" element-loading-text="拼命加载中">
    <div v-if="isStart" class="start-container">
      <img class="start-bg-img" src="../../../static/img/search-04.jpg">
      <div class="start-center-ctn">
        <img class="start-img" src="../../../static/img/search-logo.png">
        <div class="select-box">
          <el-form ref="productModelFormOut" :inline="true" :model="productModelForm" :rules="rules" label-width="0" class="demo-ruleForm">
            <el-form-item
              prop="time">
              <el-date-picker
                v-model="productModelForm.time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                @change="timeChanged"
              />
            </el-form-item>
            <el-form-item
              prop="unitType">
              <el-select v-model="productModelForm.unitType" multiple collapse-tags filterable placeholder="请选择设备型号" style="width: 300px;" @change="eqptChangeSelect">
                <el-option
                  v-for="item in equipmentOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item
              prop="productModel">
              <el-select v-model="productModelForm.productModel" multiple collapse-tags filterable placeholder="请选择产品型号" style="width: 300px;" @change="productChangeSelect">
                <el-option
                  v-for="item in productOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item
              prop="patternType">
              <el-select v-model="productModelForm.patternType" :disabled="disabledSelect" placeholder="请选择模具型号" multiple collapse-tags filterable style="width: 260px;" @change="modelChangeSelect">
                <el-option
                  v-for="item in moduleOptions"
                  :key="item.code"
                  :label="item.code"
                  :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-left: 50%;transform: translateX(-50%)">
              <el-button type="primary" icon="el-icon-search" style="width: 110px" @click="submitForm('productModelFormOut')">搜索</el-button>
              <button class="cancelBtn" @click="clearSearchIn"><svg-icon icon-class="clear"/> 清除</button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div v-if="!isStart" class="parameter-table">
      <div ref="searchCtn" class=" search-ctn">
        <el-form ref="productModelFormIn" :inline="true" :model="productModelForm" :rules="rules" label-width="0" class="demo-ruleForm">
          <el-form-item
            prop="time">
            <el-date-picker
              v-model="productModelForm.time"
              size="small"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              @change="timeChanged"
            />
          </el-form-item>
          <el-form-item
            prop="unitType">
            <el-select v-model="productModelForm.unitType" multiple collapse-tags filterable placeholder="请选择设备型号" size="medium" style="width: 300px;" @change="eqptChangeSelect">
              <el-option
                v-for="item in equipmentOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item
            prop="productModel">
            <el-select v-model="productModelForm.productModel" multiple collapse-tags filterable placeholder="请选择产品型号" size="medium" style="width: 300px;" @change="productChangeSelect">
              <el-option
                v-for="item in productOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item
            prop="patternType">
            <el-select v-model="productModelForm.patternType" :disabled="disabledSelect" placeholder="请选择模具型号" size="medium" multiple collapse-tags filterable style="width: 260px;" @change="modelChangeSelect">
              <el-option
                v-for="item in moduleOptions"
                :key="item.code"
                :label="item.code"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="medium" @click="submitForm('productModelFormIn')">搜索</el-button>
            <el-button size="medium" @click="clearSearchIn"><svg-icon icon-class="clear"/> 清除</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="app-container">
        <el-radio-group :disabled="isDisabled" v-model="groups" style="margin-bottom: 12px" @change="groupsChange">
          <el-radio label="0">按时间分组</el-radio>
          <el-radio label="1">按设备分组</el-radio>
          <el-radio label="2">按产品分组</el-radio>
        </el-radio-group>
        <el-table
          v-loading="listLoading"
          v-if="groups === '0'"
          :data="list"
          :span-method="objectSpanMethod"
          element-loading-text="拼命加载中"
          border
          fit
          stripe
          highlight-current-row
        >
          <el-table-column label="时间" align="center" prop="dataTime"/>
          <el-table-column label="设备" align="center" prop="eqptName"/>
          <el-table-column label="产品" align="center" prop="materialName"/>
          <el-table-column label="模具" align="center" prop="mouldWmsCode"/>
          <el-table-column label="产量" align="center" prop="daNum"/>
          <el-table-column label="报废率" align="center" prop="beatRate">
            <template slot-scope="scope">
              {{ scope.row.beatRate }}%
            </template>
          </el-table-column>
          <el-table-column label="OEE" align="center" prop="oeeRate">
            <template slot-scope="scope">
              <span v-if="scope.row.oeeRate !== null">{{ scope.row.oeeRate }} %</span>
              <span v-if="scope.row.oeeRate === null">--</span>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          v-loading="listLoading"
          v-if="groups === '1'"
          :data="list"
          :span-method="objectSpanMethod"
          element-loading-text="拼命加载中"
          border
          fit
          stripe
          highlight-current-row
        >
          <el-table-column label="设备" align="center" prop="eqptName"/>
          <el-table-column label="产品" align="center" prop="materialName"/>
          <el-table-column label="模具" align="center" prop="mouldWmsCode"/>
          <el-table-column label="起止时间" align="center" prop="dataTime" show-overflow-tooltip/>
          <el-table-column label="产量" align="center" prop="daNum"/>
          <el-table-column label="报废率" align="center" prop="beatRate">
            <template slot-scope="scope">
              {{ scope.row.beatRate }}%
            </template>
          </el-table-column>
          <el-table-column label="OEE" align="center" prop="oeeRate">
            <template slot-scope="scope">
              {{ scope.row.oeeRate }}%
            </template>
          </el-table-column>
        </el-table>
        <el-table
          v-loading="listLoading"
          v-if="groups === '2'"
          :data="list"
          :span-method="objectSpanMethod"
          element-loading-text="拼命加载中"
          border
          fit
          stripe
          highlight-current-row
        >
          <el-table-column label="产品" align="center" prop="materialName"/>
          <el-table-column label="模具" align="center" prop="mouldWmsCode"/>
          <el-table-column label="设备" align="center" prop="eqptName"/>
          <el-table-column label="起止时间" align="center" prop="dataTime" show-overflow-tooltip/>
          <el-table-column label="产量" align="center" prop="daNum"/>
          <el-table-column label="报废率" align="center" prop="beatRate">
            <template slot-scope="scope">
              {{ scope.row.beatRate }}%
            </template>
          </el-table-column>
          <el-table-column label="OEE" align="center" prop="oeeRate">
            <template slot-scope="scope">
              {{ scope.row.oeeRate }}%
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
<style scoped>
  .parameter-table>>>.el-table .cell p{
    height: 10px;
    line-height: 10px;
  }
  .parameter-table>>>.el-progress.is-success .el-progress__text{
    display: none;
  }
  .select-box{
    width: 1200px;
  }
  .select-box>>>.el-input__inner{
    border-color: #c0c4cc;
  }
  .select-box>>>.el-form-item.is-error .el-input__inner{
    border-color: #f56c6c;
  }
  .select-box>>>.el-form-item.is-success .el-input__inner{
    border-color: #67c23a;
  }
  .select-box>>>.el-input__inner:hover {
    border-color: #aaaeb6;
  }
  .start-img{
    width: 380px;
    height: 42px;
    margin: 0 auto 40px;
    display: block;
  }
  .start-bg-img{
    width: 100%;
    height: 100%;
  }
  .default-text{
    color: #444;
    font-size: 16px;
    font-weight: normal;
  }
  .olap-search{
    background: #fff;
    margin-bottom: 10px;
    padding:15px;
    -webkit-box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 5px;
    -moz-box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 5px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 5px;
  }
  .search-ctn{
    background: #fff;
    margin-bottom: 10px;
    padding: 12px 15px;
    -webkit-box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 5px;
    -moz-box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 5px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 5px;
  }
  .search-ctn>>>.el-input__inner{
    height: 36px;
  }
  .search-ctn>>>.el-form-item{
    margin-bottom: 0;
  }
  .search-ctn>>>.el-form-item__error{
    position: static;
  }
  .cancelBtn{
    width: 110px;
    height: 40px;
    background: none;
    border:1px solid #009494;
    border-radius: 5px;
    color: #009494;
    margin-left: 15px;
    outline: none;
    cursor: pointer;
  }
  .cancelBtn:hover{
    opacity: 0.7;
  }
</style>
<script src="./olap.js"></script>

