<template>
  <div class="noticeContainer">
    <div class="noticeItem" v-for="item in noticeItem" :key="item.id">
      <div class="itemIcon"></div>
      <div class="itemContent">
        <div class="title">
          {{item.title}}
        </div>
        <div class="date">{{item.date}}</div>
        <div class="content" :ref="item.ref">
          {{item.content}}
        </div>  
      </div>
      <div class="itemName">{{item.name}}</div>
      <router-link to="noticeDetail?id=123">
        <a class="showAll">查看全部</a>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'classNotice',
  data () {
    return {
      noticeItem: [
        {
          id: 1,
          title: '关于期末考试的通知',
          date: '2020年9月1日',
          name: '叶光恒',
          content: '期末考试定于2020年9月20日进行，请各位同学好好努力。期末考试定于2020年9月20日进行，请各位同学好好努力。期末考试定于2020年9月20日进行，请各位同学好好努力。期末考试定于2020年9月20日进行，请各位同学好好努力。期末考试定于2020年9月20日进行，请各位同学好好努力。期末考试定于2020年9月20日进行，请各位同学好好努力。期末考试定于2020年9月20日进行，请各位同学好好努力。期末考试定于2020年9月20日进行，请各位同学好好努力。期末考试定于2020年9月20日进行，请各位同学好好努力。期末考试定于2020年9月20日进行，请各位同学好好努力。期末考试定于2020年9月20日进行，请各位同学好好努力。'
        }
      ]
    }
  },
  mounted () {
    console.log('notice')
    const textWrap = document.defaultView.getComputedStyle(this.$refs.con)
    const maxHeight = parseInt(textWrap.maxHeight)
    const height = parseInt(textWrap.height)
    console.log(height, maxHeight, this.$refs.con)
    if (height >= maxHeight) {
      this.showAll = true
    }
  }
}
</script>

<style scoped lang="less">
  .noticeContainer {
    padding-bottom: 30px;
    .noticeItem {
      width: 60vw;
      min-width: 650px;
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
    }
  }
</style>
