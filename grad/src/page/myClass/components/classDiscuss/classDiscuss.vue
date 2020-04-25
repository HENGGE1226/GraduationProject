<template>
  <div class="discussWrap">
    <div class="sendText">
      <div class="avatar"></div>
      <div class="edit">
        <a-form
          :form="form"
          @submit="handleSubmit"
        > 
          <a-form-item class="titleEdit">
            <a-input v-decorator="['postTitle']"  placeholder="请输入问题的标题" />
          </a-form-item>
          <a-form-item>
            <a-textarea class="textEdit"  v-decorator="['postContent']" placeholder="请输入问题内容" >
            </a-textarea>
          </a-form-item>
          <a-form-item class="uploadIcon">
              <a-upload
                action="http://up-z2.qiniu.com"
                listType="picture-card"
                :fileList="fileList"
                :data="myToken"
                @preview="handlePreview"
                @change="handleChange"
              >
                <div v-if="fileList.length < 3">
                  <a-icon type="plus" />
                </div>
              </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </a-form-item>
          <a-form-item class="submitBtn">
            <aButton type="primary" html-type="submit">发表</aButton>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <div class="discussGround">
      <div class="discussItem" v-for="item in postList" :key="item.id">
        <div class="discussAvatar"></div>         
        <div class="discussInfo">
          <span class="name">{{item.userName}}</span> 
          <span class="date">{{item.postTime}}</span>
        </div>
        <div class="discussContent">
          <div class="content">
            {{item.postTitle}}
          </div>
          <div class="lastAnswer">
            {{item.postContent}}
          </div>
          <a class="goDetail" @click="changeRoute(item.id)">查看详情</a>
          <a class="goDetail" @click="deleteItem(item.id)" v-if="userId === item.userId" >删除</a>
          <i class="iconfont icon-pinglun-copy"></i>
          <span class="commentCount">{{item.reply}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'classDiscuss',
  data () {
    return {
      form: this.$form.createForm(this, { name: 'coordinated' }),
      myToken: {
        token: ''
      },
      previewVisible: false,
      previewImage: '',
      fileList: [],
      classId: this.$route.query.classId,
      userName: window.sessionStorage.getItem('userName'),
      userId: window.sessionStorage.getItem('userId'),
      postList: []
    }
  },
  mounted () {
    this.getPostList()
    this.$axios.getUploadToken()
      .then(({ data }) => {
        if (data.code === 200) {
          this.myToken.token = data.uploadToken
        } else {
          this.$message.error(data.message, '请刷新页面')
        }
      })
  },
  methods: {
    getPostList () {
      this.$axios.getPostList({ classId: this.classId })
        .then(async ({ data }) => {
          if (data.code === 200) {
            for (let i of data.res) {
              i.postTime = moment(i.postTime).format('YYYY-MM-DD')
              const _res = await this.$axios.getPostReply({ postId: i.id })
              const _reply = _res.data.res
              i.reply = _reply.length
            }
            this.postList = data.res
          } else {
            this.$message.error('获取数据失败')
          }
        })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          values.imgUrl = []
          if (this.fileList.length > 0) {
            for (let i of this.fileList) {
              if (i.response) {
                const url = `http://q8o10ycrm.bkt.clouddn.com/${i.response.key}`
                values.imgUrl.push(url)
              }
            }
          }
          values.userId = this.userId
          values.userName = this.userName
          values.classId = this.classId
          values.postTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
          this.$axios.submitPost(values)
            .then(({data}) => {
              if (data.code === 200) {
                this.getPostList()
                this.$message.success('发表成功')
                this.form.resetFields()
              } else {
                this.$message.error('发表失败')
              }
            })
				}
			}) 
    },
    changeRoute (id) {
      this.$router.push({ path: 'discussDetail', query: { postId: id } })
    },
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
    deleteItem (id) {
      this.$axios.deletePost({ id })
        .then(({ data }) => {
          if (data.code === 200) {
            this.$message.success('删除成功')
            this.getPostList()
          } else {
            this.$message.error('删除失败')
          }
        })
    }
  }
}
</script>

<style scoped lang="less">
  // /deep/ .ant-upload.ant-upload-select.ant-upload-select-picture-card {
  //   display: block;
  //   width: 40px !important;
  //   height: 40px !important;
  // }
  // /deep/ .ant-upload-list-picture-card .ant-upload-list-item {
  //   display: block;
  //   width: 40px !important;
  //   height: 40px !important;
  // }
  .discussWrap {
    width: 100%;
    .sendText {
      width: 800px;
      height: 260px;
      position: relative;
      margin: 0 auto;
      margin-top: 30px;
      padding-top: 15px;
      padding-left: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      .avatar {
        width: 65px;
        height: 65px;
        border-radius: 50%;
        background: url('../../../../assets/学生.png');
        background-repeat: no-repeat;
        background-size: cover;
        position: absolute;
        left: 20px;
      }
      .edit {
        display: inline-block;
        margin-left: 70px;
        .uploadIcon {
          bottom: 20px;
        }
        .titleEdit {
          width: 600px;
          margin: 0;
        }
        .textEdit {
          width: 600px;
          height: 80px;
        }
        .picIcon {
          font-size: 30px;
          position: absolute;
          bottom: 25px;
          left: 125px;
        }
        .submitBtn {
          position: absolute;
          bottom: -5px;
          right: 120px;
        }
      }
    }
    .discussGround {
      width: 800px;
      height: auto;
      min-height: 200px;
      position: relative;
      margin: 0 auto;
      margin-top: 30px;
      padding-top: 20px;
      padding-bottom: 60px;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      .discussItem {
        width: 700px;
        min-height: 100px;
        margin: 0 auto;
        padding-top: 20px;
        padding-left: 25px;
        .discussAvatar {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          background: url('../../../../assets/学生.png');
          background-repeat: no-repeat;
          background-size: cover;
          display: inline-block;
          vertical-align: bottom;
        }
        .discussInfo {
          display: inline-block;
          .name {
            font-size: 16px;
            font-weight: 500;
          }
          .date {
            margin-left: 400px;
            font-size: 12px;
            color: #ccc;
          }
        }
        .discussContent {
          min-height: 80px;
          display: inline-block;
          position: relative;
          background: #fafbfc;
          .content {
            width: 600px;
            max-height: 50px;
            font-size: 15px;
            font-weight: 400;
            padding-left: 20px;
            overflow: hidden;
            text-overflow:ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;   
            margin-top: 5px;
          }
          .lastAnswer {
            width: 480px;
            height: 25px;
            padding-left: 20px;
            font-size: 15px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
          }
          .goDetail {
            margin-left: 20px;
          }
          .iconfont {
            position: absolute;
            font-size: 16px;
            bottom: 5px;
            right: 80px;
            vertical-align: text-bottom;
          }
          .commentCount {
            position: absolute;
            font-weight: 400;
            color: #ccc;
            bottom: 8px;
            right: 60px;
          }
          .commentCount:hover {
            color: blue;
          }
        }
      }
    }
  }
</style>
