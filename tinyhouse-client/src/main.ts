import {router} from './router'
import { createApp, h, provide } from 'vue'
import App from './App.vue'
import apolloClient from '@/plugins/apollo'
import { ApolloClients } from "@vue/apollo-composable"
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const app = createApp({
  setup() {
    provide(ApolloClients, {
      default: apolloClient
    })
  },
  render: () => h(App)
})

app.use(Antd).use(router).mount('#app')
