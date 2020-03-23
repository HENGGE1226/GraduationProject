<template>
  <div class="processContainer">
    <router-link :to="{ name: 'processEdit', query: { classId: this.$route.query.classId }}">
      <a-button 
        type="primary" 
        class="processEdit"
        v-if="this.userType === '2'"
      >
        编辑进度
      </a-button>
    </router-link>
    <aTimeline mode="alternate" class="processContent">
      <aTimelineItem class="processItem" v-for="item in processList" :key="item.id">
        <a-icon 
          slot="dot" 
          :type="item.processType === 1 ? 'check-circle' : item.processType === 2 ? 'close-circle' : item.processType === 3 ? 'loading' : 'clock-circle'" 
          :theme="item.processType === 3 ? '' : 'twoTone'" 
          :twoToneColor="item.processType === 1 ? '#52c41a' : item.processType === 2 ? 'red' : ''"  
          style="font-size: 18px;" 
        />
        <div class="processText">
          <p>{{item.processValue}}</p>   
        </div>
        <p>{{item.processTime}}</p>
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
import moment from 'moment'
export default {
  name: 'classProcess',
  data () {
    return {
      processList: [],
      userType: window.sessionStorage.getItem('userType')
    }
  },
  mounted () {
    this.getProcessList()
  },
  methods: {
    getProcessList () {
      this.$axios.getProcessList({classId: this.$route.query.classId})
        .then(({ data }) => {
          if (data.code === 200) {
            this.processList = data.res
            for (let i of this.processList) {
              i.processTime = moment(i.processTime).format('YYYY-MM-DD')
            }
          } else {
            this.$message.error('获取进度失败')
          }
        })
    }
  }
}
</script>

<style scoped lang="less">
  .processContainer {
    display: flex;
    position: relative;
    justify-content: center;
    margin-top: 30px;
    .processEdit {
      position: absolute;
      left: 15px;
      top: -20px;
    }
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
