<template>
  <div class="workContainer">
    <div class="noticeItem" v-for="item in workList" :key="item.id">
      <div class="itemIcon"></div>
      <div class="itemContent">
        <div class="title">
          {{item.workTitle}}
          <a-tooltip placement="top" title="当前作业提交状态">
            <aTag class="tag" color="green" v-if="item.status === 1">已提交</aTag>
            <aTag class="tag" color="red" v-if="item.status === 2">未提交</aTag>
          </a-tooltip>
        </div>
        <div class="date">{{item.time}}</div>
        <a-tooltip placement="top" title="当前作业的分数">
          <div class="score">{{item.point}}</div>
        </a-tooltip>
        <div class="content">
          <p class="lastSubTime">课程：{{classDetail.name}}</p>
          <p class="classId lastSubTime">课程ID：{{classDetail.classId}}</p>
          <p class="lastSubTime" v-if="item.lastSubmitTime">上次提交时间：{{item.lastSubmitTime}}</p>
          <p class="endTime">截止时间： {{item.endTime}}</p>
        </div>
      </div>
      <div class="deleteBtn" v-if="userType === '2'">
        <a-popconfirm
          title="确定删除此作业吗?"
          @confirm="deleteWork(item.id)"
          okText="确认"
          cancelText="取消"
        >
          <a style="color: red;">删除</a>
        </a-popconfirm>
      </div>
      <aButton 
        class="submitBtn" 
        type="primary" 
        v-if="item.status === 2" 
        :disabled="!(now < item.endTime)"
        @click="changeRoute(item.id)"
      >
        完成
      </aButton>
      <aButton 
        class="submitBtn" 
        type="primary" 
        v-if="item.status === 1" 
        :disabled="!(now < item.endTime)"
        @click="changeRoute(item.id)"
      >
        修改
      </aButton>
      <aButton 
        class="submitBtn" 
        type="primary" 
        v-if="userType === '2'" 
        @click="routeToUpdate(item.id)"
      >
        编辑作业
      </aButton>
      <div class="itemName">{{classDetail.teacherName}}</div>
    </div>
    <div v-if="userType === '2'">
      <router-link :to="{ name: 'workDetail', query: { classId: this.$route.query.classId, type: 2 }}">
        <a-button type="primary" class="deliverBtn">
          布置作业
        </a-button>
      </router-link>
      <router-link :to="{ name: 'totalDetail', query: { classId: this.$route.query.classId }}">
        <a-button class="deliverBtn" style="margin-top: 50px;">
          总体情况
        </a-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'classWork',
  data () {
    return {
      classId: this.$route.query.classId,
      userType: window.sessionStorage.getItem('userType'),
      userId: window.sessionStorage.getItem('userId'),
      classDetail: {},
      workList: [],
      now: moment(new Date()).format('YYYY-MM-DD')
    }
  },
  mounted () {
    this.getList()
    this.$axios.getClassDetail({ id: this.classId })
      .then(({ data }) => {
        if (data.code === 200) {
          this.classDetail = data.data
        }
    })
  },
  methods: {
    getList () {
      this.$axios.getWorkList({ classId: this.classId })
        .then(async ({ data }) => {
          if (data.code === 200) {
            const res = data.res
            if (this.userType === '1') {
              for (let i of res) {
                i.time = moment(i.time).format('YYYY-MM-DD')
                i.endTime = moment(i.endTime).format('YYYY-MM-DD')
                const data = await this.$axios.getWorkStatus({ workId: i.id, studentId: this.userId })
                const _data = data.data
                const mes = _data.res
                if (_data.code === 200 && mes.length > 0) {
                  i.point = mes[0].point || '未批改'
                  i.lastSubmitTime = moment(mes[0].lastSubmitTime).format('YYYY-MM-DD')
                  i.status = 1 // 1表示已提交 2表示未提交
                } else {
                  i.status = 2
                }
              }
            } else {
              for (let i of res) {
                i.time = moment(i.time).format('YYYY-MM-DD')
                i.endTime = moment(i.endTime).format('YYYY-MM-DD')
              }
            }
            this.workList = res
          } else {
            this.$message.error('获取数据失败')
          }
        })
    },
    changeRoute (id) {
      console.log(id)
      this.$router.push({ path: 'workDetail', query: { classId: this.classId, workId: id, type: 1 } })
    },
    routeToUpdate (id) {
      this.$router.push({ path: 'workDetail', query: { classId: this.classId, workId: id, type: 2 } })
    },
    deleteWork (id) {
      this.$axios.deleteWork({ id })
        .then(({ data }) => {
          if (data.code === 200) {
            this.$message.success('删除成功')
            this.getList()
          } else {
            this.$message.error('删除失败')
          }
        })
    }
  }
}
</script>

<style scoped lang="less">
  .workContainer {
    padding-bottom: 30px;
    .noticeItem {
      width: 60vw;
      min-width: 860px;
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
        margin-left: 20px;
        display: inline-block;
        margin-bottom: 30px;
        .title {
          font-size: 20px;
          font-weight: 500;
          display: inline-block;
          .tag {
            margin-left: 10px;
            margin-bottom: 1px;
            vertical-align: text-top;
          }
        }
        .date {
          font-size: 14px;
          color: #ccc;
          display: inline-block;
          margin-left: 30px;
        }
        .score {
          float: right;
          font-size: 36px;
          margin-right: -55px;
          margin-top: 10px;
        }
        .content {
          width: 650px;
          height: auto;
          .endTime {
            margin-bottom: 0;
            margin-top: 5px;
          }
          .lastSubTime {
            margin-bottom: 0;
            margin-top: 5px;            
          }
        }
      }
      .deleteBtn {
        position: absolute;
        right: 50px;
        top: 30px;
      }
      .submitBtn { 
        display: inline-block;
      }
      .itemName {
        position: absolute;
        top: 80px;
        left: 30px;
        font-weight: 500;
      }
    }
    .deliverBtn {
      position: absolute;
      right: 150px;;
      top: 30px;
    }
  }
</style>
