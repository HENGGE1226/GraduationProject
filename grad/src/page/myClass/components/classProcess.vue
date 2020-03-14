<template>
  <div class="processContainer">
    <aTimeline mode="alternate" class="processContent">
      <aTimelineItem class="processItem">
        <a-icon slot="dot" type="check-circle" theme="twoTone" twoToneColor="#52c41a" style="font-size: 18px;" />
        <div class="processText">
          <p>第一章 JSP概述</p>   
        </div>
        <p>2020-09-01</p>
      </aTimelineItem>
      <aTimelineItem class="processItem">
        <a-icon slot="dot" type="check-circle" theme="twoTone" twoToneColor="#52c41a" style="font-size: 18px;" />
        <div class="processText">
          <p>第二章 JSP开发基础</p>   
        </div>
        <p>2020-09-10</p>
      </aTimelineItem>
      <aTimelineItem class="processItem">
        <a-icon slot="dot" type="close-circle" theme="twoTone" twoToneColor="red" style="font-size: 18px;" />
        <div class="processText">
          <p>第三章 JSP语法</p>   
        </div>
        <p>2020-09-20</p>
      </aTimelineItem>
      <aTimelineItem class="processItem">
        <a-icon slot="dot" type="loading" style="font-size: 18px;" />
        <div class="processText">
          <p>第四章 JSP内置对象</p>   
        </div> 
        <p>2020-10-07</p>
      </aTimelineItem>
      <aTimelineItem class="processItem">
        <a-icon slot="dot" type="clock-circle" theme="twoTone" style="font-size: 18px;" />
        <div class="processText">
          <p>第五章 JSP总结</p>   
        </div> 
        <p>2020-10-20</p>
      </aTimelineItem>
    </aTimeline>
    <div class="processNote">
      <div class="noteItem">
        <a-icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style="font-size: 16px;" />
        <span>: 已完成</span>
      </div>
      <div class="noteItem">
        <a-icon type="close-circle" theme="twoTone" twoToneColor="red" style="font-size: 16px;" />
        : 未完成或跳过
      </div>
      <div class="noteItem">
        <a-icon type="loading" style="font-size: 16px;" />
        : 进行中
      </div>
      <div class="noteItem">
        <a-icon type="clock-circle" theme="twoTone" style="font-size: 16px;" />
        : 即将进行的
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'classProcess',
  mounted () {
    console.log('www')
  }
}
</script>

<style scoped lang="less">
  .processContainer {
    display: flex;
    position: relative;
    justify-content: center;
    margin-top: 30px;
    .processContent {
      margin-right: 150px;
      .processItem {
        width: 40vw;
        .processText {
          p {
            font-size: 16px;
            margin-bottom: 0;
          } 
        }
      }
    }
    .processNote {
      position: absolute;
      right: 15px;
      .noteItem {
        margin-bottom: 5px;
        i {
          vertical-align: middle;
        }
      }
    }
  }
</style>
