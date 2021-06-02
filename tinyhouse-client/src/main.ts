import {router} from './router'
import { createApp, h, provide } from 'vue'
import App from './App.vue'
import apolloClient from '@/plugins/apollo'
import { DefaultApolloClient } from "@vue/apollo-composable"
import Antd from 'ant-design-vue'
import './assets/style.css'

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App)
})

app.use(Antd).use(router).mount('#app')
