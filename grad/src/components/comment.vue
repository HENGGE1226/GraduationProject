<template>
  <div class="commentWrap">
    <div class="discussTitle">
      <div class="avatar"></div>
      <p class="name">叶光恒</p>
      <div class="contentWrap" v-if="mode">
        <p class="title">执行动态SQL语句的接口是什么？</p>
        <p class="content">
          执行动态SQL语句的接口是什么？执行动态SQL语句的接口是什么？执行动态SQL语句的接口是什么？执行动态SQL语句的接口是什么？执行动态SQL语句的接口是什么？执行动态SQL语句的接口是什么？执行动态SQL语句的接口是什么？执行动态SQL语句的接口是什么？执行动态SQL语句的接口是什么？执行动态SQL语句的接口是什么？执行动态SQL语句的接口是什么？执行动态SQL语句的接口是什么？执行动态SQL语句的接口是什么？执行动态SQL语句的接口是什么？执行动态SQL语句的接口是什么？执行动态SQL语句的接口是什么？执行动态SQL语句的接口是什么？执行动态SQL语句的接口是什么？
        </p>
        <span class="date">2020-10-08</span>
      </div>
      <div class="answerWrap" v-if="!mode">
        <quill-editor 
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        >
        </quill-editor>
        <div class="btn">
          <aButton type="primary" style="margin-right: 15px">提交</aButton>
          <aButton>返回</aButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from 'ant-design-vue'
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'comment',
  props: {
    userInfo: {
      type: Array,
      default: () => {
        return []
      }
    },
    mode: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      content: '',
      editorOption: {
      }
    }
  },
  components: {
    aButton: Button,
    quillEditor
  }
}
</script>

<style lang="less" scoped>
  .discussTitle {
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
      background: url('../assets/学生.png');
      background-repeat: no-repeat;
      background-size: cover;
      display: inline-block;
    }
    .name {
      position: absolute;
      top: 65px;
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
</style>
