<template>
  <div class="detailContainer">
    <div class="classTitle">
      <div class="classInformation">
        <p class="name">{{classDetail.name}}</p>
        <p class="date">{{classDetail.year}}年 {{classDetail.season === 'spring' ? '春季' : '秋季'}}学期</p>
      </div>
      <router-link :to="{name: 'My'}">
        <aButton ghost class="backBtn">
          返回
        </aButton>
      </router-link>
    </div>
    <div class="classContent">
      <aMenu
        style="width: 17vw;"
        class="menu"
        :defaultSelectedKeys="['1']"
        mode="inline"
        theme="light"
        :selectedKeys="[current]"
        @click="handleClick"
      >
        <a-menu-item key="1">
          <router-link :to="{ name: 'classProcess', query: { classId: this.$route.query.classId }}" >
            教学进度
          </router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link :to="{ name: 'classNotice', query: { classId: this.$route.query.classId } }" >
            教学通知
          </router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <router-link :to="{name: 'classWork', query: { classId: this.$route.query.classId }}" >
            作业
          </router-link>
        </a-menu-item>
        <a-menu-item key="5">
          <router-link :to="{name: 'classDiscuss', query: { classId: this.$route.query.classId }}" >
            讨论区
          </router-link>
        </a-menu-item>
        <a-menu-item key="6">
          <router-link :to="{name: 'classShare', query: { classId: this.$route.query.classId }}" >
            资源共享
          </router-link>
        </a-menu-item>
      </aMenu>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'classDetail',
  data () {
    return {
      current: '1',
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
    handleClick (e) {
      console.log('click ', e)
      this.current = e.key
    }
  }
}
</script>

<style scoped lang="less">
  .detailContainer {
    .classTitle {
      width: 100vw;
      min-width: 1200px;
      height: 10vh;
      min-height: 75px;
      position: relative;
      text-align: left;
      padding-left: 25px;
      background: #011528;
      font-size: 20px;
      color: white;
      .classInformation {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .name {
          font-size: 25px;
          margin-bottom: 0;
        }
        .date {
          font-size: 16px;
          margin-bottom: 0;
        }
      }
      .backBtn {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        color: white;
      }
    }
    .classContent {
      position: relative;
      display: flex;
      .menu {
        height: auto;
        min-height: 560px;
        float: left;
      }
      .content {
        background: white;
        flex : 1;
        height: auto;
        min-height: 90vh;
      } 
    }
  }
</style>
