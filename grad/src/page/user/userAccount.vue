<template>
  <div class="userWrap">
    <a-card bordered class="cardWrap">
      <a-table bordered :pagination="false" :columns="columns" :dataSource="userList"  class="tableList">
        <span slot="userType" slot-scope="text">
          <span>{{text === 1 ? '学生' : text === 2 ? '教师' : '管理员'}}</span>
        </span>
        <span slot="action" slot-scope="text, record">
          <a @click="showDetailModal(record)">修改资料</a>
          <a-divider type="vertical" />
          <a @click="showPwdModal(record)">修改密码</a>
          <a-divider type="vertical" />
          <a-popconfirm
            title="确定删除此账号吗?"
            @confirm="deleteAccount(record.userId)"
            okText="确认"
            cancelText="取消"
          >
            <a>删除账号</a>
          </a-popconfirm>
        </span>
      </a-table>
      <!-- 修改资料弹窗 -->
      <a-modal
        title="修改资料"
        v-model="detailVisible"
        @cancel="cancelDetailModal"
        :footer="null"
        class="detailModal"
      >
        <a-form 
          :form="form" 
          layout="inline" 
          @submit="handleOk"
          style="textAlign: center;"
        >
          <aRow>
            <aCol :label-col="{ span: 5 }" :wrapper-col="{ span: 21 }">
              <a-form-item label="用户ID">
                <a-input v-decorator="['userId', { initialValue:detail.userId ,rules: [{ required: true, message: 'ID不能为空' }] }]" style="height: 35px; width: 200px;" />
              </a-form-item>
            </aCol>
          </aRow>
          <aRow style="marginTop: 20px;">
            <aCol :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
              <a-form-item label="用户类型">
                <aSelect v-decorator="['userType', { initialValue: `${detail.userType}` ,rules: [{ required: true, message: '用户类型不能为空' }] }]" 
                  style="width: 190px" 
                >
                  <aSelectOption value='1'>
                    学生
                  </aSelectOption>
                  <aSelectOption value='2'>
                    教师
                  </aSelectOption>
                  <aSelectOption value='3'>
                    管理员
                  </aSelectOption>
                </aSelect>
              </a-form-item>
            </aCol>
          </aRow>
          <aRow style="marginTop: 20px;">
            <aCol :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
              <a-form-item label="用户名">
                <a-input  v-decorator="['userName', { initialValue:detail.userName, rules: [{ required: true, message: '用户名不能为空' }] }]" style="height: 35px; width: 200px;" />
              </a-form-item>
            </aCol>
          </aRow>
          <aRow style="marginTop: 30px;">
            <aCol :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
              <a-form-item>
                <a-button type="primary" html-type="submit">
                  提交
                </a-button>
                <a-button type="default" @click="handleReset" style="marginLeft: 18px;">
                  重置
                </a-button>
              </a-form-item>
            </aCol>
          </aRow>			
        </a-form>
      </a-modal>
      <!-- 修改密码弹窗 -->
      <a-modal
        title="修改密码"
        v-model="pwdVisible"
        @cancel="cancelPwdModal"
        :footer="null"
        class="pwdModal"
      >
        <div class="wrap">
          <span>请输入新的密码:</span>
          <a-input 
            v-model="newPwd" 
            type="password" 
            style="display: inline-block; width: 300px; margin-left: 10px;" 
          />
          <a-button 
            type="primary" 
            @click="updatePwd()"
            style="display: block;margin: 0 auto; margin-top: 40px;"
          >
            提交
          </a-button>
        </div>
      </a-modal>
      <!-- 增添账号弹窗 -->
      <a-modal
        title="添加账号"
        v-model="addVisible"
        :footer="null"
        class="detailModal"
      >
        <a-form 
          :form="addForm" 
          layout="inline" 
          @submit="handleAdd"
          style="textAlign: center;"
        >
          <aRow>
            <aCol :label-col="{ span: 5 }" :wrapper-col="{ span: 21 }">
              <a-form-item label="用户ID">
                <a-input v-decorator="['addUserId', { rules: [{ required: true, message: 'ID不能为空' }] }]" style="height: 35px; width: 200px;" />
              </a-form-item>
            </aCol>
          </aRow>
          <aRow style="marginTop: 20px;">
            <aCol :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
              <a-form-item label="用户类型">
                <aSelect v-decorator="['addUserType', { rules: [{ required: true, message: '用户类型不能为空' }] }]" 
                  style="width: 190px" 
                >
                  <aSelectOption value='1'>
                    学生
                  </aSelectOption>
                  <aSelectOption value='2'>
                    教师
                  </aSelectOption>
                  <aSelectOption value='3'>
                    管理员
                  </aSelectOption>
                </aSelect>
              </a-form-item>
            </aCol>
          </aRow>
          <aRow style="marginTop: 20px;">
            <aCol :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
              <a-form-item label="用户名">
                <a-input  v-decorator="['addUserName', { rules: [{ required: true, message: '用户名不能为空' }] }]" style="height: 35px; width: 200px;" />
              </a-form-item>
            </aCol>
          </aRow>
          <aRow style="marginTop: 20px;">
            <aCol :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
              <a-form-item label="密码">
                <a-input  v-decorator="['password', { rules: [{ required: true, message: '密码不能为空' }] }]" style="height: 35px; width: 200px;" />
              </a-form-item>
            </aCol>
          </aRow>
          <aRow style="marginTop: 30px;">
            <aCol :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
              <a-form-item>
                <a-button type="primary" html-type="submit">
                  提交
                </a-button>
                <a-button type="default" @click="handleReset" style="marginLeft: 18px;">
                  重置
                </a-button>
              </a-form-item>
            </aCol>
          </aRow>			
        </a-form>
      </a-modal>
      <a-button type="primary" class="btn" @click="showAddModal()">添加账号</a-button>
    </a-card>
  </div>
