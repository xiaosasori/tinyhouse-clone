import { router } from './router'
import { createApp, h, provide } from 'vue'
import App from './App.vue'
import apolloClient from '@/plugins/apollo'
import { DefaultApolloClient } from "@vue/apollo-composable"
import Antd from 'ant-design-vue'
import './assets/style.css'
import ErrorBanner from './components/ErrorBanner.vue'
import PageSkeleton from "@/components/PageSkeleton.vue";

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App)
})

app.use(Antd).use(router)
app.component('ErrorBanner', ErrorBanner)
app.component('PageSkeleton', PageSkeleton)
app.mount('#app')
