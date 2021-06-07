<template>
  <a-layout-header class="app-header">
    <div class="app-header__logo-search-section">
      <div class="app-header__logo">
        <router-link to="/">
          <img
            src="@/assets/tinyhouse-logo.png"
            alt="App logo"
          >
        </router-link>
      </div>

      <div class="app-header__search-input">
        <a-input-search
          v-model:value="search"
          placeholder="Search 'San Fransisco'"
          enter-button
          @search="handleSearch"
        />
      </div>
    </div>
    <div class="app-header__menu-section">
      <a-menu
        mode="horizontal"
        :selectable="false"
        class="menu"
      >
        <a-menu-item key="/host">
          <router-link to="/host">
            <HomeOutlined />
            Host
          </router-link>
        </a-menu-item>
        <template v-if="viewer.id && viewer.avatar">
          <a-sub-menu>
            <template #title>
              <a-avatar :src="viewer.avatar" />
            </template>
            <a-menu-item key="/user">
              <router-link :to="`/user/${viewer.id}`">
                <UserOutlined />
                Profile
              </router-link>
            </a-menu-item>
            <a-menu-item key="/logout">
              <div @click="handleLogout">
                <LogoutOutlined /> Log out
              </div>
            </a-menu-item>
          </a-sub-menu>
        </template>
        <a-menu-item v-else>
          <router-link to="/login">
            <a-button type="primary">
              Sign In
            </a-button>
          </router-link>
        </a-menu-item>
      </a-menu>
    </div>
  </a-layout-header>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { viewer, setViewer } from '@/store/viewer'
import { useMutation } from '@vue/apollo-composable'
import { LOGOUT } from '@/lib/graphql'
import { message } from 'ant-design-vue'
import { displayErrorMessage } from '@/utils'
import {
  HomeOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons-vue'

export default defineComponent({
  name: 'AppHeader',
  components: { HomeOutlined, LogoutOutlined, UserOutlined },
  setup() {
    const router = useRouter()
    const { mutate: logout, onDone, onError } = useMutation(LOGOUT)
    onDone((result) => {
      setViewer(result.data.logout)
      sessionStorage.removeItem('token')
      message.info(`You 've successfully logged out!`)
    })
    onError(() => {
      message.error(
        `Sorry we were'nt able to log you out. Please try again later!`
      )
    })

    function handleLogout() {
      logout()
    }

    function handleSearch(value: string) {
      const trimmedValue = value.trim()

      if (trimmedValue) {
        router.push(`/listings/${value}`)
      } else {
        displayErrorMessage('Please enter a valid search!')
      }
    }

    const search = ref<string>('')
    const route = useRoute()
    watch(
      () => route.path,
      (value) => {
        if (!value.includes('/listings')) {
          search.value = ''
        }
        if (value.includes('/listings') && route.params.location) {
          search.value = route.params.location
        }
      }
    )

    return { viewer, handleLogout, handleSearch, search }
  },
})
</script>
