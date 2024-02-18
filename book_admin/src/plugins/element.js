import Vue from 'vue'
import { Button, Input, Upload, Table, TableColumn, Pagination, Form, FormItem, Dialog, Message, Select, Option, Popover, Popconfirm, MessageBox } from 'element-ui'

Vue.use(Button)
Vue.use(Input)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Popover)
Vue.use(Popconfirm)
Vue.use(Upload)


Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
