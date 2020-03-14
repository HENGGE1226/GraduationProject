<template>
  <div class="discussWrap">
    <div class="discussTitle">
      <Comment />
    </div>
    <div class="discussComment">
      <Comment />
      <Comment :mode="false" />
    </div>
  </div>
</template>

<script>
import Comment from '../../../../components/comment'
export default {
  name: 'discussDetail',
  data () {
    return {
      content: '',
      editorOption: {}
    }
  },
  components: {
    Comment
  }
}
</script>

<style lang="less" scoped>
  .discussWrap {
    .discussTitle {
      width: 900px;
      height: auto;
      margin: 0 auto;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
    .discussComment {
      width: 900px;
      margin: 0 auto;
      margin-top: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
  }
</style>
