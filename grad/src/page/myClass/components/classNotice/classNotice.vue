<template>
  <div class="noticeContainer">
    <div class="noticeItem" v-for="item in noticeList" :key="item.id">
      <div class="itemIcon"></div>
      <div class="itemContent">
        <div class="title">
          {{item.noticeTitle}}
        </div>
        <span class="time">{{item.time}}</span>
        <div class="date">{{item.date}}</div>
        <div class="content" id="con">
          {{item.noticeContent}}
        </div>  
      </div>
      <div class="itemName">{{teacherName}}</div>
      <a class="showAll" @click="showAll(item.id)">查看全部</a>
      <a
        class="edit"
        v-if="userType === '2'"
        @click="handleGo(item.id)"
      >
        编辑
      </a>
      <a-popconfirm
        title="确定删除此通知吗?"
        @confirm="deleteNotice(item.id)"
        okText="确认"
        cancelText="取消"
      >
        <a
          class="delete"
          v-if="userType === '2'"
        >
          删除
        </a>
      </a-popconfirm>
    </div>
    <router-link :to="{ name: 'noticeDetail', query: { classId: this.$route.query.classId }}">
      <a-button 
        type="primary" 
        class="noticeEdit"
        v-if="this.userType === '2'"
      >
        发放通知
      </a-button>
    </router-link>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'classNotice',
  data () {
    return {
      noticeList: [],
      userType: window.sessionStorage.getItem('userType'),
      classId: this.$route.query.classId,
      teacherName: ''
    }
  },
  mounted () {
    this.$axios.getClassDetail({ id: this.classId })
      .then(({ data }) => {
        if (data.code === 200) {
          this.teacherName = data.data.teacherName
        }
      })
    this.getNoticeList()
  },
  methods: {
    handleGo (id) {
			this.$router.push({path: 'noticeDetail', query: { classId: this.classId, noticeId: id, type: 2 }})
    },
    showAll (id) {
			this.$router.push({path: 'noticeDetail', query: { classId: this.classId, noticeId: id, type: 1 }})
    },
    getNoticeList () {
      this.$axios.getNoticeList({ classId: this.classId })
        .then(({data}) => {
          if (data.code === 200) {
            this.noticeList = data.res
            for (let i of this.noticeList) {
              i.time = moment(i.time).format('YYYY-MM-DD')
            }
          } else {
            this.$message.error('获取数据失败')
          }
        })
    },
    deleteNotice (id) {
      this.$axios.deleteNotice({ noticeId: id })
        .then(({ data }) => {
          if (data.code === 200) {
            this.$message.success('删除成功')
            this.getNoticeList()
          } else {
            this.$message.error('删除失败')
          }
        })
    }
  }
}
</script>

<style scoped lang="less">
  .noticeContainer {
    min-width: 1200px;
    padding-bottom: 30px;
    position: relative;
    .noticeItem {
      width: 60vw;
      min-width: 940px;
      height: auto;
      min-height: 130px;
      position: relative;
      margin-top: 30px;
      margin-left: 30px;
      padding-left: 20px;
      padding-top: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      .itemIcon {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: url('../../../../assets/teacher.png');
        background-repeat: no-repeat;
        background-size: cover;
        display: inline-block;
        vertical-align: top;
      }
      .itemContent {
        position: absolute;
        top: 20px;
        left: 100px;
        .title {
          font-size: 20px;
          font-weight: 500;
          display: inline-block;
        }
        .time {
          margin-left: 50px;
          color: #ccc;
          font-size: 14px;
        }
        .date {
          font-size: 14px;
          color: #ccc;
          display: inline-block;
          margin-left: 30px;
        }
        .content {
          width: 650px;
          max-height: 42px;
          overflow: hidden;
          text-overflow:ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;   
          margin-top: 5px;
        }
      }
      .itemName {
        position: absolute;
        top: 80px;
        left: 30px;
        font-weight: 500;
      }
      .showAll {
        position: absolute;
        color: skyblue;
        font-size: 14px;
        bottom: 10px;
        left: 100px;
      }
      .edit {
        position: absolute;
        display: block;
        font-size: 14px;
        right: 25px;
        top: 30px;
      }
      .delete {
        position: absolute;
        display: block;
        font-size: 14px;
        color: red;
        right: 25px;
        top: 80px;
      }
    }
    .noticeEdit {
      position: absolute;
      right: 130px;
      top: 10px;
    }
  }
</style>
