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
        <el-table-column label="设备名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="IP地址" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.toIP }}</span>
          </template>
        </el-table-column>
        <el-table-column label="端口号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.toport }}</span>
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
      <el-dialog
        :visible.sync="addDialogVisible"
        :before-close="handleClose"
        title="添加"
        width="500px">
        <el-form ref="facilityForm" :model="facilityForm" :rules="rules" status-icon label-width="80px">
          <el-form-item label="设备名称" prop="facilityName">
            <el-input v-model="facilityForm.facilityName" type="text"/>
          </el-form-item>
          <el-form-item label="IP" prop="ip">
            <el-input v-model="facilityForm.ip" type="text"/>
          </el-form-item>
          <el-form-item label="端口" prop="port">
            <el-input v-model="facilityForm.port" type="text"/>
          </el-form-item>
          <el-form-item label="工厂">
            <el-input v-model="facilityForm.factoryCode" type="text"/>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="resetForm('facilityForm')">取 消</el-button>
          <el-button type="primary" @click="submitForm('facilityForm')">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        :visible.sync="editDialogVisible"
        :before-close="handleClose"
        title="编辑"
        width="500px">
        <el-form ref="facilityForm" :model="facilityForm" :rules="rules" status-icon label-width="80px">
          <el-form-item label="设备名称" prop="facilityName">
            <el-input v-model="facilityForm.facilityName" type="text"/>
          </el-form-item>
          <el-form-item label="IP" prop="ip">
            <el-input v-model="facilityForm.ip" type="text"/>
          </el-form-item>
          <el-form-item label="端口" prop="port">
            <el-input v-model="facilityForm.port" type="text"/>
          </el-form-item>
          <el-form-item label="工厂">
            <el-input v-model="facilityForm.factoryCode" type="text"/>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="resetForm('facilityForm')">取 消</el-button>
          <el-button type="primary" @click="submitEditForm('facilityForm')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </PageHeaderLayout>
</template>
<script src="./facility.js"></script>

