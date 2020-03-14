<template>
  <div class="workWrap">
    <div class="titleWrap">
      <p>执行动态SQL语句的接口是什么？</p>
    </div>
    <div class="answerWrap">
      <quill-editor 
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      >
      </quill-editor>
    </div>
    <div class="btnWrap">
      <aButton type="primary">提交</aButton>
      <aButton class="cancelBtn" @click="back()">取消</aButton>
    </div>
  </div>
</template>

<script>
import { Button, Input, Card } from 'ant-design-vue'
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'workDetail',
  data () {
    return {
      content: '<p>hello world</p>',
      editorOption: {
      }
    }
  },
  methods: {
    back () {
      this.$router.back(-1)
    }
  },
  components: {
  	aButton: Button,
		aInput: Input,
    aCard: Card,
    quilleditor: quillEditor
  }
}
</script>

<style lang="less" scoped>
  .workWrap {
    width: 70vw;
    min-width: 700px;
    height: 680px;
    position: relative;
    margin: 0 auto;
    margin-top: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    .titleWrap {
      width: 100%;
      height: 120px;
      border-bottom: 1px solid #ccc;
      font-size: 20px;
      font-weight: 500; 
      padding: 20px 30px;
      overflow-y: scroll;
    }
    .answerWrap {
      .quill-editor {
        height: 400px;
      }
    }
    .btnWrap {
      position: absolute;
      right: 45px;
      bottom: 25px;
      .cancelBtn {
        margin-left: 20px;
      }
    }
  }
</style>
