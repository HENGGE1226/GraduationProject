<template>
  <div class="workContainer">
    <div class="noticeItem">
      <div class="itemIcon"></div>
      <div class="itemContent">
        <div class="title">
          第三章第一节课堂作业
          <aTooltip placement="top" title="当前作业提交状态">
            <aTag class="tag" color="red">未提交</aTag>
          </aTooltip>
        </div>
        <div class="date">2020年9月1日</div>
        <div class="content">
          <p class="lastSubTime">课程：微积分</p>
          <p class="classId lastSubTime">课程ID：123456</p>
          <p class="endTime">截止时间： 2020-10-01</p>
        </div>
      </div>
      <router-link to="workDetail?id=123">
        <aButton class="submitBtn" type="primary">
          完成
        </aButton>
      </router-link>
      <div class="itemName">叶光恒</div>
    </div>
    <div class="noticeItem">
      <div class="itemIcon"></div>
      <div class="itemContent">
        <div class="title">
          第二章第一节课堂作业
          <aTooltip placement="top" title="当前作业提交状态">
            <aTag class="tag" color="green">已提交</aTag>
          </aTooltip>
        </div>
        <div class="date">2020年9月1日</div>
        <aTooltip placement="top" title="当前作业的分数">
          <div class="score">80</div>
        </aTooltip>
        <div class="content">
          <p class="className lastSubTime">课程：微积分</p>
          <p class="classId lastSubTime">课程ID：123456</p>
          <p class="lastSubTime">上次提交时间：2020-09-06</p>
          <p class="endTime">截止时间： 2020-10-01</p>
        </div>
      </div>
      <router-link to="workDetail?id=123">
        <aButton class="submitBtn" type="danger">
          修改
        </aButton>
      </router-link>
      <div class="itemName">叶光恒</div>
    </div>
  </div>
</template>

<script>
import { Tag, Pagination, Button, Tooltip } from 'ant-design-vue'
export default {
  name: 'classWork',
  components: {
    aPagination: Pagination,
    aTag: Tag,
    aButton: Button,
    aTooltip: Tooltip
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
  }
</style>
