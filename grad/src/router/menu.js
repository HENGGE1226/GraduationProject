import myClass from '../page/myClass/myClass.vue'
import classOption from '../page/myClass/classOption.vue'
import classDetail from '../page/myClass/classDetail.vue'
import classProcess from '../page/myClass/components/classProcess.vue'
import classNotice from '../page/myClass/components/classNotice/classNotice.vue'
import noticeDetail from '../page/myClass/components/classNotice/noticeDetail.vue'
import classWork from '../page/myClass/components/classWork/classWork.vue'
import workDetail from '../page/myClass/components/classWork/workDetail.vue'
import classVideo from '../page/myClass/components/classVideo.vue'
import classDiscuss from '../page/myClass/components/classDiscuss/classDiscuss.vue'
import classShare from '../page/myClass/components/classShare/classShare.vue'
import discussDetail from '../page/myClass/components/classDiscuss/discussDetail.vue'

const menu = [
  {
    path: '/myClass',
    name: 'My',
    component: myClass,
    meta: {
      ifNav: true,
      requiresAuth: true
    }
  },
  {
    path: '/classOption',
    name: 'classOption',
    component: classOption,
    meta: {
      ifNav: false,
      requiresAuth: true
    }   
  },
  {
    path: '/classDetail',
    name: 'classDetail',
    component: classDetail,
    children: [
      {
        path: '/',
        name: 'classIndex',
        component: classProcess
      },
      {
        path: 'classProcess',
        name: 'classProcess',
        component: classProcess,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'classNotice',
        name: 'classNotice',
        component: classNotice
      },
      {
        path: 'noticeDetail',
        name: 'noticeDetail',
        component: noticeDetail
      },
      {
        path: 'classWork',
        name: 'classWork',
        component: classWork
      },
      {
        path: 'workDetail',
        name: 'workDetail',
        component: workDetail
      },
      {
        path: 'classVideo',
        name: 'classVideo',
        component: classVideo
      },
      {
        path: 'classDiscuss',
        name: 'classDiscuss',
        component: classDiscuss          
      },
      {
        path: 'discussDetail',
        name: 'discussDetail',
        component: discussDetail          
      },
      {
        path: 'classShare',
        name: 'classShare',
        component: classShare                 
      }
    ],
    meta: {
      ifNav: false,
      requiresAuth: true
    }
  }
]

export default menu
