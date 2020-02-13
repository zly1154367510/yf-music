import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
// import { Button, Form, FormItem, Input, Notification, Message, Main, Aside, Container, Header, Menu, Footer,
//     MenuItem, Submenu, MenuItemGroup, Breadcrumb, BreadcrumbItem, Card, Table, TableColumn, Switch, Pagination, Dialog, MessageBox,
//     PageHeader
// } from 'element-ui'
import ElemenetUI from 'element-ui'
Vue.use(ElemenetUI)
// Vue.use(Button)
// Vue.use(PageHeader)
// Vue.use(Form)
// Vue.use(FormItem)
// Vue.use(Input)
// Vue.use(Main)
// Vue.use(Aside)
// Vue.use(Container)
// Vue.use(Header)
// Vue.use(Menu)
// Vue.use(MenuItem)
// Vue.use(Submenu)
// Vue.use(MenuItemGroup)
// Vue.use(Breadcrumb)
// Vue.use(BreadcrumbItem)
// Vue.use(Card)
// Vue.use(Table)
// Vue.use(TableColumn)
// Vue.use(Switch)
// Vue.use(Pagination)
// Vue.use(Dialog)
// Vue.use(Footer)

Vue.prototype.$notify = Notification
Vue.prototype.$message = ElemenetUI.Message
Vue.prototype.$confirm = ElemenetUI.MessageBox.confirm
