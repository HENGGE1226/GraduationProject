<template>
  <div class="discussWrap">
    <div class="discussTitle">
      <div class="discussTitles">
        <div class="avatar"></div>
        <p class="name">{{detail.userName}}</p>
        <div class="contentWrap">
          <p class="title">{{detail.postTitle}}</p>
          <p class="content">
            {{detail.postContent}}
          </p>
          <span class="date">{{detail.postTime}}</span>
        </div>
      </div>
    </div>
    <div class="discussTitle">
      <div class="discussTitles" v-for="item in replyList" :key="item.id">
        <div class="avatar"></div>
        <p class="name">{{item.replyName}}</p>
        <div class="contentWrap">
          <p class="content">
            {{item.replyContent}}
          </p>
          <a class="goDetail" @click="deleteItem(item.id)" v-if="userId === item.replyUser" >删除</a>
          <span class="date">{{item.replyTime}}</span>
        </div>
      </div> 
    </div>
    <div class="discussTitle">
      <div class="discussTitles">
        <div class="answerWrap">
          <a-textarea  placeholder="请输入评论内容" v-model="content" style="height: 270px;">
          </a-textarea>
          <div class="btn">
            <aButton @click="submitReply()" type="primary" style="margin-right: 15px">提交</aButton>
            <aButton @click="back()">返回</aButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import moment from 'moment'
import Comment from '../../../../components/comment'
export default {
  name: 'discussDetail',
  data () {
    return {
      content: '',
      editorOption: {},
      postId: this.$route.query.postId,
      userName: window.sessionStorage.getItem('userName'),
      userId: window.sessionStorage.getItem('userId'),
      replyList: [],
      detail: {}
    }
  },
  mounted () {
    this.getPost()
    this.getComment()
  },
  methods: {
    getComment () {
      this.$axios.getPostReply({ postId: this.postId })
        .then(({ data }) => {
          if (data.code === 200) {
            for (let i of data.res) {
              i.replyTime = moment(i.replyTime).format('YYYY-MM-DD')
            }
            this.replyList = data.res
          } else {
            this.$message.error('获取数据失败')
          }
        })
    },
    getPost () {
      this.$axios.getPost({ id: this.postId })
        .then(({ data }) => {
          if (data.code === 200) {
            data.res.postTime = moment(data.res.postTime).format('YYYY-MM-DD')
            this.detail = data.res
          } else {
            this.$message.error('获取数据失败')
          }
        })
    },
    submitReply () {
      if (!this.content) {
        this.$message.error('评论内容不能为空')
        return
      }
      const query = {
        postId: this.postId,
        userId: this.userId,
        replyName: this.userName,
        replyContent: this.content,
        replyTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      }
      this.$axios.submitReply(query) 
        .then(({ data }) => {
          if (data.code === 200) {
            this.$message.success('评论成功')
            this.content = ''
            this.getComment()
          } else {
            this.$message.success('评论失败')
          }
        })
    },
    back () {
      this.$router.go(-1)
    },
    deleteItem (id) {
      this.$axios.deleteReply({ id })
        .then(({ data }) => {
          if (data.code === 200) {
            this.$message.success('删除成功')
            this.getComment()
          } else {
            this.$message.error('删除失败')
          }
        })

    }
  },
  components: {
    Comment,
    quillEditor
  }
}
</script>

<style lang="less" scoped>
  .discussWrap {
    .discussTitle {
      width: 900px;
      height: auto;
      margin: 0 auto;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      .discussTitles {
        width: 100%;
        height: 100%;
        padding: 20px;
        margin-top: 30px;
        display: flex;
        position: relative;
        // box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        .avatar {
          width: 40px;
          height: 40px;
          background: url('../../../../assets/学生.png');
          background-repeat: no-repeat;
          background-size: cover;
          display: inline-block;
        }
        .name {
          position: absolute;
          top: 65px;
          left: 25px;
        }
        .contentWrap {
          flex: 1;
          height: auto;
          background: #fafbfc;
          display: inline-block;
          position: relative;
          vertical-align: top;
          padding: 15px 10px;
          margin-left: 20px;
          .title {
            font-size: 16px;
            font-weight: 500;
          }
          .date {
            position: absolute;
            bottom: 10px;
            right: 20px;
            color: #CCC;
          }
        }
        .answerWrap {
          flex: 1;
          height: 400px;
          background: #fafbfc;
          display: inline-block;
          position: relative;
          vertical-align: top;
          padding: 15px 10px;
          margin-left: 20px;
          .quill-editor {
            height: 200px;
          }
          .btn {
            position: absolute;
            bottom: 70px;
            right: 10px;;
          }
        }
      }
    }
  }
</style>
