<template>
  <PageHeaderLayout :has_back = "true">
    <div class="">
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        stripe
        highlight-current-row>
        <el-table-column align="center" label="编码">
          <template slot-scope="scope">
            {{ scope.row.code }}
          </template>
        </el-table-column>
        <el-table-column label="名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="父级名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.parentCode }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </PageHeaderLayout>
</template>
<script src="./factoryDetail.js"></script>
