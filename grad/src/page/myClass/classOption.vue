<template>
  <div class="optionWrap">
    <p class="title">请填写课程信息</p>
    <a-form
      id="components-form-demo-validate-other"
      :form="form"
      v-bind="formItemLayout"
      @submit="handleSubmit"
    >
      <a-form-item label="课程名称">
        <a-input
          v-decorator="[
            'className',
            { rules: [{ required: true, message: '请填写课程名称' }]},
          ]"
        />        
      </a-form-item>
      <a-form-item label="课程ID">
        <a-input
          v-decorator="[
            'classId',
            { rules: [{ required: true, message: '请填写课程ID' }]},
          ]"
        />        
      </a-form-item>
      <a-form-item label="开课时间">
        <aSelect
          style="width: 120px"
          v-decorator="[
            'time',
            { rules: [{ required: true, message: '请选择开课学期' }],  initialValue: [new Date().getFullYear()]},
          ]"
          disabled
        >
          <aSelectOption :value="new Date().getFullYear()">
            {{new Date().getFullYear()}}
          </aSelectOption>
        </aSelect>
        <aSelect
          style="width: 120px; margin-left: 10px;"
          v-decorator="[
            'season',
            { rules: [{ required: true, message: '请选择开课学期' }] },
          ]"
        >
          <aSelectOption value="spring">
            春季学期
          </aSelectOption>
          <aSelectOption value="fall">
            秋季学期
          </aSelectOption>
        </aSelect>
      </a-form-item>
      <a-form-item label="课堂限制人数">
        <a-input-number 
          v-decorator="[
            'limiteNum',
            { rules: [{ required: true, message: '请填写课程限制人数' }]},
          ]" 
          :min="1"  
        />
      </a-form-item>
      <a-form-item label="课程封面" extra="请上传图片">
        <a-upload
          action="http://up-z2.qiniu.com"
          listType="picture-card"
          :fileList="fileList"
          :data="myToken"
          @preview="handlePreview"
          @change="handleChange"
        >
          <div v-if="fileList.length < 1">
            <a-icon type="plus" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </a-form-item>
      <a-form-item label="课程简介">
        <a-textarea
          v-decorator="['classIntro']"
          :autosize="{ minRows: 5 }"
        />        
      </a-form-item>
      <a-form-item style="text-align: right;">
        <a-button 
          type="primary" 
          html-type="submit" 
          :disabled="submitDisable"
          :loading="loading"
        >
          创建
        </a-button>
        <router-link to="/myClass">
          <a-button type="default" style="marginLeft: 18px;">
            取消
          </a-button>
        </router-link>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { Tag, Upload, InputNumber, Modal, Icon } from 'ant-design-vue'
import axios from '../../common/axios'
export default {
  name: 'classOption',
  data () {
    return {
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      },
      myToken: {
        token: ''
      },
      previewVisible: false,
      previewImage: '',
      fileList: [],
      submitDisable: false,
      loading: false
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'validate_other' })
  },
  mounted () {
    axios.getUploadToken()
      .then(({ data }) => {
        if (data.code === 200) {
          this.myToken.token = data.uploadToken
        } else {
          this.$message.error(data.message, '请刷新页面')
        }
      })
  },
  methods: {
    handleCancel () {
      this.previewVisible = false
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange ({ fileList }) {
      this.fileList = fileList
      console.log(fileList)
    },
    handleSubmit (e) {
      e.preventDefault()
      this.submitDisable = true
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.fileList.length > 0) {
            if (this.fileList[0].response) {
              const url = `http://q6wwr49lo.bkt.clouddn.com/${this.fileList[0].response.key}`
              values.imgUrl = url
            }
          }
          this.loading = true
          axios.createClass(values)
            .then(({ data }) => {
              if (data.code === 200) {
                this.$message.success('创建成功')
                this.$router.back(-1)
              } else {
                this.$message.error(data.mes)
              }
              this.loading = false
            })
        }
      })
      this.submitDisable = false
    }
  },
	components: {
    aTag: Tag,
    aUpload: Upload,
    aInputNumber: InputNumber,
    aModal: Modal,
    aIcon: Icon
	}
}
</script>

<style lang="less" scoped>
  .optionWrap {
    width: 800px;
    height: auto;
    min-height: 100vh;
    background: white;
    margin: 0 auto;
    padding-top: 30px;
    .title {
      text-align: center;
      font-size: 20px;
      color: black;
      font-weight: 400;
    }
  }
</style>
