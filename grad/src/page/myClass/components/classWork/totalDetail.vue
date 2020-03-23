<template>
  <div class="wrap">
    <a-button @click="back()" class="btn">返回</a-button>
    <div class="totalWrap">
      <div class="classItem" v-for="item in total" :key="item.workId">
        <p class="title">{{item.title}}</p>
        <a-table 
          bordered 
          :pagination="false" 
          :columns="columns" 
          :dataSource="item.sourceList"
        >
          <span slot="submitStatus" slot-scope="text">
            <span>{{text === 1 ? '已提交' : '未提交' }}</span>
          </span>
          <span slot="point" slot-scope="text">
            <span>{{text ? text : '未批改' }}</span>
          </span>
          <span slot="action" slot-scope="text, record">
            <a @click="changeRoute(record.userId, item.workId)" :disabled="!(record.submitStatus === 1)">批改</a>
          </span>
        </a-table>  
      </div>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title: '学生ID',
    dataIndex: 'userId',
    key: 'userId',
    width: 200
  },
  {
    title: '学生姓名',
    dataIndex: 'userName',
    key: 'userName',
    width: 200
  },
  {
    title: '提交情况',
    dataIndex: 'submitStatus',
    key: 'submitStatus',
    scopedSlots: { customRender: 'submitStatus' },
    width: 200
  },
  {
    title: '得分情况',
    dataIndex: 'point',
    key: 'point',
    scopedSlots: { customRender: 'point' },
    width: 200   
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  name: 'totalDetail',
  data () {
    return {
      columns,
      classId: this.$route.query.classId,
      total: []
    }
  },
  mounted () {
    this.getTotalList()
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    getTotalList () {
      this.$axios.getTotalList({ classId: this.classId })
        .then(({ data }) => {
          if (data.code === 200) {
            this.total = data.res
          } else {
            this.$message.error(data.mes)
          }
        })
    },
    changeRoute (id, workId) {
      this.$router.push({path: 'workDetail', query: { workId: workId, studentId: id, type: 3 }})
    }
  }
}
</script>

<style scoped lang="less">
.wrap {    
  position: relative;
  .btn {
    position: absolute;
    left: 20px;
    top: 0px;
  }
  .totalWrap {
    .classItem {
      width: 1000px;
      margin: 0 auto;
      margin-top: 20px;
      text-align: center;
      .title {
        font-size: 16px;
        font-weight: 500;
        margin: 0;
      }
    }
  }
}
</style>
