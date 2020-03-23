<template>
  <div>
    <div class="workWrap" v-if="this.type === 1 || this.type === 3">
      <div class="titleWrap">
        <p>{{detail.workTitle}}</p>
        <p>{{detail.workContent}}</p>
      </div>
      <div class="answerWrap">
        <quill-editor 
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        >
        </quill-editor>
      </div>
      <div class="btnWrap">
        <div class="point" v-if="this.type === 3">
          <label>批改分数</label>
          <a-input-number id="inputNumber" :min="0" :max="100" v-model="point" />
        </div>
        <aButton type="primary" @click="handleSubmit()">提交</aButton>
        <aButton class="cancelBtn" @click="back()">取消</aButton>
      </div>
    </div>
    <div 
      class="workWrap" 
      v-if="this.type === 2"
      style="padding-top: 100px;"
    >
        <a-form 
          :form="form" 
          layout="inline" 
          @submit="handleOk"
          style="textAlign: center;"
        >
          <aRow style="marginLeft: 27px;">
            <aCol :label-col="{ span: 5 }" :wrapper-col="{ span: 21 }">
              <a-form-item label="作业标题">
                <a-input v-decorator="['workTitle', { initialValue: detail.workTitle, rules: [{ required: true }] }]" style="height: 35px; width: 500px;" />
              </a-form-item>
            </aCol>
          </aRow>
          <aRow style="marginTop: 20px;">
            <aCol :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
              <a-form-item label="作业主要内容">
                <a-textarea  
                  v-decorator="[
                  'workContent', 
                  { 
                    initialValue: detail.workContent, 
                    rules: [{ required: true }],
                  }]" 
                  style="height: 200px; width: 500px;" />
              </a-form-item>
            </aCol>
          </aRow>
          <aRow style="marginTop: 20px;margin-left: 25px;">
            <aCol :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
              <a-form-item label="截止时间">
                <a-date-picker  v-decorator="['endTime', { initialValue: detail.endTime, rules: [{ required: true}] }]" style="height: 35px; width: 500px;" />
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
                <a-button type="default" @click="back()" style="marginLeft: 18px;">
                  返回
                </a-button>
              </a-form-item>
            </aCol>
          </aRow>			
        </a-form>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'workDetail',
  data () {
    return {
      content: '',
      editorOption: {
      },
      type: this.$route.query.type || '', // 1表示写作业  2表示布置作业 3表示批改作业
      classId: this.$route.query.classId,
      workId: this.$route.query.workId,
      userId: this.$route.query.studentId || window.sessionStorage.getItem('userId'),
      form: this.$form.createForm(this, { name: 'coordinated' }),
      detail: {},
      answerId: '',
      point: ''
    }
  },
  mounted () {
    // 如果具有workId参数 则代表是修改作业
    if (this.workId) {
      this.$axios.getWorkDetail({ id: this.workId })
        .then(({ data }) => {
          if (data.code === 200) {
            this.detail = data.res
            this.detail.endTime = moment(this.detail.endTime)
          }
        })
    }
    if (this.workId && (this.type !== 2)) {
      this.$axios.getWorkStatus({ workId: this.workId, studentId: this.userId })
        .then(({ data }) => {
          if (data.code === 200) {
            const res = data.res
            if (res.length > 0) {
              this.answerId = res[0].id
              this.content = res[0].workValue
            }
          }
        })
    }
  },
  methods: {
    back () {
      this.$router.back(-1)
    },
    handleOk (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const now = new Date()
          values.time = moment(now).format('YYYY-MM-DD HH:mm:ss')
          values.endTime = moment(values.endTime).format('YYYY-MM-DD HH:mm:ss')
          if (this.workId) {
            values.workId = this.workId
          }
          values.classId = this.classId
          this.$axios.updateWork(values)
            .then(({data}) => {
              if (data.code === 200) {
                this.$router.go(-1)
                this.$message.success('操作成功')
              } else {
                this.$message.error('操作失败')
              }
            })
				}
			})      
    },
    handleReset () {
      this.form.resetFields()
    },
    handleSubmit () {
      if (this.content) {
        const value = {
          workValue: this.content,
          lastSubmitTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          studentId: this.userId,
          workId: this.workId
        }
        if (this.answerId) {
          value.id = this.answerId
        }
        if (this.point) {
          value.point = this.point
          this.$axios.submitPoint(value)
          .then(({ data }) => {
            if (data.code === 200) {
              this.$router.go(-1)
              this.$message.success('提交成功')
            } else {
              this.$message.error('提交失败')
            }
          })
        } else {
          this.$axios.submitWork(value)
            .then(({ data }) => {
              if (data.code === 200) {
                this.$router.go(-1)
                this.$message.success('提交成功')
              } else {
                this.$message.error('提交失败')
              }
            })
        }
      }
    }
  },
  components: {
    quilleditor: quillEditor
  }
}
</script>

<style lang="less" scoped>
  .workWrap {
    width: 70vw;
    min-width: 700px;
    height: 680px;
    position: relative;
    margin: 0 auto;
    margin-top: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    .titleWrap {
      width: 100%;
      height: 120px;
      border-bottom: 1px solid #ccc;
      font-size: 20px;
      font-weight: 500; 
      padding: 20px 30px;
      overflow-y: scroll;
    }
    .answerWrap {
      .quill-editor {
        height: 400px;
      }
    }
    .btnWrap {
      position: absolute;
      right: 45px;
      bottom: 25px;
      .point {
        width: 400px;
        height: 100px;
        position: absolute;
        right: -20px;
        .pointInp {
          display: inline;
        }
      }
      .cancelBtn {
        margin-left: 20px;
      }
    }
  }
</style>
