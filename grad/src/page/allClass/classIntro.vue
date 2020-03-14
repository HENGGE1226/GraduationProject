<template>
  <div class="introWrap">
    <div class="classDetail">
      <div class="classImg" :style='{backgroundImage: "url("+classDetail.img+")"}'>
      </div>
      <div class="classFile">
        <p><span>课程名称:</span> {{classDetail.name}}</p>
        <p><span>课程ID::</span> {{classDetail.classId}}</p>
        <p><span>开课老师:</span> {{classDetail.teacherName}}</p>
        <p><span>开课时间:</span> {{classDetail.year}}{{classDetail.season === 'spring' ? '春季学期' : '秋季学期'}}</p>
        <p><span>开课状态:</span> {{classDetail.classStatus === 'open' ? '开课中' : '已结课'}}</p>
        <p><span>当前课程人数:</span> {{classDetail.studentNum}}/{{classDetail.limted}}</p>
      </div>
      <a-button type="primary" class="choseClass" v-if="type === 1 && auth === 1" @click="chooseClass()">
        选课
      </a-button>
      <a-button type="primary" class="choseClass" v-if="type === 1 && auth === 3" disabled>
        已选中
      </a-button>
      <a-button type="primary" class="choseClass" v-if="type === 1 && auth === 2">
        人数已满
      </a-button>
    </div>
    <div class="introduce">
      <p class="title">课程简介</p>
      <p class="content">
        {{classDetail.introduce}}
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'classIntro',
  data () {
    return {
      classId: '',
      classDetail: {},
      auth: ''
    }
  },
  mounted () {
    this.classId = this.$route.query.classId
    this.$axios.getClassDetail({id: this.classId})
      .then(({ data }) => {
        if (data.code === 200) {
          this.classDetail = data.data
        } else {
          this.$message.error('获取信息失败')
        }
      })
    this.$axios.checkChooseAuth({id: this.classId})
      .then(({ data }) => {
        if (data.code === 200) {
          this.auth = data.classType
        }
      })
  },
  methods: {
    chooseClass () {
      this.$axios.chooseClass({id: this.classId})
        .then(({ data }) => {
          if (data.code === 200) {
            this.$message.success(data.mes)
            this.$axios.checkChooseAuth({id: this.classId})
              .then(({ data }) => {
                if (data.code === 200) {
                  this.auth = data.classType
                }
              })
          }
        })
    }
  },
  computed: mapState({
		type: 'userType'
	})
}
</script>

<style lang="less" scoped>
  .introWrap {
    width: 100%;
    height: 100%;
    margin-top: 30px;
    display: flex;
    align-items: center;
    flex-direction: column; 
    .classDetail {
      min-width: 1100px;
      min-height: 270px;
      padding-top: 20px;
      padding-left: 20px;
      background: white;
      border-radius: 10px;
      position: relative;
      .classImg {
        width: 400px;
        height: 230px;
        display: inline-block;
        background: url('../../assets/classBg.png');
        background-size: cover;
        background-repeat: no-repeat;
      }
      .classFile {
        font-size: 14px;
        font-weight: 500;
        display: inline-block;
        vertical-align: top;
        margin-left: 20px;
        p {
          span {
            color: #75777c;
            font-weight: normal;
            margin-right: 5px;
          }
        }
      }
      .choseClass {
        position: absolute;
        right: 100px;
        bottom: 45px;
      }
    }
    .introduce {
      width: 1100px;
      height: 270px;
      padding-top: 20px;
      background: white;
      border-radius: 10px;
      margin-top: 30px;
      .title {
        width: 100%;
        height: 40px;
        padding-left: 20px;
        font-size: 16px;
        border-bottom: 1px solid #ccc;
      }
      .content {
        padding: 0 20px;

      }
    }
  }
</style>
