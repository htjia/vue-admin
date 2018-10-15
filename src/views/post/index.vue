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
        <el-table-column label="岗位名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.name }}
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
        <el-form ref="postForm" :model="postForm" :rules="rules" status-icon label-width="80px" label-position="left">
          <el-form-item label="岗位名称" prop="postName">
            <el-input v-model="postForm.postName" type="text"/>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="resetForm('postForm')">取 消</el-button>
          <el-button type="primary" @click="submitForm('postForm')">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        :visible.sync="editDialogVisible"
        :before-close="handleClose"
        title="编辑"
        width="500px">
        <el-form ref="postForm" :model="postForm" :rules="rules" status-icon label-width="80px" label-position="left">
          <el-form-item label="岗位名称" prop="postName">
            <el-input v-model="postForm.postName" type="text"/>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="resetForm('postForm')">取 消</el-button>
          <el-button type="primary" @click="submitEditForm('postForm')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </PageHeaderLayout>
</template>
<script src="./post.js"></script>

