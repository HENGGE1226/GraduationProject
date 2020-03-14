import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import 'ant-design-vue/dist/antd.css'
import axios from './common/axios'
import { message, Form, Button, Input, Pagination, Select, Card, Row, Col, Upload, InputNumber, Modal, Icon, Tag, Timeline, Tooltip, Menu } from 'ant-design-vue'

const FormItem = Form.Item
const components = [Form, FormItem, Button, Input, Input.TextArea, Pagination, Select, Select.Option, Card, Row, Col, Upload, InputNumber, Modal, Icon, Tag, Timeline, Timeline.Item, Tooltip, Menu, Menu.Item]
components.forEach(component => {
  Vue.component(component.name, component)
})

Vue.config.productionTip = false
Vue.prototype.$message = message
Vue.prototype.$form = Form
Vue.prototype.$axios = axios

Vue.use(VueQuillEditor)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
