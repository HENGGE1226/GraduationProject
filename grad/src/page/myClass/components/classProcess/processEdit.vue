<template>
  <div class="processTableWrap">
    <a-table 
      bordered 
      :pagination="false" 
      :columns="columns" 
      :dataSource="processList"
    >
      <span slot="processType" slot-scope="text">
        <span>{{text === 1 ? '已完成' : text === 2 ? '未完成或跳过' : text === 3 ? '进行中' : '即将进行的' }}</span>
      </span>
      <span slot="action" slot-scope="text, record">
        <a @click="showDetailModal(record)">修改进度信息</a>
        <a-divider type="vertical" />
        <a-popconfirm
          title="确定删除此进度吗?"
          @confirm="deleteProcess(record.id)"
          okText="确认"
          cancelText="取消"
        >
          <a>删除进度</a>
        </a-popconfirm>
      </span>
    </a-table>
    <!-- 修改资料弹窗 -->
    <a-modal
      title="修改进度信息"
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
            <a-form-item label="进度内容">
              <a-input v-decorator="['processValue', { initialValue:detail.processValue ,rules: [{ required: true }] }]" style="height: 35px; width: 200px;" />
            </a-form-item>
          </aCol>
        </aRow>
        <aRow style="marginTop: 20px;">
          <aCol :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-form-item label="进度类别">
              <aSelect v-decorator="['processType', { initialValue: `${detail.processType}` ,rules: [{ required: true }] }]" 
                style="width: 190px" 
              >
                <aSelectOption value='1'>
                  已完成
                </aSelectOption>
                <aSelectOption value='2'>
                  未完成或跳过
                </aSelectOption>
                <aSelectOption value='3'>
                  进行中
                </aSelectOption>
                <aSelectOption value='4'>
                  即将进行的
                </aSelectOption>
              </aSelect>
            </a-form-item>
          </aCol>
        </aRow>
        <aRow style="marginTop: 20px;">
          <aCol :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-form-item label="进度时间">
              <a-date-picker  v-decorator="['processTime', { initialValue: detail.processTime, rules: [{ required: true}] }]" style="height: 35px; width: 200px;" />
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
    <!-- 增加进度弹窗 -->
    <a-modal
      title="增加进度"
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
            <a-form-item label="进度内容">
              <a-input v-decorator="['processValue', { rules: [{ required: true }] }]" style="height: 35px; width: 200px;" />
            </a-form-item>
          </aCol>
        </aRow>
        <aRow style="marginTop: 20px;">
          <aCol :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-form-item label="进度类别">
              <aSelect v-decorator="['processType', { rules: [{ required: true }] }]" 
                style="width: 190px" 
              >
                <aSelectOption value='1'>
                  已完成
                </aSelectOption>
                <aSelectOption value='2'>
                  未完成或跳过
                </aSelectOption>
                <aSelectOption value='3'>
                  进行中
                </aSelectOption>
                <aSelectOption value='4'>
                  即将进行的
                </aSelectOption>
              </aSelect>
            </a-form-item>
          </aCol>
        </aRow>
        <aRow style="marginTop: 20px;">
          <aCol :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-form-item label="进度时间">
              <a-date-picker  v-decorator="['processTime', { rules: [{ required: true}] }]" style="height: 35px; width: 200px;" />
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
    <a-button @click="showAddModal()" type="primary" style="margin-top: 10px; margin-left: 10px;">
      添加进度
    </a-button>
    <a-button @click="back()" style="margin-top: 10px; margin-left: 10px;">
      返回
    </a-button>
  </div>
</template>

<script>
import moment from 'moment'
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 200
  },
  {
    title: '进度内容',
    dataIndex: 'processValue',
    key: 'processValue',
    width: 200
  },
  {
    title: '进度类别',
    dataIndex: 'processType',
    key: 'processType',
    scopedSlots: { customRender: 'processType' },
    width: 200
  },
  {
    title: '进度时间',
    dataIndex: 'processTime',
    key: 'processTime',
    width: 200   
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  name: 'processEdit',
  data () {
    return {
      columns,
      calssId: '',
      processList: [],
      detail: {},
      form: this.$form.createForm(this, { name: 'coordinated' }),
      addForm: this.$form.createForm(this, { name: 'add' }),
      detailVisible: false,
      addVisible: false
    }
  },
  mounted () {
    this.classId = this.$route.query.classId
    this.getProcessList()
  },
  methods: {
    getProcessList () {
      this.$axios.getProcessList({classId: this.$route.query.classId})
        .then(({ data }) => {
          if (data.code === 200) {
            this.processList = data.res
            for (let i of this.processList) {
              i.processTime = moment(i.processTime).format('YYYY-MM-DD')
            }
          } else {
            this.$message.error('获取进度失败')
          }
        })
    },
    // 展示修改信息弹窗
    showDetailModal (record) {
      if (record) {
        this.detail = Object.assign({}, record)
        this.detail.processTime = moment(this.detail.processTime)
      }
      this.detailVisible = true
    },
    cancelDetailModal () {
      this.detail = {}
      this.detailVisible = false
    },
    // 提交修改的信息
    handleOk (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          values.processTime = moment(values.processTime).format('YYYY-MM-DD')
          values.id = this.detail.id
          this.$axios.updateProcess(values)
            .then(({data}) => {
              if (data.code === 200) {
                this.detail = {}
                this.cancelDetailModal()
                this.getProcessList()
                this.$message.success('修改成功')
              } else {
                this.$message.error('修改失败')
              }
            })
				}
			})
    },
    handleReset () {
      this.form.resetFields()
    },
    // 删除进度
    deleteProcess (id) {
      this.$axios.deleteProcess({processId: id})
        .then(({data}) => {
          if (data.code === 200) {
            this.$message.success('删除成功')
            this.getProcessList()
          } else {
            this.$message.error('删除失败')
          }
        })
    },
    // 展示增加进度弹窗
    showAddModal () {
      this.addVisible = true
    },
    // 提交增加进度信息
    handleAdd (e) {
      e.preventDefault()
      this.addForm.validateFields((err, values) => {
        if (!err) {
          values.processTime = moment(values.processTime).format('YYYY-MM-DD')
          values.classId = this.classId
          this.$axios.addProcess(values)
            .then(({data}) => {
              if (data.code === 200) {
                this.detail = {}
                this.addVisible = false
                this.getProcessList()
                this.addForm.resetFields()
                this.$message.success('添加成功')
              } else {
                this.$message.error('添加失败')
              }
            })
				}
			})
    },
    back () {
      this.$router.go(-1)
    }
  } 
}
</script>

<style scoped lang="less">

</style>
