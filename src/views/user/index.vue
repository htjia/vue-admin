<template>
  <PageHeaderLayout >
    <HeaderSearchAdd placeholder-text = "请输入用户名称" @handleSearch="handleSearch" @handleAdd="handleAdd"/>
    <div class="app-container">
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
            {{ scope.$index+1 }}
          </template>
        </el-table-column>
        <el-table-column label="用户名" align="center">
          <template slot-scope="scope">
            {{ scope.row.username }}
          </template>
        </el-table-column>
        <!--<el-table-column label="密码" align="center"><template slot-scope="scope"><span>{{ scope.row.password }}</span></template></el-table-column>-->
        <el-table-column label="操作" align="center" max-width="550px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              icon="el-icon-edit"
              @click="handleUpdatePwd(scope.row)">修改密码</el-button>
            <el-button
              size="mini"
              icon="el-icon-edit"
              @click="handleConfig(scope.row)">配置</el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)">删除</el-button>
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
    <el-dialog
      :visible.sync="addDialogVisible"
      :before-close="handleClose"
      title="添加"
      width="500px">
      <el-form ref="userForm" :model="userForm" :rules="rules" status-icon label-width="80px" label-position="left">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="userForm.userName" type="text"/>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
          <el-input v-model="userForm.passWord" type="password"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('userForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('userForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="editDialogVisible"
      :before-close="handleClose"
      title="编辑"
      width="500px">
      <el-form ref="userForm" :model="userForm" :rules="rules" status-icon label-width="80px" label-position="left">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="userForm.userName" type="text"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('userForm')">取 消</el-button>
        <el-button type="primary" @click="submitEditForm('userForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="updatePwdDialogVisible"
      :before-close="handleClose"
      title="修改密码"
      width="500px">
      <el-form ref="passwordForm" :model="passwordForm" :rules="passwordRules" status-icon label-width="80px" label-position="left">
        <el-form-item label="旧密码" prop="oldPwd">
          <el-input v-model="passwordForm.oldPwd" type="password"/>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input v-model="passwordForm.newPwd" type="password"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('passwordForm')">取 消</el-button>
        <el-button type="primary" @click="submitPawForm('passwordForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="configDialogVisible"
      :before-close="handleClose"
      title="配置信息"
      width="500px">
      <el-form ref="configForm" :model="configForm" :rules="configRules" status-icon label-width="60px" label-position="left">
        <el-form-item label="岗位" prop="post">
          <el-select v-model="configForm.post" multiple placeholder="请选择岗位" style="width: 400px;">
            <el-option
              v-for="item in postOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="configForm.role" multiple placeholder="请选择角色" style="width: 400px;">
            <el-option
              v-for="item in roleOptions"
              :key="item.id"
              :label="item.cnname"
              :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="dept">
          <el-tree
            ref="tree"
            :props="defaultProps"
            :data="treeData"
            style="height: 260px;overflow: auto;border:1px solid #d7d7d7;border-radius: 4px"
            show-checkbox
            node-key="mainId"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('configForm')">取 消</el-button>
        <el-button type="primary" @click="submitConfigForm('configForm')">确 定</el-button>
      </span>
    </el-dialog>
  </PageHeaderLayout>
</template>

<script src="./user.js"></script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 0px;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>
