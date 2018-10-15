<template>
  <PageHeaderLayout >
    <div class="">
      <el-button
        class="float-right-btn"
        size="medium"
        type="primary"
        icon="el-icon-plus"
        @click="handleAdd">添加</el-button>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        stripe
        highlight-current-row>
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="clientID" align="center">
          <template slot-scope="scope">
            {{ scope.row.clientID }}
          </template>
        </el-table-column>
        <el-table-column label="clientSecret" align="center">
          <template slot-scope="scope">
            {{ scope.row.clientSecret }}
          </template>
        </el-table-column>
        <el-table-column label="clientPassword" align="center">
          <template slot-scope="scope">
            {{ scope.row.clientPassword }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="totalPage>pageSize"
        :current-page="pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        :total="totalPage"
        layout="prev, pager, next"
        @size-change="sizeChange"
        @current-change="currentChange"/>
      <el-dialog
        :visible.sync="addDialogVisible"
        :before-close="handleClose"
        title="添加"
        width="500px">
        <el-form ref="tokenForm" :model="tokenForm" :rules="rules" status-icon label-width="120px" label-position="left">
          <el-form-item label="clientID" prop="tokenId">
            <el-input v-model="tokenForm.tokenId" type="text"/>
          </el-form-item>
          <el-form-item label="clientSecret" prop="name">
            <el-input v-model="tokenForm.name" type="text"/>
          </el-form-item>
          <el-form-item label="clientPassword" prop="password">
            <el-input v-model="tokenForm.password" type="text"/>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="resetForm('tokenForm')">取 消</el-button>
          <el-button type="primary" @click="submitForm('tokenForm')">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        :visible.sync="editDialogVisible"
        :before-close="handleClose"
        title="编辑"
        width="500px">
        <el-form ref="tokenForm" :model="tokenForm" :rules="rules" status-icon label-width="120px" label-position="left">
          <el-form-item label="clientID" prop="tokenId">
            <el-input v-model="tokenForm.tokenId" type="text"/>
          </el-form-item>
          <el-form-item label="clientSecret" prop="name">
            <el-input v-model="tokenForm.name" type="text"/>
          </el-form-item>
          <el-form-item label="clientPassword" prop="password">
            <el-input v-model="tokenForm.password" type="text"/>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="resetForm('tokenForm')">取 消</el-button>
          <el-button type="primary" @click="submitEditForm('tokenForm')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </PageHeaderLayout>
</template>
<script src="./apiToken.js"></script>