</template>

<script>
  const columns = [
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId',
      width: 200
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName',
      width: 200
    },
    {
      title: '用户类型',
      dataIndex: 'userType',
      key: 'userType',
      scopedSlots: { customRender: 'userType' },
      width: 200
    },
    {
      title: '操作',
      key: 'action',
      scopedSlots: { customRender: 'action' }
    }
  ]
export default {
  name: 'userAccount',
  data () {
    return {
      columns,
      form: this.$form.createForm(this, { name: 'coordinated' }),
      addForm: this.$form.createForm(this, { name: 'add' }),
      userList: [],
      detailVisible: false, // 修改资料的窗口
      pwdVisible: false, // 修改密码的窗口
      addVisible: false, // 添加账号的窗口
      detail: {},
      newPwd: '',
      updatePerson: ''
    }
  },
  mounted () {
    this.getUserList()
  },
  methods: {
    getUserList () {
      this.$axios.getUserList()
        .then(({ data }) => {
          if (data.code === 200) {
            this.userList = data.list
          } else {
            this.$message.error(data.mes)
          }
        })
    },
    // 展示修改资料窗口
    showDetailModal (record) {
      if (record) {
        this.detail = record
      }
      this.detailVisible = true
    },
    // 展示修改密码窗口
    showPwdModal (record) {
      this.updatePerson = record.userId
      this.pwdVisible = true
    },
    // 展示增添账号窗口
    showAddModal () {
      this.addVisible = true
    },
    cancelDetailModal () {
      this.detail = {}
      this.detailVisible = false
    },
    handleOk (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$axios.updateUserMessage(values)
            .then(({data}) => {
              if (data.code === 200) {
                this.detail = {}
                this.form.resetFields()
                this.detailVisible = false
                this.getUserList()
                this.$message.success('修改成功')
              } else {
                this.$message.error('修改失败')
              }
            })
				}
			})
    },
    handleAdd (e) {
      e.preventDefault()
      this.addForm.validateFields((err, values) => {
        if (!err) {
          const data = {
            userName: values.addUserName,
            userId: values.addUserId,
            userType: values.addUserType,
            password: values.password
          }
          this.$axios.addUser(data)
            .then(({data}) => {
              if (data.code === 200) {
                this.addForm.resetFields()
                this.$message.success('添加成功')
                this.addVisible = false
                this.getUserList()
              } else {
                this.$message.error('添加失败')
              }
            })
				}
			})      
    },
    handleReset () {
      this.form.resetFields()
    },
    deleteAccount (id) {
      this.$axios.deleteUser({userId: id})
        .then(({data}) => {
          if (data.code === 200) {
            this.$message.success('删除成功')
            this.getUserList()
          } else {
            this.$message.error('删除失败')
          }
        })
    },
    cancelPwdModal () {
      this.updatePerson = ''
      this.newPwd = ''
      this.pwdVisible = false
    },
    updatePwd () {
      if (this.updatePerson) {
        console.log(this.updatePerson)
        this.$axios.updatePassword({ userId: this.updatePerson, password: this.newPwd })
          .then(({data}) => {
            if (data.code === 200) {
              this.pwdVisible = false
              this.$message.success('修改成功')
              this.updatePerson = ''
              this.newPwd = ''
            } else {
              this.$message.success('修改失败')
            }
          })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.userWrap {
  .cardWrap {
    width: 100vw;
    height: 100vh;
    position: relative;
    .tableList {
      width: 60%;
      height: auto;
      margin: 0 auto;
    }
    .btn {
      position: absolute;
      right: 140px;
      top: 30px;
    }
    .detailModal {
      width: 500px;
      height: 500px;
    }
    .ant-modal-body {
      .wrap {
        background: #ccc;
      }
    }
  }
}
</style>
