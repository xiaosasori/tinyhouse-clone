import { router } from './router'
import { createApp, h, provide } from 'vue'
import App from './App.vue'
import apolloClient from './plugins/apollo'
import { DefaultApolloClient } from "@vue/apollo-composable"
import {
  Layout, Spin, Affix, Input, InputNumber, Menu, Avatar, Button, Alert, Card, Skeleton, Tooltip,
  Form, Typography, Radio, Upload, Empty, Row, Col, List, Modal, Divider, DatePicker, Tag, Select, Pagination
} from 'ant-design-vue'
// import Antd from 'ant-design-vue'
import './assets/style.css'
import ErrorBanner from './components/ErrorBanner.vue'
import PageSkeleton from "./components/PageSkeleton.vue";

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App)
})

app.use(Layout)
app.use(Spin)
app.use(Affix)
app.use(Input)
app.use(InputNumber)
app.use(Menu)
app.use(Avatar)
app.use(Button)
app.use(Alert)
app.use(Card)
app.use(Skeleton)
app.use(Form)
app.use(Typography)
app.use(Radio)
app.use(Upload)
app.use(Empty)
app.use(Row)
app.use(Col)
app.use(List)
app.use(Modal)
app.use(Divider)
app.use(DatePicker)
app.use(Tag)
app.use(Select)
app.use(Pagination)
app.use(Tooltip)
// app.use(Antd)
app.use(router)
app.component('ErrorBanner', ErrorBanner)
app.component('PageSkeleton', PageSkeleton)
app.mount('#app')
