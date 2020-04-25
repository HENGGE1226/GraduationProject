<template>
  <div class="wrap">
    <div class="btn">
      <a-button type="primary" @click="showModal()">上传教学资源</a-button>
    </div>
    <div class="list">
      <div class="item" v-for="item in list" :key="item.id">
        <a :href="item.address + '?attname=' + item.name + (item.type === 1 ? '.zip' : '.mp4')" download="学习文件">
          <div 
            class="itemImg"
          >
            <div 
              :class="{icon: item.type === 1, videoIcon: item.type === 2 }"
            >
            </div>
            <p class="title">{{item.name}}</p>
          </div>
        </a>
      </div>
    </div>
    <a-modal
      title="上传资源"
      v-model="visible"
      :footer="null"
      class="uploadModal"
    >
      <a-form 
        :form="form" 
        layout="inline" 
        @submit="handleOk"
        style="textAlign: center;"
      >
        <aRow>
          <aCol :label-col="{ span: 5 }" :wrapper-col="{ span: 21 }">
            <a-form-item label="资源名称">
              <a-input v-decorator="['name', { rules: [{ required: true }] }]" style="height: 35px; width: 200px;" />
            </a-form-item>
          </aCol>
        </aRow>
        <aRow style="marginTop: 20px;">
          <aCol :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-form-item label="资源类别">
              <aSelect v-decorator="['type', {rules: [{ required: true }] }]" 
                style="width: 200px" 
              >
                <aSelectOption value='1'>
                  文件
                </aSelectOption>
                <aSelectOption value='2'>
                  视频
                </aSelectOption>
              </aSelect>
            </a-form-item>
          </aCol>
        </aRow>
        <a-form-item label="资源上传" extra="请上传" style="margin-left: -45px; margin-top: 20px;">
          <a-upload
            action="http://up-z2.qiniu.com"
            :fileList="fileList"
            :data="myToken"
            @preview="handlePreview"
            @change="handleChange"
          >
            <a-button v-if="fileList.length < 1"> 
              <a-icon type="upload" /> 
              点击上传
            </a-button>
          </a-upload>
       </a-form-item>
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
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'classShare',
  data () {
    return {
      visible: false,
      form: this.$form.createForm(this, { name: 'coordinated' }),
      myToken: {
        token: ''
      },
      fileList: [],
      list: [],
      classId: this.$route.query.classId,
      userId: window.sessionStorage.getItem('userId'),
      userType: window.sessionStorage.getItem('userType'),
      packageUrl: require('../../../../assets/package.png'),
      videoUrl: require('../../../../assets/video.png')
    }
  },
  mounted () {
    this.$axios.getUploadToken()
      .then(({ data }) => {
        if (data.code === 200) {
          this.myToken.token = data.uploadToken
        } else {
          this.$message.error(data.message, '请刷新页面')
        }
      })
    this.getList()
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
    showModal () {
      this.visible = true
    },
    getList () {
      this.$axios.getResourceList({ classId: this.classId })
        .then(async ({ data }) => {
          if (data.code === 200) {
            for (let i of data.res) {
              i.time = moment(i.postTime).format('YYYY-MM-DD')
            }
            this.list = data.res
          } else {
            this.$message.error('获取数据失败')
          }
        })
    },
    handleOk (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.fileList.length > 0) {
            if (this.fileList[0].response) {
              const url = `http://q8o10ycrm.bkt.clouddn.com/${this.fileList[0].response.key}`
              values.address = url
            }
          }
          values.userId = this.userId
          values.time = moment(new Date()).format('YYYY-MM-DD')
          values.classId = this.classId
          this.$axios.uploadResource(values)
            .then(({ data }) => {
              if (data.code === 200) {
                this.$message.success('上传成功')
                this.getList()
                this.visible = false
                this.form.resetFields()
              } else {
                this.$message.error('上传失败')
              }
            })
        }
      })
    },
    handleReset () {
      this.form.resetFields()
    },
    deleteResource (id) {
      this.$axios.deleteResource({ id })
        .then(({ data }) => {
          if (data.code === 200) {
            this.$message.success('删除成功')
            this.getResourceList()
          } else {
            this.$message.error('删除失败')
          }
        })
    }
  }
}
</script>

<style scoped lang="less">
  .wrap {
    width: 80vw;
    min-width: 1300px;
    position: relative;
    .btn {
      position: absolute;
      right: 10px;
      top: 30px;
    }
    .list {
      width: 1200px;
      height: 80vh;
      padding-top: 30px;
      padding-left: 30px;
      padding-right: 30px;
      .item {
        width: 150px;
        height: 150px;
        display: inline-block;
        margin-left: 30px;
        margin-bottom: 30px;
        text-align: center;
        padding-top: 40px;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        font-weight: 500;
        .itemImg {
          .icon {
            width: 50px;
            height: 50px;
            background: url('../../../../assets/package.png');
            background-size: cover;
            background-repeat: no-repeat;
            display: inline-block;
          }
          .videoIcon {
            width: 50px;
            height: 50px;
            background: url('../../../../assets/video.png');
            background-size: cover;
            background-repeat: no-repeat;
            display: inline-block;
          }
          .title {
            text-align: center;
            margin-top: 20px;
            color: black;
          }
        }
      }
      .item:hover {
        background: skyblue;
        .itemImg {
          .icon {
            background: url('../../../../assets/download.png');
            background-size: cover;
            background-repeat: no-repeat;
            display: inline-block;
          }
          .videoIcon {
            width: 50px;
            height: 50px;
            background: url('../../../../assets/download.png');
            background-size: cover;
            background-repeat: no-repeat;
            display: inline-block;
          }
          .title {
            text-align: center;
            margin-top: 20px;
            color: white;
          }
        }
      }
    }
  }
</style>
