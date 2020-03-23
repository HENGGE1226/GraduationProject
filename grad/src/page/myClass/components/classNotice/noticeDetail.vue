<template>
  <div class="detailContainer">
    <div class="noticeWrap" v-if="type === 1">
      <a-button @click="back()" class="back">
        返回
      </a-button>
      <div class="noticeMessage">
        <div class="date">
          <p>{{teacherName}}</p>
          <p>{{detail.time}}</p>
        </div>
      </div> 
      <p class="title">{{detail.noticeTitle}}</p>
      <div class="article">
        {{detail.noticeContent}}
      </div>
    </div>
    <div class="noticeWrap" v-if="!(type === 1)"> 
      <div class="noticeMessage">
        <div class="date">
          <p>{{teacherName}}</p>
          <p>{{detail.time || now}}</p>
        </div>
      </div> 
      <a-form 
          :form="form" 
          layout="inline" 
          @submit="handleOk"
          style="textAlign: center;"
        >
          <aRow style="marginLeft: 27px;">
            <aCol :label-col="{ span: 5 }" :wrapper-col="{ span: 21 }">
              <a-form-item label="标题">
                <a-input v-decorator="['noticeTitle', { initialValue: detail.noticeTitle, rules: [{ required: true }] }]" style="height: 35px; width: 500px;" />
              </a-form-item>
            </aCol>
          </aRow>
          <aRow style="marginTop: 20px;">
            <aCol :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
              <a-form-item label="主要内容">
                <a-textarea  
                  v-decorator="[
                  'noticeContent', 
                  { 
                    initialValue: detail.noticeContent, 
                    rules: [{ required: true }],
                  }]" 
                  style="height: 200px; width: 500px;" />
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
export default {
  name: 'noticeDetail',
  data () {
    return {
      type: this.$route.query.type || '', // 1表示预览 2表示修改
      form: this.$form.createForm(this, { name: 'coordinated' }),
      classId: this.$route.query.classId,
      noticeId: this.$route.query.noticeId || '',
      teacherName: '',
      detail: {},
      now: moment(new Date()).format('YYYY-MM-DD')
    }
  },
  mounted () {
    this.$axios.getClassDetail({ id: this.classId })
      .then(({ data }) => {
        if (data.code === 200) {
          this.teacherName = data.data.teacherName
        }
      })
    if (this.type) {
      console.log(this.type)
      this.$axios.getNoticeDetail({ id: this.noticeId })
        .then(({ data }) => {
          if (data.code === 200) {
            this.detail = data.res
            this.detail.time = moment(this.detail.time).format('YYYY-MM-DD')
          } else {
            this.$message.error('信息获取失败')
          }
        })
    }
  },
  methods: {
    handleOk (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const now = new Date()
          values.time = moment(now).format('YYYY-MM-DD HH:mm:ss')
          if (this.noticeId) {
            values.noticeId = this.noticeId
          }
          values.classId = this.classId
          this.$axios.updateNotice(values)
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
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="less">
  .detailContainer {
    width: 1000px;
    padding: 50px 20px 30px 20px;
    margin: 0 auto;
    position: relative;
    .noticeWrap {
      height: auto;
      padding: 30px 30px;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      .back {
        position: absolute;
        left: -150px;
        top: 20px;
      }
      .noticeMessage {
        position: absolute;
        top: 70px;
        .icon {
          width: 50px;
          height: 50px;
          display: inline-block;
          vertical-align: bottom;
          border-radius: 50%;
          background: url('../../../../assets/teacher.png');
          background-size: cover;
          background-repeat: no-repeat;
        }
        .date {
          display: inline-block;
          p {
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 0;
          }
        }
      }
      .title {
        font-size: 20px;
        font-weight: 500;
        text-align: center;
      }
      .article {
        margin-top: 30px;
      }   
    }
  }
</style>
