<template>
  <div class="discussWrap">
    <div class="sendText">
      <div class="avatar"></div>
      <div class="edit">
        <a-textarea class="textEdit" placeholder="请输入你的问题">
        </a-textarea>
        <aTooltip placement="bottom" title="上传图片">
          <a-icon class="picIcon" type="picture" theme="twoTone" />
        </aTooltip>
        <aButton type="primary" class="submitBtn">发表</aButton>
      </div>
    </div>
    <div class="discussGround">
      <div class="discussItem">
        <div class="discussAvatar"></div>         
        <div class="discussInfo">
          <span class="name">叶光恒</span> 
          <span class="date">2020-10-01</span>
        </div>
        <div class="discussContent">

          <div class="content">
            关于大数据时代的个人隐私的一些问题
          </div>
          <div class="lastAnswer">
            最新回答： 关于大数据的话打关于大数据的话打关于大数据的话打关于大数据的话打
          </div>
          <router-link to="discussDetail?id=123">
            <span class="goDetail">查看详情</span>
          </router-link>
          <i class="iconfont icon-pinglun-copy"></i>
          <span class="commentCount">18</span>
        </div>
      </div>
      <div class="discussItem">
        <div class="discussAvatar"></div>         
        <div class="discussInfo">
          <span class="name">叶光恒</span> 
          <span class="date">2020-10-01</span>
        </div>
        <div class="discussContent">

          <div class="content">
            关于大数据时代的个人隐私的一些问题
          </div>
          <div class="lastAnswer">
            最新回答： 暂无回答
          </div>
          <router-link to="discussDetail?id=123">
            <span class="goDetail">查看详情</span>
          </router-link>
          <i class="iconfont icon-pinglun-copy"></i>
          <span class="commentCount">18</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'classDiscuss'
}
</script>

<style scoped lang="less">
  .discussWrap {
    width: 100%;
    .sendText {
      width: 800px;
      height: 160px;
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
        display: inline-block;
      }
      .edit {
        display: inline-block;
        margin-left: 10px;
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
          bottom: 15px;
          right: 75px;
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
