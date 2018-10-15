<template>
  <PageHeaderLayout>
    <div>
      <el-input v-model="filterText" placeholder="请输入组织机构名称" class="searchInput" />
      <el-button
        class="float-right-btn"
        type="primary"
        icon="el-icon-plus"
        @click="handleAdd">添加</el-button>
      <el-tree
        ref="tree2"
        :expand-on-click-node="false"
        :data="list"
        :props="defaultProps"
        :filter-node-method="filterNode"
        class="filter-tree"
        node-key="id"
        style="height: calc(100vh - 176px);background: #fff;overflow: auto"
        default-expand-all>
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span>
            <el-button
              type="text"
              size="mini"
              @click="append(data)">
              添加
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="edit(data)">
              编辑
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="remove(data)">
              删除
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="viewDetail(data)">
              查看详情
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      title="添加"
      width="500px">
      <el-form ref="nodeForm" :model="nodeForm" :rules="rules" status-icon label-width="60px">
        <el-form-item label="名称" prop="nodeName">
          <el-input v-model="nodeForm.nodeName" type="text"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('nodeForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('nodeForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="editDialogVisible"
      :before-close="handleClose"
      title="编辑"
      width="500px">
      <el-form ref="nodeForm" :model="nodeForm" :rules="rules" status-icon label-width="60px">
        <el-form-item label="名称" prop="nodeName">
          <el-input v-model="nodeForm.nodeName" type="text"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('nodeForm')">取 消</el-button>
        <el-button type="primary" @click="submitEditForm('nodeForm')">确 定</el-button>
      </span>
    </el-dialog>
  </PageHeaderLayout >
</template>
<script src="./department.js"></script>
<style>
  .custom-tree-node {
    flex: .3;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 20px;
  }
  .searchInput{
    width: 300px;
    margin-bottom: 10px;
  }
</style>

